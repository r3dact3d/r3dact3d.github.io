---
layout: post
comments: true
title: "Multiple Host Ping Sweep Script"
published: true
date: 2019-05-17 01:25:00
categories: perl tech 
---

I have simplified my original multiple host ping sweep script. All you need for this script to work is a hosts.txt file with a list of host names or IP addresses and of course the script below.  I should make this a github gist...

```perl
#!/usr/bin/perl -w
use strict;
use Net::Ping;
my $hostList = $ARGV[0];
if(!defined $hostList){
  print "Usage: $0 <List of hosts or IP addresses>\n";
  exit;
}
open(LIST, $hostList) or die "Can't open hosts.txt file to load into array: $!";
our @hosts = <LIST>;
close(LIST);
my $p=Net::Ping->new("icmp", 2);
foreach my $host(@hosts){
  chomp($host);
  print "Pinging $host\n";
  unless($p->ping($host)){
    print "$host has failed: ",scalar(localtime)," \n";
  }else{
    print "$host was a success: ",scalar(localtime)," \n";
  }
}
exit;
```
Also, we can change protocol from *icmp* to *tcp*. Actually, as this line below shows you can use any of these protocols with the ping module. (Protocol for ping must be “icmp”, “udp”, “tcp”, “syn”, “stream”, or “external”).

- Brady