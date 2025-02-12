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

## Options

### Standalone AI Vendors

- Mistral
- Claude
- ChatGPT

### Remote Private AI

- Auto Intelligence 

### Local Home Lab AI

<MarginNote>![0ri0n Local AI](../images/0ri0n-Local-AI.jpg) _My Home Lab Architecture for Operation 0ri0n_</MarginNote>

<MarginNote>NOTE: This is an important note about the image or any other content that should be highlighted.</MarginNote>

#### Linux Who
> wsl --install
larry

#### Install docker
$ curl https://get.docker.com | sh

## Install Nvidia driver
$ curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey |sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list && sudo apt-get update
$ sudo apt-get install -y nvidia-container-toolkit
$ sudo service docker restart

#### Open-WebUI and Ollama
$  sudo docker run -d -p 3000:8080 --gpus=all -v ollama:/root/.ollama -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:ollama


#### Setup Static IP on 0ri0n
/etc/netplan/01-netcfg.yaml
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


#### Exposing WSL Port in Windows 1
> netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=3000 connectaddress=<IP_ADDRESS>
> netsh interface portproxy show all

> netsh interface portproxy add v4tov4 listenport=443 listenaddress=0.0.0.0 connectport=443 connectaddress=172.20.87.223



#### Starting WSL on Windows 11 startup

Using Task Scheduler
Open Task Scheduler: Press Win + S, type “Task Scheduler”, and open it.
Create a New Task:
Click on “Create Basic Task” in the right pane.
Give your task a name and description, then click “Next”.
Choose “When the computer starts” as the trigger, then click “Next”.
Select “Start a program” as the action, then click “Next”.
Click “Browse” and navigate to C:\Windows\System32\wsl.exe.
In the “Add arguments” field, enter --distribution Ubuntu (replace “Ubuntu” with the name of your Linux distribution).
Click “Finish” to create the task.





#### CloudFlare Tunnel

docker run -d cloudflare/cloudflared:latest tunnel --no-autoupdate run --token ******eE9Ea3la**********

## Validate GP
$ nvidia-smi -l


## Open WebUI Configuration

### Models

### Enable Search Engine

- Google Programmable Search Engine
  - Search Engine - 0ri0n Glass
  - API Key - 0ri0n Local