# ETAS CES Demonstrator - Deployment Guide

## Overview

This guide covers deployment strategies for the ETAS CES Demonstrator across different platforms, with specific focus on MacBook Pro development and Nvidia Jetson production deployment.

## Deployment Options

### 1. Native Development (MacBook Pro)

**Recommended for:** Fast development iterations and testing

```bash
# Prerequisites
node --version  # Should be 18+
npm --version   # Should be 8+

# Setup
npm install
npm run dev

# Access: http://localhost:3001
```

**Advantages:**
- Fastest hot reload
- Direct access to development tools
- Native performance
- Easy debugging

### 2. Docker Development

**Recommended for:** Team consistency and environment isolation

```bash
# Start development environment
docker-compose --profile dev up

# Access: http://localhost:3000
# Hot reload enabled with volume mounting
```

**Advantages:**
- Consistent environment across team
- Isolated dependencies
- Easy cleanup
- Production-like environment

### 3. Docker Production (Local)

**Recommended for:** Production testing before Jetson deployment

```bash
# Build and run production container
docker-compose --profile prod up -d

# Access: http://localhost:80
# Optimized Nginx serving static assets
```

**Advantages:**
- Production-identical environment
- Nginx optimization
- Security headers
- Health checks

### 4. Nvidia Jetson Deployment

**Recommended for:** Edge computing and automotive applications

```bash
# On Jetson device
docker-compose --profile jetson up -d

# Includes ARM64 optimization and memory limits
```

**Advantages:**
- ARM64 native performance
- Memory-optimized for Jetson
- Edge computing ready
- Automotive-grade reliability

## Platform-Specific Instructions

### MacBook Pro (Development)

#### Prerequisites
```bash
# Install Node.js (recommended: use nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install Docker Desktop (optional)
# Download from: https://www.docker.com/products/docker-desktop/
```

#### Development Workflow
```bash
# 1. Clone repository
git clone <repository-url>
cd etas-ces-demonstrator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
open http://localhost:3001
```

#### Performance Optimization (MacBook Pro)
```bash
# Enable faster builds
export NODE_OPTIONS="--max-old-space-size=8192"

# Use faster package manager (optional)
npm install -g pnpm
pnpm install
pnpm dev
```

### Nvidia Jetson (Production)

#### Prerequisites
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin

# Reboot to apply changes
sudo reboot
```

#### Deployment Process
```bash
# 1. Transfer files to Jetson
scp -r etas-ces-demonstrator/ jetson-user@jetson-ip:/home/jetson-user/

# 2. SSH into Jetson
ssh jetson-user@jetson-ip

# 3. Navigate to project
cd etas-ces-demonstrator

# 4. Deploy with Jetson profile
docker-compose --profile jetson up -d

# 5. Verify deployment
curl http://localhost/
docker-compose logs -f etas-jetson
```

#### Jetson-Specific Optimizations
```yaml
# Memory limits in docker-compose.yml
deploy:
  resources:
    limits:
      memory: 2G        # Adjust based on Jetson model
    reservations:
      memory: 1G        # Minimum guaranteed memory
```

#### Jetson Models Support
- **Jetson Nano:** Reduce memory limits to 1G/512M
- **Jetson Xavier NX:** Use default 2G/1G limits
- **Jetson AGX Xavier:** Can increase to 4G/2G
- **Jetson Orin:** Can increase to 8G/4G

## Migration Workflow: MacBook Pro → Jetson

### Phase 1: Development (MacBook Pro)
```bash
# Develop with hot reload
npm run dev

# Test changes in real-time
# Iterate quickly with native performance
```

### Phase 2: Local Testing (MacBook Pro)
```bash
# Test production build locally
npm run build
npm run preview

# Test Docker production locally
docker-compose --profile prod up
```

### Phase 3: Docker Testing (MacBook Pro)
```bash
# Test full Docker workflow
docker-compose --profile dev up    # Development in Docker
docker-compose --profile prod up   # Production in Docker
```

### Phase 4: Jetson Deployment
```bash
# Transfer and deploy to Jetson
rsync -av --exclude node_modules . jetson:/path/to/app/
ssh jetson "cd /path/to/app && docker-compose --profile jetson up -d"
```

## Environment Configuration

### Development Environment Variables
```bash
# .env.development (optional)
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true
VITE_HOT_RELOAD=true
```

### Production Environment Variables
```bash
# .env.production (optional)
VITE_API_URL=https://your-production-api.com
VITE_DEBUG=false
VITE_ANALYTICS_ID=your-analytics-id
```

### Docker Environment Variables
```yaml
# In docker-compose.yml
environment:
  - NODE_ENV=production
  - VITE_HOST=0.0.0.0
  - NGINX_WORKER_PROCESSES=auto
