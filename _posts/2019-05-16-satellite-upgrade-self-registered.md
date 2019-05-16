---
layout: post
comments: true
title: "Red Hat Subscription Management for Self-Registered Satellite Upgrade"
published: true
date: 2019-05-16 13:30:00
categories: tutorials tech redhat
---

So I learned today while preparing to upgrade my Red Hat Satellite server from 6.2 to 6.3 before taking the next step in the path to 6.4, that self-registered Satellite server upgrade is not possible.  This means I needed to unregister my server, basically from itself, and register it to the Red Hat CDN. 

This process was not that big of a deal, until I realized that my Satellite Subscriptions were all already entitled to the Satellite manifest.  There was a **NOTE** in the Red Hat docs that even provided a link to [Managing Subscriptions](https://access.redhat.com/documentation/en-us/red_hat_satellite/6.2/html/content_management_guide/managing_subscriptions), and you can look for yourself, but I didn't see any clear instructions on how to remove a subscription from the manifest.  

![Red Hat NOTE](/images/manifestNote.png)
    
So the steps to accomplish removing the subscription you need from the Satellite manifest is go to [Red Hat Customer Portal](https://access.redhat.com/) and follow **Subscriptions** > **Subscription Allocations**, then select your Satellite server that has the manifest of your subscription and click on the **Subscriptions** tab.  This should bring you to a screen like the screenshot below.

![Satellite Subscription Screenshot](/images/satelliteSubs.png)

Now, if you see the awesomely drawn red circle above, all you need to do is click the little edit icon just to the right of the number displaying the **Entitlements** allocated to the Satellite manifest.  This will now let you change the number, more than likely to lower it and it will automatically release the subscription from the manifest for use in the customer portal.

Hope this helps someone from doing something, like deleting manifest or worse, thinking that is what is needed.  I know it seems like something very easy to figure out, but for some of us after working 12-16 hours may not see it right away.  I did a little google-fu and didn't see anything that pointed me to the solution, so that is why I am posting here!

- Brady