---
layout: post
comments: true
title: "Continuous Deployment with GitHub Actions - AWS SAM"
published: true
date: 2019-09-29 19:10:00
categories: python aws lambda github tech
---

A couple of weeks ago, I finally got my email giving me access to the new feature released by GitHub, called GitHub Actions.  This weekend, I finally got some free time to play around with it and kick the tires so to speak.  The purpose of this post is to run through a simple Continuous Deployment workflow I was able to setup using the new GitHub Actions feature.

### The Plan

The idea here is to leverage GitHub Actions to create a pipeline or _workflow_ to automatically deploy/update an AWS Lambda function using the Serverless Application Module everytime a GitHub branch is merged into the master branch.  I used an already working Lambda function that serves as a twitter bot with the purpose of retweeting tweets to promote technical conferences that are looking for speakers and papers.

To get this plan in motion, I decided to create a new repository named CallForSpeakersTwitterBot to hold this project.  This repo will hold the main python function, the requirements.txt file, the Cloudformation template, and the _.github/workflows_ directory, which holds my deploy.yaml, that is needed for GitHub Actions.  The python code and requirements.txt file were simply moved over to the root of the repo from the original repo that house all of my Lambda functions.  I am not going to go into details on the actual Twitter bot as that's not the focus of this article.  However,  there are two things I would like to mention.  One, this function requires a python module that is not located by default within Lambda, which is why I need to use SAM, so that I can automate the packaging of the module with the Lambda function.  Two, I store my Twitter secrets needed by my bot in AWS SSM Parameter Store and these secrets are passed to the function as Environment variables defined in the template.

### Cloudformation Template

The Cloudformation template is also pretty straight forward.  It defines the basic resources that are needed for most Lambda functions, except instead of a Lambda resource, I define a Serverless Function resource also referred to as SAM.  Along with the SAM, it has the following resources defined - Role and Policy, Events Rule, and Invoke Permission.  The main thing to note here, is that the Policy and Role is defined, in order to give the function permissions to read from the SSM Parameter Store and access to Cloudwatch.  It needs read access to the SSM Parameter Store.

### AWS Credentials

Another requirement when working with AWS services is the need for an IAM User or Role with permissions to access the AWS services being leveraged.  In my case, I have an IAM User with Access keys that needs to be stored both securely and somewhere that can be used on the fly so that this process can stay truly automated.  Here, I used GitHub Secrets to store my AWS credentials, so the are both encrypted and not visible in my code and I can call these secrets from the code.  You can learn more about GitHub Secrets on their blog [here](https://github.blog/2011-10-21-github-secrets/).

[![GitHub Secrets](/images/githubSecrets.png)](https://github.com/r3dact3d/r3dact3d.github.io/blob/master/images/githubSecrets.png)

### Workflow

Now that we have our new repo with the code in place and all our secrets staged securely, we can get to the meat of our topic which is setting up the workflow for GitHub Actions.  I began by reading through some of the documentation provided by GitHub at <https://help.github.com/en/categories/automating-your-workflow-with-github-actions>.  The first step of getting a workflow setup, is creating directory to store our yaml template.  The documentation states that we must store workflows in the _.github/workflows_ directory in the root of our repository.  The documentation also provides a good Workflow file example, but I’ll step through mine to show how I setup my deployment workflow.

Inside the workflow directory I created a file called deploy.yaml and began by adding a trigger.  This first section means that, on successful push to the master branch, the rest of the workflow will be run.  There are many possibilities and combinations of events that can trigger a workflow.

```markdown
name: Continuous Deployment of SAM CFS Twitter Bot
on:
  push:
    branches:
      - master
```

Once the workflow is triggered, I defined one _job_ with an ID of _deploy_ and named the job _Deploy Lambda_.  Also, we can see I chose ubuntu-latest as the virtual machine to run the job on.

```markdown
jobs:
  deploy:
    name: Deploy Lambda
    runs-on: ubuntu-latest
```

For each job, we can define _steps_ and for each step, we can define a number of commands.  In my case, I have basically three commands that I need to run to build, package, and deploy the Lambda function.  However, before I can run any commands I need to call an action to _checkout_ my repo for use with the workflow.  The line _-uses: actions/checkout@master_ accomplishes this by checking out my master branch and stages it as my working directory.

```markdown
    steps:
      - uses: actions/checkout@master
```

Taking advantage of the true spirit of Opensource, I found another _action_ that was already created by GitHub user [apex](https://github.com/apex/actions/tree/master/aws/sam) that I used to run the AWS SAM commands.  To add a note here, according to GitHub’s documentation on virtual machines, it lists all the available commands that are by default usable, but the AWS SAM CLI is not installed by default.  The remaining three commands all use the _apex/actions/aws/sam@master_ action to perform the building of the SAM, the packaging, and deployment of the Cloudformation Stack.  Keep in mind that the IAM user that runs these commands need permissions to create and update cloudformation stacks, as well as a S3 bucket created.

For each of these commands, I name them and call the action that is needed to run the command.  Even tho I call these actions three times, the action is only build or compiled one time in the beginning.

```markdown
      - name: Build
        uses: apex/actions/aws/sam@master
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        with:
          args: build
      - name: Package
        uses: apex/actions/aws/sam@master
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        with:
          args: package --s3-bucket callforspeakerstwitterbot --output-template-file out.yaml
      - name: Deploy
        uses: apex/actions/aws/sam@master
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_DEFAULT_REGION: us-east-1
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        with:
          args: deploy --template-file out.yaml --stack-name CallForSpeakersStack --capabilities CAPABILITY_NAMED_IAM
```

Now that the workflow is created, and this branch is merged to master, the process will automatically be started.  We can watch the Action in progress or go back and check it for errors after it runs.  Below, we can see each step of the way is logged, and even more info is granted upon clicking on the name of the command, as shown with the _deploy_ command.

![GitHub Actions](/images/githubactions.png)

### Wrap Up

There are a lot of possibilities with GitHub Actions from user notifications on a high number of possible triggers, CI/CD, and testing.  It’s nice having a free option to develop these GitHub Actions from the public repos I already use to store my code.  There are still a few issues I came across, like the inability to just install a package I need straight to the virtual machine and add it to my path for use, but then again it maybe I am just missing something.  Either way, it is an exciting offer that for now is completely free for public GitHub repos.



- Brady
