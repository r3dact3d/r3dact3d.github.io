---
layout: post
comments: true
title: "Automate Publishing and Promoting Content Views in Red Hat Satellite"
published: true
date: 2019-12-03 12:30:00
categories: redhat satellite automation tech 
---

Recently, I have been working with Red Hat's system mangement solution, a product called Satellite.  If you want more information on what Satellite is or what it can do for you and your organization, please read Crossvale's [data sheet.](https://crossvale.com/satellite/)  However, the purpose of this post is to document the process I used to automate the publishing Content Views and then automate the promotion of those Content View versions to the first step in the Lifecycle Environment path. When a product offers, not only a web browser interface(GUI), but also a CLI and API for installation, cofiguration, and mangement tasks, the possiblilities are endless to what solutions can be achieved.

### The Problem

After the installation of Satellite and updon completing the basic configurations needed, I am left with a simple setup and starting point.  I have multiple Red Hat repositories being synced on a daily basis.  I have a Content View that includes all these repositories and a Lifecycle Environment that goes from Lab > Dev > Stage > Prod.  The problem is that the GUI does not have an option to automatically set a Publish date for the Content View.  So in short terms, even though my repositories are syncing daily, my Content View doesn't see the new packages until I manually Publish a new version of the Content View.  The next manual step to Promote the newly created version to the first environmnet in my Lifecycle path, **lab**, is also needed before any servers in that environment can see or install the new packages.

### The Idea

It makes sense for me to publish a new version of my Content View on the first day of every quarter, as this is the beginning of a regular patch cycle.  I also need to promote that new version to my lab environment in order to patch these servers with all the latest patches.  If these two tasks are standard and expected every quarter prior to being able to patch, then why not automate it?  Since the GUI does not give me the functionality to schedule these tasks, then I will look into using the CLI to develop a solution.  The API is powerful, and in the case of this specific use case, maybe too powerful, so I will focus on the CLI, which actually binds with the API, then sends requests.

### The Hammer

![The Hammer](/images/hammerInfo.png)

The first piece of information I need for this automation to work is the Content View **ID**.  I am also going to wrtie this script so that it will continue to work as more Content Views get created.  So this first line will __list__ all the Content Views and extract just the IDs and put them into a Variable called **CV_IDS**.
```bash
CV_IDS=$(hammer --no-headers --csv content-view list | grep -v Default | cut -d, -f1)
```

Now that I have all the Content View IDs, I want to loop through the list and do some commands.  These next 2 lines in the script will simply say, do something for each ID in the list of CV_IDs.
```bash
for ID in CV_IDs
do
```

I'll go thru each of the next three commands or lines in the script, as these are the meat of the automation.  The below line is going to publish the Content View of the ID extracted above and also set a description of the current date, so that from the GUI or web browser, we can easily see when this version was published.
```bash
    hammer content-view publish --id $ID --description $(/bin/date "+%Y-%m-#d")
```

The next command will create a new variable that holds the newly published Content View's version ID. It is important to note that the version ID and the Content View ID are different.  The Content View ID will always stay the same, unless the Content View is deleted and recreated.  As Content Views are created they get an ID that will always stay with it.  The version ID will change as new versions get published.  In any case, the line below will always get the latest version ID of the Content View that we are working with.
```bash
    VERSION_ID=$(hammer --no-headers --csv content-view version list --content-view-id $ID | head -1 | cut -d, -f1)
```

Armed with the new VERSION_ID, the last command run in the **do** section will promote the new version of the Content View to the __lab__ Lifecycle Environment.  The only thing that needs to be tweaked in this script is the __--org__ argument in this command to match your specific organization.  This argument could be generated automatically, much like the other arguments, but most of the time that is a static organization as most companies only have one org set.  If you need help with setting the org or have multiple orgs and would like help automating that argument, please reach out to me [here](redactedtech@gmail.com).
```bash
    hammer content-view version promote --org r3dact3d --content-view-id $ID --id $VERSION_ID --to-lifecycle-environment lab
```

### Putting It All Together

The final verson of this script should come togethr like this.  It is important to note here, that the more Content Views there are, the longer this script will take to run.  The commands do not run in sync and they wait for the previous command to finish before starting the next command.  Publishing and promoting each take sometime several minutes to complete.  If there is interest in working with me to devbelop an **asynchronous** automated approach, please reach out to me [here](redactedtech@gmail.com)
```bash
CV_IDS=$(hammer --no-headers --csv content-view list | grep -v Default | cut -d, -f1)
for ID in CV_IDs
do
    hammer content-view publish --id $ID --description $(/bin/date "+%Y-%m-#d")
    VERSION_ID=$(hammer --no-headers --csv content-view version list --content-view-id $ID | head -1 | cut -d, -f1)
    hammer content-view version promote --org r3dact3d --content-view-id $ID --id $VERSION_ID --to-lifecycle-environment lab
done
```

The only thing left to do now is adding this to my crontab for the day and time I want it to run!  Voilà we have an automated solution.  Now when I want to patch my lab servers I can begin patching without any manual steps to Publish a new Content View version or promote that version to my lab environment.


- Brady