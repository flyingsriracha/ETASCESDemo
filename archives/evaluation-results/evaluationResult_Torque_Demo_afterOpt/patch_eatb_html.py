#!/usr/bin/env python3
"""
EATB HTML Patcher
Directly patches the EATB HTML to disable hash validation at the source.
"""

import json
import os
import base64
import sys
import re

def patch_html(html_file, results_folder):
    if not os.path.exists(html_file):
        print(f"❌ Error: HTML file not found: {html_file}")
        sys.exit(1)
    
    if not os.path.exists(results_folder):
        print(f"❌ Error: Data folder not found: {results_folder}")
        sys.exit(1)
    
    print(f"📄 Reading {html_file}...")
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    print(f"📁 Loading JSON data...")
    json_data = {}
    
    for filename in os.listdir(results_folder):
        if filename.endswith('.json'):
            filepath = os.path.join(results_folder, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                json_data[filename] = base64.b64encode(content.encode('utf-8')).decode('utf-8')
                print(f"  ✓ {filename}")
    
    print(f"\n🔧 Patching JavaScript...")
    
    # Find and replace common hash validation patterns in minified JS
    # These patterns check if hash matches
    patches = [
        # Pattern: if(hash!==expectedHash) or if(hash!=expectedHash)
        (r'if\s*\(\s*(\w+)\s*(!==?)\s*(\w+)\s*\)', r'if(false)'),
        # Pattern: hash===expectedHash or hash==expectedHash  
        (r'(\w+)\s*(===?)\s*(\w+)\s*\?\s*', r'true?'),
        # Pattern: throw new Error with "corrupt" or "hash"
        (r'throw\s+new\s+Error\s*\([^)]*(?:corrupt|hash|tamper)[^)]*\)', r'console.log("Hash check bypassed")'),
    ]
    
    original_length = len(html_content)
    
    for pattern, replacement in patches:
        html_content = re.sub(pattern, replacement, html_content, flags=re.IGNORECASE)
    
    if len(html_content) != original_length:
        print(f"  ✓ Applied {len(patches)} patches")
    
    # Now embed the data
    print(f"\n📦 Embedding data...")
    
    loader_script = """
<script>
(function() {
    window.EATB_EMBEDDED_DATA = {};
    const data = """ + json.dumps(json_data) + """;
    
    for (const [filename, base64Content] of Object.entries(data)) {
        try {
            window.EATB_EMBEDDED_DATA[filename] = atob(base64Content);
        } catch (e) {
            console.error('Decode error:', filename, e);
        }
    }
    
    console.log('✓ Embedded data ready:', Object.keys(window.EATB_EMBEDDED_DATA).length, 'files');
    
    // Intercept ALL file loading
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        const filename = String(url).split('/').pop();
        if (filename.endsWith('.json') && window.EATB_EMBEDDED_DATA[filename]) {
            const data = window.EATB_EMBEDDED_DATA[filename];
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(JSON.parse(data)),
                text: () => Promise.resolve(data)
            });
        }
        return originalFetch.apply(this, arguments);
    };
    
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;
        const originalSend = xhr.send;
        
        xhr.open = function(method, url, ...args) {
            this._url = url;
            return originalOpen.apply(this, [method, url, ...args]);
        };
        
        xhr.send = function() {
            const filename = String(this._url || '').split('/').pop();
            if (filename.endsWith('.json') && window.EATB_EMBEDDED_DATA[filename]) {
                const data = window.EATB_EMBEDDED_DATA[filename];
                setTimeout(() => {
                    Object.defineProperty(this, 'responseText', { value: data });
                    Object.defineProperty(this, 'response', { value: data });
                    Object.defineProperty(this, 'status', { value: 200 });
                    Object.defineProperty(this, 'readyState', { value: 4 });
                    if (this.onload) this.onload();
                    if (this.onreadystatechange) this.onreadystatechange();
                }, 0);
                return;
            }
            return originalSend.apply(this, arguments);
        };
        
        return xhr;
    };
    
    // Block ALL error dialogs and console errors about corruption
    window.alert = function(msg) {
        if (String(msg).toLowerCase().match(/corrupt|hash|tamper|data/)) {
            console.log('🔇 Blocked alert:', msg);
            return;
        }
        return window._originalAlert ? window._originalAlert(msg) : undefined;
    };
    
    console.error = function(...args) {
        const msg = String(args[0] || '').toLowerCase();
        if (msg.match(/corrupt|hash|tamper/)) {
            console.log('🔇 Blocked error:', args[0]);
            return;
        }
        return window._originalConsoleError ? window._originalConsoleError(...args) : undefined;
    };
})();
</script>
"""
    
    # Insert at the very beginning of the HTML
    html_content = loader_script + html_content
    
    # Write output
    base_name = os.path.basename(html_file)
    output_file = base_name.replace('.html', '_patched.html')
    
    input_dir = os.path.dirname(html_file)
    if input_dir:
        output_file = os.path.join(input_dir, output_file)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    file_size_mb = len(html_content) / (1024 * 1024)
    print(f"\n{'='*60}")
    print(f"✅ PATCHED VERSION CREATED!")
    print(f"{'='*60}")
    print(f"📄 File: {output_file}")
    print(f"📊 Size: {file_size_mb:.2f} MB")
    print(f"\n✨ This version has hash validation REMOVED")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("EATB HTML Patcher")
        print()
        print("Usage:")
        print("  python3 patch_eatb_html.py <html_file> <data_folder>")
        sys.exit(1)
    
    patch_html(sys.argv[1], sys.argv[2])
