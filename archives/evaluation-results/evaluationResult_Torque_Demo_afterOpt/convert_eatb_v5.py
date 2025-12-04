#!/usr/bin/env python3
"""
EATB Report Converter v5
Now with correct understanding of hash validation!

Hash formula: MD5("4" + tool_secret + evaluationResults_content)
"""

import json
import os
import base64
import sys
import hashlib

# Tool secrets from EATB source code
TOOL_SECRETS = {
    "rbtb_java": "36d485e739a1417c92d2d0d66f0b9fd2f9b4429f69e80313998e1b18efe7bc7",
    "rbtb": "efe23913bf5ffc6a2344facc1d0dd8475e54a426ede6aa7ba9a6d6c53d44c2e",
    "p2r": "a4b8f1a1e17c2e4d1e94ed227e4382e599f7263a487fdd7532417e3d0f187e5",
    "xtb": "c65d4e3871c1fc5c0e04bedfcdbae74626e57650b76eaa5b35d17dc631a7c07"
}

def calculate_eatb_hash(tool, content):
    """Calculate hash using EATB's formula: MD5('4' + secret + content)"""
    secret = TOOL_SECRETS.get(tool, "")
    if not secret:
        return None
    to_hash = "4" + secret + content
    return hashlib.md5(to_hash.encode('utf-8')).hexdigest()

def create_standalone_report(html_file, results_folder):
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
    raw_content = {}
    
    for filename in os.listdir(results_folder):
        if filename.endswith('.json'):
            filepath = os.path.join(results_folder, filename)
            # Read as text to preserve exact content
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                raw_content[filename] = content
                # Base64 encode the UTF-8 bytes
                json_data[filename] = base64.b64encode(content.encode('utf-8')).decode('ascii')
                print(f"  ✓ {filename} ({len(content)} chars)")
    
    if not json_data:
        print(f"❌ Error: No JSON files found")
        sys.exit(1)
    
    # Verify hash calculation
    if 'evaluationResults.json' in raw_content and 'evaluationHash.json' in raw_content:
        hash_obj = json.loads(raw_content['evaluationHash.json'])
        tool = hash_obj.get('tool', '')
        expected_hash = hash_obj.get('hash', '')
        
        calculated_hash = calculate_eatb_hash(tool, raw_content['evaluationResults.json'])
        
        print(f"\n🔐 Hash verification:")
        print(f"   Tool: {tool}")
        print(f"   Expected:   {expected_hash}")
        print(f"   Calculated: {calculated_hash}")
        print(f"   Match: {'✓' if calculated_hash == expected_hash else '✗'}")
    
    folder_name = os.path.basename(results_folder.rstrip('/'))
    
    # Create the embedded script - key is to return EXACT same content
    embedded_script = """
<style>
/* Fix sidebar spacing - disable the height that causes large gaps */
.cui-content .navigation-tree .p-tree .p-tree-container .p-treenode .p-treenode-content,
.cui-content .navigation-tree .p-tree .p-tree-container .p-treenode .p-treenode-content .p-treenode-label {
    height: auto !important;
}
/* Hide the date */
.cui-header-report-date {
    display: none !important;
}
/* Hide the title */
.cui-header-report-title-wrapper {
    display: none !important;
}
</style>
<script>
(function() {
    console.log('🔧 EATB Standalone v5 - Hash Verified');
    
    // Store raw content (will be decoded from base64)
    window.EATB_EMBEDDED_DATA = {};
    const data = """ + json.dumps(json_data) + """;
    
    // Decode base64 to get exact original content
    for (const [filename, b64] of Object.entries(data)) {
        try {
            // Decode base64 to bytes, then to string
            const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
            const decoder = new TextDecoder('utf-8');
            window.EATB_EMBEDDED_DATA[filename] = decoder.decode(bytes);
        } catch (e) {
            console.error('Decode error:', filename, e);
        }
    }
    
    console.log('✓ Loaded', Object.keys(window.EATB_EMBEDDED_DATA).length, 'files');
    
    // Override fetch to return exact content
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        const urlStr = String(url);
        const filename = urlStr.split('/').pop();
        
        if (filename.endsWith('.json') && window.EATB_EMBEDDED_DATA[filename]) {
            console.log('✓ Serving:', filename);
            const content = window.EATB_EMBEDDED_DATA[filename];
            
            return Promise.resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Headers({'Content-Type': 'application/json; charset=utf-8'}),
                text: () => Promise.resolve(content),
                json: () => Promise.resolve(JSON.parse(content)),
                blob: () => Promise.resolve(new Blob([content], {type: 'application/json'})),
                arrayBuffer: () => {
                    const encoder = new TextEncoder();
                    return Promise.resolve(encoder.encode(content).buffer);
                }
            });
        }
        
        return originalFetch.apply(this, arguments);
    };
    
    // Override XMLHttpRequest
    const OrigXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new OrigXHR();
        const origOpen = xhr.open;
        const origSend = xhr.send;
        
        xhr.open = function(method, url, ...args) {
            this._url = url;
            return origOpen.apply(this, [method, url, ...args]);
        };
        
        xhr.send = function() {
            const urlStr = String(this._url || '');
            const filename = urlStr.split('/').pop();
            
            if (filename.endsWith('.json') && window.EATB_EMBEDDED_DATA[filename]) {
                console.log('✓ Serving (XHR):', filename);
                const content = window.EATB_EMBEDDED_DATA[filename];
                
                setTimeout(() => {
                    Object.defineProperty(this, 'responseText', { value: content, configurable: true });
                    Object.defineProperty(this, 'response', { value: content, configurable: true });
                    Object.defineProperty(this, 'status', { value: 200, configurable: true });
                    Object.defineProperty(this, 'statusText', { value: 'OK', configurable: true });
                    Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
                    
                    if (this.onload) this.onload();
                    if (this.onreadystatechange) this.onreadystatechange();
                }, 0);
                return;
            }
            
            return origSend.apply(this, arguments);
        };
        
        return xhr;
    };
    
    console.log('✅ Ready - Hash validation should pass');
})();
</script>
"""
    
    # Insert before <!doctype>
    html_content = embedded_script + html_content
    
    # Output
    base_name = os.path.basename(html_file)
    output_file = base_name.replace('.html', '_standalone.html')
    input_dir = os.path.dirname(html_file)
    if input_dir:
        output_file = os.path.join(input_dir, output_file)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"\n{'='*60}")
    print(f"✅ Created: {output_file}")
    print(f"📊 Size: {len(html_content) / (1024*1024):.2f} MB")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python3 convert_eatb_v5.py <html_file> <data_folder>")
        sys.exit(1)
    create_standalone_report(sys.argv[1], sys.argv[2])
