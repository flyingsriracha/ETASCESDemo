# Deploying to Azure

This guide explains how to package the ETAS CES Demonstrator as a Docker container and deploy it to Microsoft Azure.

## Prerequisites

1. **Docker Desktop** installed and running.
2. **Azure CLI** installed (`az --version`).
3. An **Azure Subscription**.

---

## Step 1: Build the Docker Image

First, build the production-ready Docker image locally.

```bash
# Build the image with the tag 'etas-demo'
docker build -t etas-demo .
```

Test it locally to ensure it works:

```bash
# Run on port 8080
docker run -p 8080:80 etas-demo
```
Open http://localhost:8080 in your browser.

---

## Step 2: Prepare Azure Resources

You can do this via the Azure Portal or Azure CLI. Here is the CLI method:

### 1. Login to Azure
```bash
az login
```

### 2. Create a Resource Group
```bash
az group create --name etas-demo-rg --location eastus
```

### 3. Create an Azure Container Registry (ACR)
This is where your Docker images will be stored.
```bash
# Registry name must be unique globally
az acr create --resource-group etas-demo-rg --name etasregistry123 --sku Basic --admin-enabled true
```

### 4. Login to ACR
```bash
az acr login --name etasregistry123
```

---

## Step 3: Push Image to Azure

Tag your local image with the ACR login server name.

```bash
# 1. Get the login server name (if you forgot it)
# It's usually <registry-name>.azurecr.io
az acr list --resource-group etas-demo-rg --query "[].{loginServer: loginServer}" --output table

# 2. Tag the image
docker tag etas-demo etasregistry123.azurecr.io/etas-demo:v1

# 3. Push the image
docker push etasregistry123.azurecr.io/etas-demo:v1
```

---

## Step 4: Deploy to Azure App Service

Now deploy the container to a web app.

### 1. Create an App Service Plan
```bash
az appservice plan create --name etas-demo-plan --resource-group etas-demo-rg --sku B1 --is-linux
```

### 2. Create the Web App
```bash
az webapp create --resource-group etas-demo-rg --plan etas-demo-plan --name etas-ces-demo --deployment-container-image-name etasregistry123.azurecr.io/etas-demo:v1
```

### 3. Configure Continuous Deployment (Optional)
This ensures the app updates whenever you push a new image tag.
```bash
az webapp deployment container config --name etas-ces-demo --resource-group etas-demo-rg --enable-cd true
```

---

## Step 5: Access the App

Your app will be available at:
`https://etas-ces-demo.azurewebsites.net`

---

## Troubleshooting

### Container Fails to Start
1. Go to Azure Portal > App Service > Log Stream.
2. Check if the container is crashing.
3. Ensure the container exposes Port 80 (our Dockerfile does this).

### Updating the App
To deploy a new version:
1. Make code changes.
2. Rebuild: `docker build -t etas-demo .`
3. Retag: `docker tag etas-demo etasregistry123.azurecr.io/etas-demo:v2`
4. Push: `docker push etasregistry123.azurecr.io/etas-demo:v2`
5. Update App Service:
   ```bash
   az webapp config container set --name etas-ces-demo --resource-group etas-demo-rg --docker-custom-image-name etasregistry123.azurecr.io/etas-demo:v2
   ```