```

## Monitoring & Maintenance

### Health Checks
```bash
# Application health
curl http://localhost/

# Docker container health
docker-compose ps
docker-compose logs -f [service-name]

# System resources (Jetson)
htop
nvidia-smi  # For GPU monitoring
```

### Log Management
```bash
# View application logs
docker-compose logs -f etas-jetson

# View Nginx logs
docker exec -it etas-jetson-container tail -f /var/log/nginx/access.log

# Rotate logs (production)
sudo logrotate -f /etc/logrotate.conf
```

### Updates & Maintenance
```bash
# Update application
git pull origin main
docker-compose --profile jetson down
docker-compose --profile jetson build --no-cache
docker-compose --profile jetson up -d

# Update system (Jetson)
sudo apt update && sudo apt upgrade -y
sudo reboot
```

## Performance Tuning

### Jetson Performance Modes
```bash
# Maximum performance
sudo nvpmodel -m 0
sudo jetson_clocks

# Balanced mode (recommended)
sudo nvpmodel -m 1

# Power-saving mode
sudo nvpmodel -m 2
```

### Docker Performance Tuning
```bash
# Increase Docker memory (if needed)
sudo systemctl edit docker
# Add:
# [Service]
# ExecStart=
# ExecStart=/usr/bin/dockerd --default-runtime=nvidia

# Optimize Docker storage
docker system prune -a
```

### Nginx Performance Tuning
```nginx
# In nginx.conf (already optimized)
worker_processes auto;
worker_connections 1024;
keepalive_timeout 65;
gzip on;
gzip_comp_level 6;
```

## Security Considerations

### Network Security
```bash
# Firewall configuration (Jetson)
sudo ufw enable
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS (if using SSL)
```

### Container Security
```bash
# Run containers as non-root user
USER node
WORKDIR /app

# Use specific image versions
FROM node:18-alpine  # Not 'latest'

# Scan for vulnerabilities
docker scan etas-ces-demonstrator
```

### SSL/TLS Setup (Production)
```bash
# Install Certbot (for Let's Encrypt)
sudo apt install certbot

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Update nginx.conf for HTTPS
# Add SSL configuration block
```

## Troubleshooting

### Common Issues

#### "Cannot connect to Docker daemon"
```bash
sudo systemctl start docker
sudo usermod -aG docker $USER
# Logout and login again
```

#### "Port already in use"
```bash
# Find process using port
sudo lsof -i :80
sudo kill -9 <PID>

# Or use different port
docker-compose --profile jetson up -d --scale etas-jetson=0
```

#### "Out of memory" (Jetson)
```bash
# Check memory usage
free -h
docker stats

# Reduce memory limits in docker-compose.yml
# Or add swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### "Build fails on Jetson"
```bash
# Clear Docker cache
docker system prune -a

# Build with more memory
docker-compose build --memory=2g

# Use pre-built image (alternative)
docker pull your-registry/etas-ces:latest
```

### Performance Issues

#### Slow loading on Jetson
```bash
# Check network connectivity
ping google.com

# Optimize Docker networking
docker network ls
docker network prune

# Use local image registry
docker run -d -p 5000:5000 --name registry registry:2
```

#### High memory usage
```bash
# Monitor memory
watch -n 1 'free -h && docker stats --no-stream'

# Adjust memory limits
# Edit docker-compose.yml memory settings

# Enable memory swap accounting
sudo vim /boot/firmware/cmdline.txt
# Add: cgroup_enable=memory swapaccount=1
sudo reboot
```

## Backup & Recovery

### Application Backup
```bash
# Backup application data
tar -czf etas-backup-$(date +%Y%m%d).tar.gz etas-ces-demonstrator/

# Backup Docker images
docker save etas-ces-demonstrator > etas-image-backup.tar
```

### System Recovery
```bash
# Restore from backup
tar -xzf etas-backup-YYYYMMDD.tar.gz

# Restore Docker image
docker load < etas-image-backup.tar

# Redeploy
docker-compose --profile jetson up -d
```

## Scaling & Load Balancing

### Horizontal Scaling
```yaml
# docker-compose.yml
services:
  etas-jetson:
    deploy:
      replicas: 3
    ports:
      - "80-82:80"
```

### Load Balancer Setup
```nginx
# nginx-lb.conf
upstream etas_backend {
    server localhost:80;
    server localhost:81;
    server localhost:82;
}

server {
    listen 443 ssl;
    location / {
        proxy_pass http://etas_backend;
    }
}
```

---

**Last Updated:** October 20, 2025  
**Platforms:** MacBook Pro (ARM64) + Nvidia Jetson (ARM64)  
**Status:** Production Ready