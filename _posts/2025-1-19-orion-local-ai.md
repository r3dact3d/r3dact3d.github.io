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
>Users should exercise caution when providing personal or confidential details and consider implementing best practices such as encrypting sensitive data and regularly reviewing privacy policies for any service they use.

- [Mistral](https://chat.mistral.ai/chat)
- [Claude](https://claude.ai)
- [OpenAI](https://openai.com/)

## Remote Private AI

Running Large Language Models (LLMs) in a private but remote setup, as demonstrated in the GitHub repo, offers a balance between local control and scalability by leveraging external servers or cloud resources that are dedicated to your organization. 

This approach provides better data privacy compared to public clouds while still offering ease of management, performance benefits over public networks, and scalable infrastructure for handling larger workloads.

> WARNING: This will get very expensive.

- [Auto Intelligence]()

### Local Home Lab AI

Running Large Language Models (LLMs) locally offers enhanced data privacy, faster performance due to reduced network latency, and greater flexibility for customization and integration with on-premises systems. 

This setup also provides better control over resources and can be cost-effective in the long run, especially for organizations with existing hardware infrastructure.

![0ri0n Local AI](../images/0ri0n-Local-AI.jpg) _My Home Lab Architecture for Operation 0ri0n_

Certainly! Here's the technical document with comments explaining each step:

### Technical Document: Setting Up Open-WebUI and Ollama

#### Hardware Thoughts

Certainly! Here's how you can present the hardware recommendations in Markdown format:

### Recommended Hardware Components

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

4. **NVIDIA Drivers**:
   - The latest NVIDIA drivers installed to leverage GPU acceleration effectively in Docker containers.

This setup will help you run Open-WebUI and Ollama effectively on your system.

> By choosing Windows 11 and relying on WSL (Windows Subsystem for Linux), we are leveraging the popularity and ease of use of a Windows environment while harnessing the power of Linux, simply because this setup is popular and convenient for highlighting and testing out the capabilities of WSL.

#### Prerequisites:

From Windows 11 - open a PowerShell prompt as Administrator and run:

1. **WSL Installation**:
   ```bash
   > wsl --install
   ```
   _This command installs Windows Subsystem for Linux (WSL) to provide a lightweight version of Linux on your Windows machine._

2. **Docker Installation**:
   ```bash
   $ curl https://get.docker.com | sh
   ```
   _This command downloads and runs a script that automatically installs Docker on the system._

3. **Install Nvidia Driver for Docker Containers**:
   ```bash
   $ curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey |sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list && sudo apt-get update
   ```

   ```bash

   $ sudo apt-get install -y nvidia-container-toolkit
   
   $ sudo service docker restart
   ```
   
   _These commands download and add the necessary GPG key, configure the NVIDIA container toolkit repository, install the toolkit, and then restart Docker to use the GPU with Docker containers._

#### Steps:

1. **Install Open-WebUI and Ollama**:
   ```bash
   $ sudo docker run -d -p 3000:8080 --gpus=all -v ollama:/root/.ollama -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:ollama
   ```
   _This command runs the Open-WebUI Docker container in detached mode, maps port 3000 to port 8080 inside the container, uses all available GPUs, mounts local directories for persistent storage, and restarts the container if it stops._

2. **Set Up Static IP on 0ri0n**:
   Edit `/etc/netplan/01-netcfg.yaml` with the following configuration:
   ```yaml
   network:
     version: 2
     renderer: networkd
     ethernets:
       eth0:
         dhcp4: no
         addresses:
           - 172.20.87.223/20
         routes:
           - to: default
             via: 172.20.80.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   ```
   _This YAML configuration sets up a static IP address for the network interface `eth0`, assigns it a specific IP (`172.20.87.223`), configures default gateway and DNS servers._

3. **Expose WSL Port in Windows**:
   Run the following commands in PowerShell as Administrator:
   ```powershell
   > netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=3000 connectaddress=<IP_ADDRESS>
   > netsh interface portproxy show all
   > netsh interface portproxy add v4tov4 listenport=443 listenaddress=0.0.0.0 connectport=443 connectaddress=172.20.87.223
   ```
   _These commands map ports on the Windows machine to ports in WSL, allowing access from the host machine to services running inside WSL._

4. **Start WSL on Windows 11 Startup**:
   - Open Task Scheduler by pressing `Win + S`, type “Task Scheduler”, and open it.
   - Click on “Create Basic Task” in the right pane, give your task a name and description, then click "Next".
   - Choose “When the computer starts” as the trigger, then click "Next".
   - Select “Start a program” as the action, then click "Next". 
   - Browse to `C:\Windows\System32\wsl.exe`.
   - In the “Add arguments” field, enter `--distribution Ubuntu` (replace `Ubuntu` with your distribution name if different).
   - Click "Finish" to create the task.
   _This process sets up a scheduled task in Windows Task Scheduler to start WSL on system startup._

5. **CloudFlare Tunnel**:
   ```bash
   docker run -d cloudflare/cloudflared:latest tunnel --no-autoupdate run --token ******eE9Ea3la**********
   ```
   _This command runs the Cloudflare Docker container in detached mode, enabling a tunnel to route traffic through your machine to services running inside WSL._

6. **Validate GPU Installation**:
   ```bash
   $ nvidia-smi -l
   ```
   _This command lists the current state of NVIDIA GPUs and drivers on the system._

7. **Open WebUI Configuration**:
   - Enable Search Engine:
     - Google Programmable Search Engine
       - Search Engine: 0ri0n Glass
       - API Key: 0ri0n Local
   _These configurations enable a programmable search engine for Open-WebUI with specific settings._

## Open WebUI Configuration

### Models

### Enable Search Engine

- Google Programmable Search Engine
  - Search Engine - 0ri0n Glass
  - API Key - 0ri0n Local