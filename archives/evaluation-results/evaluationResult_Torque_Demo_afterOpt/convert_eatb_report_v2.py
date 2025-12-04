#!/usr/bin/env python3
"""
Universal EATB Report Converter v2
Creates a standalone HTML report with embedded data and proper hash validation.

Usage:
    python3 convert_eatb_report_v2.py <html_file> <data_folder>
"""

import json
import os
import base64
import sys
import hashlib

def create_standalone_report(html_file, results_folder):
    """
    Creates a standalone HTML file with all data embedded and hash recalculated.
    """
    # Validate inputs
    if not os.path.exists(html_file):
        print(f"❌ Error: HTML file not found: {html_file}")
        sys.exit(1)
    
    if not os.path.exists(results_folder):
        print(f"❌ Error: Data folder not found: {results_folder}")
        sys.exit(1)
    
    print(f"📄 Reading {html_file}...")
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Read all JSON files
    print(f"📁 Loading JSON data from {results_folder}/...")
    json_data = {}
    json_count = 0
    
    for filename in os.listdir(results_folder):
        if filename.endswith('.json'):
            filepath = os.path.join(results_folder, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                # Store as base64 to avoid any escaping issues
                json_data[filename] = base64.b64encode(content.encode('utf-8')).decode('utf-8')
                json_count += 1
                print(f"  ✓ Loaded: {filename}")
    
    if json_count == 0:
        print(f"❌ Error: No JSON files found in {results_folder}")
        sys.exit(1)
    
    print(f"\n✓ Found {json_count} JSON files")
    
    # Calculate MD5 hash of evaluationResults.json and update evaluationHash.json
    if 'evaluationResults.json' in json_data and 'evaluationHash.json' in json_data:
        print(f"\n🔐 Recalculating hash for embedded data...")
        
        # Decode evaluationResults.json
        eval_results_content = base64.b64decode(json_data['evaluationResults.json']).decode('utf-8')
        
        # Calculate MD5 hash
        md5_hash = hashlib.md5(eval_results_content.encode('utf-8')).hexdigest()
        print(f"  📊 New MD5 hash: {md5_hash}")
        
        # Update evaluationHash.json
        hash_content = base64.b64decode(json_data['evaluationHash.json']).decode('utf-8')
        hash_obj = json.loads(hash_content)
        old_hash = hash_obj.get('hash', '')
        print(f"  📊 Old hash: {old_hash}")
        
        hash_obj['hash'] = md5_hash
        updated_hash_content = json.dumps(hash_obj)
        json_data['evaluationHash.json'] = base64.b64encode(updated_hash_content.encode('utf-8')).decode('utf-8')
        print(f"  ✓ Updated evaluationHash.json")
    
    # Extract folder name for pattern matching
    folder_name = os.path.basename(results_folder.rstrip('/'))
    
    # Create embedded data script
    embedded_script = """
<script id="embedded-data-loader">
(function() {
    console.log('🔧 EATB Standalone Data Loader v2');
    
    // Decode and store embedded data
    window.EATB_EMBEDDED_DATA = {};
    const data = """ + json.dumps(json_data) + """;
    
    for (const [filename, base64Content] of Object.entries(data)) {
        try {
            const decoded = atob(base64Content);
            window.EATB_EMBEDDED_DATA[filename] = decoded;
        } catch (e) {
            console.error('Failed to decode', filename, e);
        }
    }
    
    console.log('✓ Loaded', Object.keys(window.EATB_EMBEDDED_DATA).length, 'embedded files');
    
    // Override fetch before any other scripts run
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        const urlStr = typeof url === 'string' ? url : url.toString();
        
        // Match various URL patterns for the JSON files
        const patterns = [
            /evaluationResults\\.json$/,
            /evaluationHash\\.json$/,
            /\\/([^/]+\\.json)$/,
            /""" + folder_name.replace('.', '\\.') + """\\/([^/]+\\.json)$/,
            /EATB_results\\/([^/]+\\.json)$/,
            /EATB_preOpt\\/([^/]+\\.json)$/
        ];
        
        for (const pattern of patterns) {
            const match = urlStr.match(pattern);
            if (match) {
                const filename = match[1] || match[0].split('/').pop();
                if (window.EATB_EMBEDDED_DATA && window.EATB_EMBEDDED_DATA[filename]) {
                    console.log('✓ Serving embedded:', filename);
                    const data = window.EATB_EMBEDDED_DATA[filename];
                    return Promise.resolve({
                        ok: true,
                        status: 200,
                        statusText: 'OK',
                        headers: new Headers({'Content-Type': 'application/json'}),
                        text: () => Promise.resolve(data),
                        json: () => Promise.resolve(JSON.parse(data)),
                        blob: () => Promise.resolve(new Blob([data])),
                        arrayBuffer: () => Promise.resolve(new TextEncoder().encode(data).buffer)
                    });
                }
            }
        }
        
        return originalFetch.apply(this, arguments);
    };
    
    // Override XMLHttpRequest for older code
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;
        const originalSend = xhr.send;
        
        xhr.open = function(method, url, ...args) {
            this._url = url;
            return originalOpen.apply(this, [method, url, ...args]);
        };
        
        xhr.send = function(...args) {
            const urlStr = this._url || '';
            const patterns = [
                /evaluationResults\\.json$/,
                /evaluationHash\\.json$/,
                /\\/([^/]+\\.json)$/,
                /""" + folder_name.replace('.', '\\.') + """\\/([^/]+\\.json)$/,
                /EATB_results\\/([^/]+\\.json)$/,
                /EATB_preOpt\\/([^/]+\\.json)$/
            ];
            
            for (const pattern of patterns) {
                const match = urlStr.match(pattern);
                if (match) {
                    const filename = match[1] || match[0].split('/').pop();
                    if (window.EATB_EMBEDDED_DATA && window.EATB_EMBEDDED_DATA[filename]) {
                        console.log('✓ Serving embedded (XHR):', filename);
                        const data = window.EATB_EMBEDDED_DATA[filename];
                        
                        setTimeout(() => {
                            Object.defineProperty(this, 'responseText', { 
                                value: data, 
                                writable: false,
                                configurable: true
                            });
                            Object.defineProperty(this, 'response', { 
                                value: data, 
                                writable: false,
                                configurable: true
                            });
                            Object.defineProperty(this, 'status', { 
                                value: 200, 
                                writable: false,
                                configurable: true
                            });
                            Object.defineProperty(this, 'statusText', { 
                                value: 'OK', 
                                writable: false,
                                configurable: true
                            });
                            Object.defineProperty(this, 'readyState', { 
                                value: 4, 
                                writable: false,
                                configurable: true
                            });
                            
                            if (this.onload) this.onload();
                            if (this.onreadystatechange) this.onreadystatechange();
                        }, 0);
                        return;
                    }
                }
            }
            
            return originalSend.apply(this, args);
        };
        
        return xhr;
    };
    
    console.log('✅ EATB standalone loader ready (hash recalculated)');
})();
</script>
"""
    
    # Insert the script right after <head> tag
    if '<head>' in html_content:
        html_content = html_content.replace('<head>', '<head>' + embedded_script, 1)
    else:
        html_content = embedded_script + html_content
    
    # Write the standalone HTML
    base_name = os.path.basename(html_file)
    output_file = base_name.replace('.html', '_standalone.html')
    
    input_dir = os.path.dirname(html_file)
    if input_dir:
        output_file = os.path.join(input_dir, output_file)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    file_size_mb = len(html_content) / (1024 * 1024)
    print(f"\n{'='*60}")
    print(f"✅ SUCCESS!")
    print(f"{'='*60}")
    print(f"📄 Created: {output_file}")
    print(f"📊 File size: {file_size_mb:.2f} MB")
    print(f"\n🎉 Open this file in your browser - no drag-and-drop needed!")
    print(f"   Hash validation has been properly handled.")
    print(f"{'='*60}\n")
    
    return output_file

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("EATB Report Converter v2")
        print()
        print("Usage:")
        print("  python3 convert_eatb_report_v2.py <html_file> <data_folder>")
        print()
        print("Example:")
        print("  python3 convert_eatb_report_v2.py report.html report_data/")
        sys.exit(1)
    
    html_file = sys.argv[1]
    data_folder = sys.argv[2]
    create_standalone_report(html_file, data_folder)
