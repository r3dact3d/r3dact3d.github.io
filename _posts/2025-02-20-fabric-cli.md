---
title: "Enahnce CLI Productivity with AI"
hidden: true
excerpt_separator: "<!--more-->"
categories:
  - Amateur Radio
tags:
  - simplex
  - MobOps
  - HF
  - Antenna
---

\[📡 What is it?\]
-------------------------

> **Fabric is an open-source framework designed to augment humans using AI.**

It simplifies the process of integrating large language models (LLMs) into command-line workflows by providing a modular framework for solving specific problems with crowdsourced sets of AI prompts that can be used anywhere.

> Fabric was created by Daniel Miessler in January 2024.
> - [Fabric GitHub](https://github.com/danielmiessler/fabric)
> - [Fabric Origin Story](https://danielmiessler.com/blog/fabric-origin-story)

* * *

Purpose and Key Features
-------------

The primary goal is to make AI tools more accessible to the broader community, particularly developers, system administrators, and other command-line heroes who want to integrate Generative AI into their workflows efficiently.
 
- **Simplification**: Easy for users to leverage LLMs without having to develop their own frameworks or wrappers.
- **Modularity**: Designed as a collection of modular patterns, allowing users to integrate various LLMs seamlessly into their command-line workflows.
- **Crowdsourced Prompts**: Diverse set of AI system prompts contributed by the community.

> Think of getting a deep summary of a youtube video that you are interested in, but don't have the cycles to watch.
>  Checkout the [Extract Wisdom](https://github.com/danielmiessler/fabric/tree/main/patterns/extract_wisdom) and [Extract Instructions](https://github.com/danielmiessler/fabric/tree/main/patterns/extract_instructions) patterns.
>
> Here is an example output from the Extract Wisdom pattern used on the Fabric Origin Story Youtube video [fabrid-origin](https://r3dact3d.github.io/brain-dump/Fabric/fabric-origin)

* * *

🛠 \[Problems Solved\]
----------------------------------

- **Development**: Developers can quickly integrate LLMs into their projects without the need to build custom wrappers.
- **System Administration**: System administrators can automate routine tasks such as documentation summarization, code generation, and troubleshooting using Fabric and never leaving the command line or by calling from already established automation pipelines.
- **IT Professionals**: Command-line Heroes can leverage Fabric for various use cases, including data analysis, automation scripts, and more.
  
* * *

### 📈 \[Installation\]

This guide will walk you through each step with detailed commands and ensure Fabric is ready for use in your command-line workflows on a Fedora 41 laptop.

- [Install and Setup Guide](https://r3dact3d.github.io/brain-dump/Ideas/Fabric%20Install%20Setup%20Guide)
  
  * * *

### Real-World Use Cases

#### Automating Daily Tasks
  
I am often facilitating working sessions and doing discovery at the same time and sometimes these meetings can last 2 or 3 hours. 

I've learned that I miss a lot of facts and important information in real time, after either re-watching or reading through the meeting transcript afterwards, because I'm usually making plans or recommendations for the customer.

Now, instead of taking potentially 6+ hours to meet with the customer or team, collate all the data that was taken in, and reply with at least a summary. 

I can do in just moments after the meeting is ended and the transcript is automatically created using a small 8b parameter model that is trained and prompted for this specific task, all while keep the data secure and local.

> Here is an example using a community meeting transcript
>
> ```bash
> $ cat community_improvements_initative_march.txt | fabric --stream --pattern summarize_meeting
>
> ```markdown
> * Meeting Transcript: Community Improvements Initiative
> * Date: March 22, 2023
> * Time: 2:00 PM - 3:00 PM
> 
> **Attendees**
> * Jane Smith, Community Outreach Manager
> * John Doe, City Councilor
> * Sarah Johnson, Local Business Owner
> * Tom Brown, Community Advocate
> 
> **Meeting Summary**
> The meeting was called to discuss community improvements and initiatives. The discussion lasted for one hour and approximately 5,000 words were spoken during that time.
> 
> * Jane Smith: "We believe that our community can be improved by investing in local businesses and supporting their growth. This will not only benefit the business owners but also create jobs and stimulate economic growth."
> 
> * John Doe: "I agree with Jane's statement. However, we must also consider the needs of our residents. We should invest in public transportation and infrastructure to make it easier for people to access basic services."
> 
> * Sarah Johnson: "As a local business owner, I can attest that investing in businesses is crucial. But we must also consider the environmental impact of our actions. We should aim to create sustainable practices throughout our community."
> 
> * Tom Brown: "I appreciate everyone's input. However, we must prioritize the needs of our most vulnerable residents. We should provide more resources for mental health services and address the issue of homelessness in our community."
> 
> **Action Items**
> 
> * Develop a plan to invest in local businesses.
> * Research and recommend public transportation options.
> * Create a sustainability committee to promote environmentally friendly practices.
> 
> **Next Steps**
> The meeting was adjourned with the understanding that the attendees would review the minutes and provide feedback within the next 48 hours.
> ```
  
#### Enhancing Workflow Efficiency

I can continue to leverage Fabric and my local language model to further this workflow's efficiency by using pipes, something in every command-line heroe's toolkit.

Taking the output from the previous models response and generative summarization of the meeting transcript, we can pipe to another **pattern** and or even another LLM all together. 

> Here I'm going to summarize the meeting transcript, then pass it to another pattern that will create a formal email and save it as a markdown file.
> 
> ```bash
> $ cat community_improvements_initative_march.txt | fabric -sp summarize_meeting | fabric -p create_formal_email -o email-response.md
> ```

> ```markdown
> # GREETING
> Dear [Title] [Last Name],
> 
> # INTRODUCTION
> 
> I am writing to follow up on the community development meeting that took place recently. The group discussed various initiatives for community improvement, which I believe are crucial for our town's growth and prosperity.
> 
> # BODY
> 
> Some of the key discussion points included investing in local businesses, public transportation, environmental sustainability, and addressing homelessness. These topics require careful consideration to ensure we allocate resources effectively.
> 
> In response to these discussions, the following action items were assigned:
> 
> Develop a plan to invest in local businesses.
> Research public transportation options.
> Create a sustainability committee.
> 
> I would appreciate it if you could review the minutes of our meeting and provide feedback within 48 hours. This will help us move forward with implementing the discussed initiatives.
> 
> 
> # CLOSING
> 
> Thank you for your time and consideration, and I look forward to hearing back from you soon.
> 
> Best regards,
> 
> [Your Name]
> ```

#### Collaboration and Sharing

This is a very simple example, however, I think we can all see the power built-in to this workflow.  The ability to chain or pipe both input and output to different Generative AI models, but we can also, apply different patterns or prompts to individual models and datasets.

Imagine a workflow that could pick up any file that lands in a specific directory.  Could be a text note document, a website link, an image, or youtube video.  A job picks up this file and applies a pattern to process the data using Fabric and a LLM that outputs multple data files that represent user stories, tasks and instructions, deep analysis on the content of the data, or even just a description. Multiple outputs with multiple pipe options to enhance or extend the workflow and essentially the manipulation of the data using Generative AI.

> I invite you to explore some of these patterns I've been creating and testing.
> [Fabric Patterns](https://r3dact3d.github.io/brain-dump/AI/Fabric%20Patterns)

### Conclusion

The intent is to simplify the integration of Generative AI LLMs into command-line workflows, making it more accessible and practical for developers, system administrators, and other [command-line heroes](https://www.redhat.com/en/command-line-heroes). With Youtube integration, options for URL scraping, and crowdsourced system prompts ensure that users can benefit from a wide range of AI capabilities without extensive development efforts.