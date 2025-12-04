#!/usr/bin/env python3
"""
EATB Report Local Server
Serves the EATB report locally to avoid CORS issues.

Usage:
    python3 serve_eatb_report.py <report_directory>
    
Example:
    python3 serve_eatb_report.py evaluationResult_2025-09-22_09-33-37/
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

class EATBHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def serve_report(report_dir, port=8000):
    """
    Serve the EATB report on a local web server.
    """
    if not os.path.exists(report_dir):
        print(f"❌ Error: Directory not found: {report_dir}")
        sys.exit(1)
    
    # Find the HTML file
    html_files = list(Path(report_dir).glob('*.html'))
    if not html_files:
        print(f"❌ Error: No HTML file found in {report_dir}")
        sys.exit(1)
    
    html_file = html_files[0]
    
    # Change to the report directory
    os.chdir(report_dir)
    
    # Find an available port
    original_port = port
    while port < original_port + 10:
        try:
            with socketserver.TCPServer(("", port), EATBHandler) as httpd:
                url = f"http://localhost:{port}/{html_file.name}"
                print(f"\n{'='*60}")
                print(f"🌐 EATB Report Server Started")
                print(f"{'='*60}")
                print(f"📄 Serving: {html_file.name}")
                print(f"🔗 URL: {url}")
                print(f"📡 Port: {port}")
                print(f"\n✨ Opening browser...")
                print(f"\n⚠️  Press Ctrl+C to stop the server")
                print(f"{'='*60}\n")
                
                # Open browser
                webbrowser.open(url)
                
                # Serve forever
                httpd.serve_forever()
        except OSError:
            port += 1
            continue
        break
    else:
        print(f"❌ Error: Could not find an available port between {original_port} and {port}")
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("EATB Report Local Server")
        print()
        print("This script serves your EATB report on a local web server")
        print("to avoid browser security restrictions.")
        print()
        print("Usage:")
        print("  python3 serve_eatb_report.py <report_directory>")
        print()
        print("Example:")
        print("  python3 serve_eatb_report.py evaluationResult_2025-09-22_09-33-37/")
        print()
        print("The browser will open automatically. Press Ctrl+C to stop.")
        sys.exit(1)
    
    report_dir = sys.argv[1]
    serve_report(report_dir)
