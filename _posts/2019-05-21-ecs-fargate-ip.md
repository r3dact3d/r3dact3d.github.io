---
layout: post
comments: true
title: "Amazon ECS - How To Find Fargate IP"
published: true
date: 2019-05-21 21:55:00
categories: aws containers tech 
---

So, this is another one of those documentation posts where I struggled to find something that should not have been that difficult to find.  In short, I created a quick spin up of an Amazon ECS cluster with a castleMock image to do some quick testing.  The problem came when I was looking for the IP address of the CastleMock service.

#####From your AWS Console, go to the ECS Cluster and click on your cluster name

![ecsCluster](/images/ecsCluster.png)

#####Next, click on the **Tasks** tab to show the ECW Task and click on the link under **Task**

![ecsTask](/images/ecsTasks.png)

#####Now we can see the Network Details and the IP address that are listed

![ecsDetails](/images/ecsDetails.png)

I know this seems like very simple information to find, but when I can't find it super easily and can't find a **How to** on google, I feel it's time to put it out there.

- Brady