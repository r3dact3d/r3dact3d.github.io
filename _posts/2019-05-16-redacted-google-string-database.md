---
layout: post
comments: true
title: "Helpful Google Dork String"
published: true
date: 2019-05-16 13:30:00
categories: tutorials tech 
---

My collection of strings to enhance google results.  Google is obviously an extremely powerful web crawler.  Learning some specific **keyboards** and **operators** will change the way this search engine will work for you.  There are already alot of sites our there that walk you thru some of the different ways to use google, but here I am just putting what I like to search for and some examples I found. 

Basically, the whole idea here is to start with something simple and continue to add to it in order to narrow the search results down to what you might otherwise not find.

To begin, I start with the **intitle** operator with a keyword and add one keyword with the **+** operator. 

This little snippet with return results that have **network security** in the title and also includes the keywork **news** in the result.
```
intitle:”network security” + news
```
I want to go farther and find some example **Network Security Policies** that maybe some colleges or other goverments use.  Most of the times the policies will be in pdf format, so I will use a google string like this one below.
```
intitle:"network security policy" filetype:pdf site:gov
```
Very similar to the previous example, we can change up the keywords a bit and also add the **inurl** operator with a different **filetype** keyword to find very specific results.
```
site:edu intitle:”socket programming” inurl:lecture filetype:ppt
```
Another favorite that I look for are different files that are found in http **Index of** diretories.  The example below shows how we can combine **intitle** operators and the **-inurl** operators, where the dash infront of the operator will ensure that the search results do not include the keyword attached to it.
```
inurl:edu intitle:"index of" -inurl:htm -inurl:html
```
Now, with this search string we can add keywords and filetypes to look for very specific results.  We can even get more specific with the directory we want to look for.
```
inurl:edu intitle:"index of" -inurl:htm -inurl:html inurl:mp3 
```

The key is to be creative and know what you are looking for.  However, please keep in mind the power of google and be respectful of how you use it.  Happying dorking!




- Brady