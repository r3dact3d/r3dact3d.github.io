---
layout: post
comments: true
title: "My Tricks with UFW, Fail2Ban, and Python"
published: true
date: 2019-05-26 19:10:00
categories: python security tech 
---

I am using a combination of tools to monitor, temporarily ban, and block problem IPs that attempt to brute force SSH on my Digital Ocean, Ubuntu server. Then allow SSH, so I can manage my server.

First, I installed ufw to easily create firewall rules. Below commands allow me to show all available options. You can list pre-configured apps that I can allow or block. I can also get more info on a specific app.

```bash
sudo apt-get install ufw
sudo ufw show
sudo ufw app list
sudo ufw app info OpenSSH
sudo ufw allow OpenSSH
```

Finally, enable OpenSSH and you should see output like below:

```
sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
```

Now, you can tail the **ufw.log** in /var/log and soon see some messages, like this guy who wants to see if my telnet is enabled.

```
May 26 18:00:21 redacted kernel: [21013356.740044] [UFW BLOCK] IN=eth0 OUT= MAC=##### SRC=81.22.45.231 DST=###.###.###.### LEN=40 TOS=0x00 PREC=0x00 TTL=245 ID=56969 PROTO=TCP SPT=58567 DPT=23 WINDOW=1024 RES=0x00 SYN URGP=0
```

Secondly, I installed a tool named **fail2ban**. You can follow some of these [How-To’s](https://duckduckgo.com/?q=configure+fail2ban+ubuntu+vps&t=canonical&ia=web) on how to configure fail2ban, but I did a pretty basic config that will just temporarily ban an IP that has multiple SSH login failures in a relatively short period of time.

Once fail2ban is installed and configured to your liking, you can eventually check the **fail2ban.log** in /var/log for IPs… like this guy.

```
2019-05-26 21:04:41,546 fail2ban.filter         [2362]: INFO    [sshd] Found 54.37.44.75
2019-05-26 21:04:41,548 fail2ban.filter         [2362]: INFO    [ssh] Found 54.37.44.75
2019-05-26 21:04:41,554 fail2ban.filter         [2362]: INFO    [ssh] Found 54.37.44.75
2019-05-26 21:04:41,559 fail2ban.filter         [2362]: INFO    [sshd] Found 54.37.44.75
2019-05-26 21:04:43,193 fail2ban.filter         [2362]: INFO    [sshd] Found 54.37.44.75
2019-05-26 21:04:43,194 fail2ban.filter         [2362]: INFO    [ssh] Found 54.37.44.75
2019-05-26 21:07:25,393 fail2ban.filter         [2362]: INFO    [ssh] Found 54.37.44.75
2019-05-26 21:07:25,396 fail2ban.filter         [2362]: INFO    [sshd] Found 54.37.44.75
2019-05-26 21:07:25,419 fail2ban.filter         [2362]: INFO    [ssh] Found 54.37.44.75
2019-05-26 21:07:25,421 fail2ban.filter         [2362]: INFO    [sshd] Found 54.37.44.75
2019-05-26 21:07:25,700 fail2ban.actions        [2362]: NOTICE  [sshd] Ban 54.37.44.75
```

This poor guy seems to be pretty persistent and even after the 10 minute ban period, keeps on trying. So we are going to totally deny him in firewall.

```
sudo ufw insert 1 deny from 54.37.44.75 to any
```

Actually, what I do with the **fail2ban.log** is I added an entry to my crontab like this:

```
0 5 * * * for i in `grep Ban /var/log/fail2ban.log| awk '{print $8}' | sort -u`;do /bin/infoIP.py $i >> /root/bannedIPs.txt;done
```

This will run when scheduled and pull all the Banned IP from the **fail2ban.log** and run the IP against my Python script to provide location and other info, then save it to a file I can check later.

If I want to check stats on where most of the attacks come from I now have a report. Also, I can run this command to add all with deny rules to firewall.

```
for i in `grep Ban /var/log/fail2ban.log| awk '{print $8}' | sort -u`;do ufw insert 1 deny from $i to any;done
```

*Note: you can find my python API script on [Github](https://github.com/r3dact3d/pythonAPIs)



- Brady