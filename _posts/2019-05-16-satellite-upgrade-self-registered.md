---
layout: post
comments: true
title: "Red Hat Subscription Management for Self-Registered Satellite Upgrade"
published: true
date: 2019-05-16 13:30:00
categories: tutorials tech redhat
---

So I learned today while preparing to upgrade my Red Hat Satellite server from 6.2 to 6.3 before taking the next step in the path to 6.4, that self-registered Satellite server upgrade is not possible.  This means I needed to unregister my server, basically from itself, and register it to the Red Hat CDN. 

This process was not that big of a deal, until I realized that my Satellite Subscriptions were all already entitled to the Satellite manifest.  There was a **NOTE** in the Red Hat docs that even provided a link to [Managing Subscriptions](https://access.redhat.com/documentation/en-us/red_hat_satellite/6.2/html/content_management_guide/managing_subscriptions"), and you can look for yourself, but I didn't see any clear instructions on how to remove a subscription from the manifest.  

![Red Hat NOTE](/images/manifestNote.png)
    
- Brady