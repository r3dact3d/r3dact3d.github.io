---
layout: home
title: Home
---

# Welcome to My Blog

Hi, I'm [Your Name], a [Your Profession] with a passion for [Your Interests]. On this site, you'll find a collection of my technical articles, blog posts, and other content.

## Latest Posts

<ul>
  {% for post in site.posts limit:3 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

## About Me

- [Link to Second Brain project](https://your-second-brain.com)
- [Link to qrz profile](https://www.qrz.com/your-profile)
- [Link to other social media profiles or resources]

## Explore

- [Categories](/categories/)
- [Tags](/tags/)
