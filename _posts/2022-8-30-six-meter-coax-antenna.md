---
title: "DIY: 6 Meter Coax Antenna"
excerpt_separator: "<!--more-->"
categories:
  - Amateur Radio
tags:
  - ham radio
  - simplex
  - vhf
  - diy
  - antenna
---

## My DIY 6 Meter Coax Antenna

Summer 2022 is almost here and I've been hearing about the 'Magic Band' and how 6 meters can be used to make regional contacts as opposed to just local contacts I usually make on 2  meter simplex.  So that means fun in the short term, but long term operating on 6 meters can come in handy during emergency situations.  

I have a TYT TH-9800D Quad band radio that can rx/tx on 6 meters pushing up to 50 watts, all I need now is an antenna.  What I have to work with is 50 feet of RG-58 coax cable and here is how I made my 6 meter antenna using that cable.

<!--more-->

### Determine total length of half-wave antenna for 50Mhz
This is the formula used to determine how long to make the radiating elements of the antenna: 

'''
Length = 468 / freq Mhz 
'''

So for 50 Mhz, the total length of my antenna will be 9.4 feet when rounding up... longer is better for tuning, because you can always shorten later.  Now converting the feet to inches, we have a total of 112 inches. 

![6meter-coax-wrapped](/images/6meter-coax-wrapped.jpg){: .align-right}

### Determine length of wire to unshield

Now that we have the length of the antenna portion(112 inches), we can divide in half to find the length of each end of the dipole.  Taking half, which is 56 inches, I stripped the insulation and coax shielding off the end, leaving the 56 inches of the end of the coax cable exposing the inner bare wire.  

Note: Leaving the clear insulated cover on the inside of the shielding is ok.{: .notice--info}

At this point, I measure another 56 inches from the exposed wire and marked my cable with a piece of tape, totaling 112 inches from the end of the cable.  This gives me, 56 inches of exposed wire and 56 inches of shielded wire, the total length of the antenna is 112 inches. 

![6meter-coax-mast](/images/6meter-coax-mast.jpg){: .align-left}

### Create choke

To make this work, I need to make a choke where I placed my tape marking the end/beginning of my antenna.    We need the choke to stop the outside shield current, essentially creating a feedpoint for the antenna. 

For coax with an impedence of 50ohms, I need to create a choke that has an inductance of 200ohms.  This formula will return the nanohenrys we need to determine how many turns we need to create >200ohms inductance.

'''
nH = 31800 / freq Mhz
'''

This returns to me 636 nanohenrys.  I took this value and input into the calculator on translatorscafe along with the diameter of my coax to get the number of turns I need for my size former.  I just used a half inch piece of pvc.

![6meter_signal_prop](/images/6meter_signal_prop.png){: .align-center}
