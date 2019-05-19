---
layout: post
comments: true
title: "Enhanced SSL Cipher Walkthrough"
published: true
date: 2019-05-18 13:34:00
categories: security redhat tech tutorials
---

If your site or service has any interaction with customer data, especially credit cards, then you will want to ensure that you are using the latest up-to-date SSL ciphers. Below are some quick notes that I took while recently updating some ciphers I'm responsible for. A lot of credit goes to Ivan Ristic as I did spend time reading thru his OpenSSL Cookbook. This post will not cover creating or converting SSL keys, but focus more of the cipher suite and how to change to increase security.

##### Find out current complete version info
![opensslVersionA](/images/openSSL_versionA.png)

Notice the **OPENSSLDIR** line near the end of the output, that is where my openSSL working directory is located.
![SSLdirStruct](/images/SSLdirStruct.png)

Here are a couple hints on getting some help outside of obviously using the man page, but it can be a little overwhelming if you are not sure just where to go next.  On my RHEL6 and newer servers I can get some clues on sub-commands just by typing **openssl** at the command line and hitting tab button twice.

##### Tab completion for openssl
![tabtabOpenSSL](/images/tabtabOpenSSL.png)

However, with the help of the **man** command, I learn that we can list all supported ciphers in order of **strength**.

##### Cipher Strength
![cipherListbyStrength](/images/cipherListbyStrength.png)

I have list of _recommended_ ciphers to use, but I need to find which supported ciphers I actually can use. This can be tricky, especially if you are supporting multiple versions of an OS.

We can use **groups** to narrow down what I want. With the **+** sign, I can tie different groups together to make a string and search and **:** to seperate, in order to list multiple strings to search for.

##### TLSv1 Ciphers
![shortList](/images/shortList.png)

Keep in mind that if we only select the strongest suite, I suppose some clients that aren't up to date may face some issues. This is your call to follow the strong suites with weaker ones. For example, I'm going to jump over to my Nagios server to finish the task of using more enhanced ciphers, and we can see that I'm going to put in order the ciphers I want to use and basically not use any weak ones.

##### Available Ciphers on RHEL6
![availableCiphers](/image/nagiosCiphers.png)

This config still gives me a lot of ciphers to work with.  Let us set the config to reflect the new suites we want for our SSL connections.  Basically take the search groups we used and find the line for **SSLCipherSuite** in your website conf file.

##### Cipher Config
![cipherConf](/images/cipherConf.png)

[Red Hat]()



- Brady