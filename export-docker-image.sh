#!/bin/bash

# Export Docker Image for Jetson Transfer
# This script exports the ARM64 Docker image to a tar file that can be transferred to Jetson

set -e

IMAGE_NAME="etas-demo:arm64"
EXPORT_FILE="etas-demo-arm64.tar"
EXPORT_DIR="./docker-exports"

echo "=========================================="
echo "ETAS CES Demo - Docker Image Export"
echo "=========================================="
echo ""

# Create export directory if it doesn't exist
mkdir -p "$EXPORT_DIR"

# Check if image exists
if ! docker image inspect "$IMAGE_NAME" > /dev/null 2>&1; then
    echo "❌ Image $IMAGE_NAME not found!"
    echo "Building image first..."
    docker build -t "$IMAGE_NAME" .
fi

echo "📦 Exporting Docker image: $IMAGE_NAME"
echo "   → $EXPORT_DIR/$EXPORT_FILE"
echo ""

# Export the image
docker save "$IMAGE_NAME" -o "$EXPORT_DIR/$EXPORT_FILE"

# Compress the tar file (optional but recommended for transfer)
echo "🗜️  Compressing image..."
gzip -f "$EXPORT_DIR/$EXPORT_FILE"
EXPORT_FILE="${EXPORT_FILE}.gz"

echo ""
echo "✅ Export complete!"
echo ""
echo "📋 Transfer Instructions:"
echo "   1. Copy $EXPORT_DIR/$EXPORT_FILE to your Jetson device"
echo "   2. On Jetson, run:"
echo "      docker load -i $EXPORT_FILE"
echo "   3. Then run:"
echo "      docker run -d -p 80:80 --name etas-demo etas-demo:arm64"
echo ""
echo "💡 Transfer methods:"
echo "   - USB drive: Copy $EXPORT_DIR/$EXPORT_FILE to USB, then to Jetson"
echo "   - SCP: scp $EXPORT_DIR/$EXPORT_FILE user@jetson-ip:/path/to/destination"
echo "   - Network share: Copy via shared folder"
echo ""
echo "📊 File size:"
ls -lh "$EXPORT_DIR/$EXPORT_FILE" | awk '{print "   " $5 " (" $9 ")"}'

