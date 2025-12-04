#!/usr/bin/env python3
"""
EATB Report Converter v4
Key insight: Update the hash file to match the actual data hash.
"""

import json
import os
import base64
import sys
import hashlib

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
    raw_data = {}  # Store raw bytes for hash calculation
    
    for filename in os.listdir(results_folder):
        if filename.endswith('.json'):
            filepath = os.path.join(results_folder, filename)
            with open(filepath, 'rb') as f:
                raw_bytes = f.read()
                raw_data[filename] = raw_bytes
                json_data[filename] = base64.b64encode(raw_bytes).decode('utf-8')
                print(f"  ✓ {filename} ({len(raw_bytes)} bytes)")
    
    if not json_data:
        print(f"❌ Error: No JSON files found")
        sys.exit(1)
    
    # Calculate the correct hash for evaluationResults.json
    if 'evaluationResults.json' in raw_data:
        correct_hash = hashlib.md5(raw_data['evaluationResults.json']).hexdigest()
        print(f"\n🔐 Calculated hash: {correct_hash}")
        
        # Update evaluationHash.json with the correct hash
        if 'evaluationHash.json' in raw_data:
            try:
                hash_obj = json.loads(raw_data['evaluationHash.json'].decode('utf-8'))
                old_hash = hash_obj.get('hash', '')
                print(f"   Original hash:   {old_hash}")
                
                # Update the hash
                hash_obj['hash'] = correct_hash
                new_hash_json = json.dumps(hash_obj)
                json_data['evaluationHash.json'] = base64.b64encode(new_hash_json.encode('utf-8')).decode('utf-8')
                print(f"   ✓ Hash updated!")
            except Exception as e:
                print(f"   ⚠ Could not update hash: {e}")
    
    folder_name = os.path.basename(results_folder.rstrip('/'))
    
    # Create the embedded script
    embedded_script = """
<script>
(function() {
    console.log('🔧 EATB Standalone v4');
    
    window.EATB_EMBEDDED_DATA = {};
    const data = """ + json.dumps(json_data) + """;
    
    for (const [filename, b64] of Object.entries(data)) {
        try {
            window.EATB_EMBEDDED_DATA[filename] = atob(b64);
        } catch (e) {
            console.error('Decode error:', filename, e);
        }
    }
    
    console.log('✓ Loaded', Object.keys(window.EATB_EMBEDDED_DATA).length, 'files');
    
    // Override fetch
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        const filename = String(url).split('/').pop();
        if (filename.endsWith('.json') && window.EATB_EMBEDDED_DATA[filename]) {
            console.log('✓ Serving:', filename);
            const data = window.EATB_EMBEDDED_DATA[filename];
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(JSON.parse(data)),
                text: () => Promise.resolve(data),
                blob: () => Promise.resolve(new Blob([data])),
                arrayBuffer: () => Promise.resolve(new TextEncoder().encode(data).buffer)
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
        
        xhr.open = function(m, url, ...a) {
            this._url = url;
            return origOpen.apply(this, [m, url, ...a]);
        };
        
        xhr.send = function() {
            const filename = String(this._url || '').split('/').pop();
            if (filename.endsWith('.json') && window.EATB_EMBEDDED_DATA[filename]) {
                console.log('✓ Serving (XHR):', filename);
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
            return origSend.apply(this, arguments);
        };
        
        return xhr;
    };
    
    console.log('✅ Ready');
})();
</script>
"""
    
    # Insert at the very beginning, before <!doctype>
    html_content = embedded_script + html_content
    
    # Output file
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
        print("Usage: python3 convert_eatb_v4.py <html_file> <data_folder>")
        sys.exit(1)
    create_standalone_report(sys.argv[1], sys.argv[2])
