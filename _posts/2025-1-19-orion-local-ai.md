---
title: "0ri0n my Local Private AI"
hidden: true
excerpt_separator: "<!--more-->"
categories:
  - Home Lab
tags:
  - ollama
  - open webui
  - nginx
  - cloudflare
  - ai
---

# Operation 0ri0n - Local AI

Having recently found some time to tinker with something new, I decided to take this chance and dive into the world of Data Science.  

More specifically, Artificial Intelligence and working with Large Language Models, also called LLMs.

## Standalone AI Vendors

When using public and free AI vendors such as ChatGPT, DeepSeek, and Claude, it's important to be aware of potential privacy and data risks. These platforms may collect user input data for training purposes, which could lead to unintentional sharing of sensitive information. 

Furthermore, the security measures employed by these services might not be robust enough to prevent unauthorized access or data breaches. 

> Users should exercise caution when providing personal or confidential details and consider implementing best practices such as encrypting sensitive data and regularly reviewing privacy policies for any service they use.

Here are just a few of the venders that serve some open source models to the public

- [Mistral](https://chat.mistral.ai/chat)
- [Claude](https://claude.ai)
- [OpenAI](https://openai.com/)

## Remote Private AI

Running Large Language Models (LLMs) in a private but remote setup, as demonstrated in the GitHub repo, offers a balance between local control and scalability by leveraging external servers or cloud resources that are dedicated to your organization. 

This approach provides better data privacy compared to public clouds while still offering ease of management, performance benefits over public networks, and scalable infrastructure for handling larger workloads.

> WARNING: This will get very expensive.

This is my pattern to provision infrastructure and integrates GitHub Actions for streamlined automation.

- [Auto Intelligence]()

### Local Home Lab AI

Running Large Language Models (LLMs) locally offers enhanced data privacy, faster performance due to reduced network latency, and greater flexibility for customization and integration with on-premises systems. 

This setup also provides better control over resources and can be cost-effective in the long run, especially for organizations with existing hardware infrastructure.

![0ri0n Local AI](../images/0ri0n-Local-AI.jpg)

_My Home Lab Architecture for Operation 0ri0n_

### Technical Document: Setting Up Open-WebUI and Ollama

#### Recommended Hardware Components

To ensure optimal performance when setting up Open-WebUI and Ollama on Windows Subsystem for Linux (WSL) with GPU support, consider the following hardware components:

1. **GPU (Graphics Processing Unit)**:
   - A powerful NVIDIA GPU is essential for running Large Language Models (LLMs) efficiently.
     - 0ri0n: Nvidia GeForce RTX 4090 super 16 GB

2. **CPU (Central Processing Unit)**:
   - A high-performance CPU with multiple cores and a robust architecture.
     - 0ri0n: Intel Core i7-14700F 2.10 GHz

3. **RAM**:
   - At least 16GB of RAM, but preferably 32GB or more for smoother operation and faster model loading times.
     - 0ri0n: 32 GB

This setup will help you run Open-WebUI and Ollama effectively on your system.

> By choosing Windows 11 and relying on WSL (Windows Subsystem for Linux), we are leveraging the popularity and ease of use of a Windows environment while harnessing the power of Linux, simply because this setup is popular and convenient for highlighting and testing out the capabilities of WSL.

### Steps:

From Windows 11 - open a PowerShell prompt as Administrator and run:

#### **WSL Installation**:
   
```bash
> wsl --install
```
_This command installs Windows Subsystem for Linux (WSL) to provide a lightweight version of Linux on your Windows machine._

Now, you should see a different prompt when WSL is finished starting.

#### **Docker Installation**:
   
```bash
$ curl https://get.docker.com | sh
```

_This command downloads and runs a script that automatically installs Docker on the system._

#### **Install Nvidia Driver for Docker Containers**:
   
```bash
$ curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey |sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list && sudo apt-get update
```

```bash

$ sudo apt-get install -y nvidia-container-toolkit
   
$ sudo service docker restart
```

_These commands download and add the necessary GPG key, configure the NVIDIA container toolkit repository, install the toolkit, and then restart Docker to use the GPU with Docker containers._

#### **Install Open-WebUI and Ollama**:
   
This command runs a Docker container named ollama using all available GPUs, mounts a volume for persistent storage, exposes port 11434 on both the host and the container, and sets environment variables to enable specific features like flash attention and quantization type.

```bash
$ docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama --restart=always -e OLLAMA_FLASH_ATTENTION=true -e OLLAMA_KV_CACHE_TYPE=q4_0 -e OLLAMA_HOST:0.0.0. ollama/ollama
```

This command runs a Docker container named open-webui, uses the host network mode for better performance, mounts a volume for data persistence, sets an environment variable with the OLLAMA_BASE_URL, and ensures the container restarts automatically.

> !NOTE: The environment variables `OLLAMA_FLASH_ATTENTION` and `OLLAMA_KV_CACHE_TYPE` enable quantization and context quantization and you can omit those from the command if you have problems.

```bash
$ docker run -d --network=host -v open-web:/app/backend/data -e OLLAMA_BASE_URL=http://127.0.0.1:11434 --name open-webui --restart always ghcr.io/open-webui:main
```

For a quick test we can try out this command to see how much GPU ram is being utilized.

```bash
$ nvidia-smi -l
```

#### **Set Up Static IP on 0ri0n**:

I configured static IP, but this is not really needed, especially if you already have DNS or DHCP implemented in your network.
   
Edit `/etc/netplan/01-netcfg.yaml` with the following configuration:
```yaml
   network:
     version: 2
     renderer: networkd
     ethernets:
       eth0:
         dhcp4: no
         addresses:
           - <IP_ADDRESS>/20
         routes:
           - to: default
             via: 172.20.80.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
```

_This YAML configuration sets up a static IP address for the network interface `eth0`, assigns it a specific IP (`172.20.87.223`), configures default gateway and DNS servers._

#### **Expose WSL Port in Windows**:
   
Run the following commands in PowerShell as Administrator:
```powershell
> netsh interface portproxy add v4tov4 listenport=11434 listenaddress=0.0.0.0 connectport=11434 connectaddress=<IP_ADDRESS>
> netsh advfirewall firewall add rule name="ServicePort11434" dir=in action=allow protocol=tcp localport=11434
```

I need to open the firewall port on Windows 11 so that I can access the api provided by Ollama from other devices on my network.

#### **Start WSL on Windows 11 Startup**:
   
This is another optional step, but I wanted to ensure that if my desktop were to reboot, that all services would return.

- Open Task Scheduler by pressing `Win + S`, type “Task Scheduler”, and open it.
- Click on “Create Basic Task” in the right pane, give your task a name and description, then click "Next".
- Choose “When the computer starts” as the trigger, then click "Next".
- Select “Start a program” as the action, then click "Next". 
- Browse to `C:\Windows\System32\wsl.exe`.
- In the “Add arguments” field, enter `--distribution Ubuntu` (replace `Ubuntu` with your distribution name if different).
- Click "Finish" to create the task.
 
> _This process sets up a scheduled task in Windows Task Scheduler to start WSL on system startup._>

At this point, you should be able to start inferencing with the models being served or download your first model.

Try accessing [Open WebUI](http://localhost:8080) @ https://localhost:8080 or whatever your ip is of your Open WebUI docker instance.

#### **Nginx Proxy**

I created a proxy that listens on port 443 and passes the traffic to the docker container and port 8080 for Open WebUI GUI

```bash
docker run -d --name nginx -p 443:443 -v ~/conf.d:/etc/nginx/conf.d -v ~/ssl:/etc/nginx/ssl --add-host=host.docker.internal:host-gateway --restart always nginx:alpine
```

```bash
cat << 'EOF' > ~/conf.d/open-webui.conf
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 443 ssl;
    server_name <ip_address>;

    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://host.docker.internal:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Timeouts
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;

        # Disable buffering for real-time responses
        proxy_buffering off;
    }
}
EOF
```

> !NOTE: There are a couple of places in the code that will need to be updated to reflect the correct IP Address

####  **CloudFlare Tunnel**:

In order for me to access my local modle remotely or when I am away from my home network, I decided to created a CloudFlare zero-trust tunnel to make it super easy.  After creating an account and setting up a DNS record, I was given this docker command with token to run.  This just works for me.
   
```bash
docker run -d cloudflare/cloudflared:latest tunnel --no-autoupdate run --token ******eE9Ea3la**********
```
_This command runs the Cloudflare Docker container in detached mode, enabling a tunnel to route traffic through your machine to services running inside WSL._


## Pausing Thoughts

Now our picture is complete and all components are in place for us to: 

- Access the Open WebUI GUI locally an remotely
- Access Ollama via the CLI locally
- Leverage the Ollama API locally

In today’s digital age, we’re constantly navigating between public and private spaces. Whether it’s our online identities or the systems running behind the scenes, striking a balance is key to maintaining control and efficiency.

## What is next?

Next I plan to dive deeper into model specifics around quantization and tuning for efficiency, as well as take a closer look at the settings and features in both Ollama and Open WebUI.  