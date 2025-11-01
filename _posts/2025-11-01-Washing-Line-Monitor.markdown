---
layout: post
title:  "washing line monitor"
date:   2025-11-01
categories: Projects
thumbnail-img: /assets/washinglinemonitor2.jpg

---

Upon moving out of home, I came across a problem, whenever I tried to dry my clothes outside, it would start raining. This meant i would have to take them inside and use the dryer. The easiest solution is just to use the dryer. I estimate that it would only cost around $30 a year to do this, however, I am stubborn, so i set out to fix the issue.

The solution was a device that estimates the wetness of your clothes. It can that notify you when they are either dry, or will be rained on before they are dry.

The first iteration used a temperature and humidity sensor to estimate the amount of water in the air (absolute humidity). This data was then sent back to the webserver (used in [home hydro](2024-03-01-Indoor hydroponics v2.markdown)) which would then store the data and produce plots. In the sample below, you can see the absolute humidity dropping and then reaching a steady state at about 3pm. This is the point at which we expect the clothes to the dry (the rapid jump at 5:30pm is when i bought the sensor indoors). 

![washinglinemonitor1](/assets/washinglinemonitor1.png){: width="30%" } 


Unfortunately, this plot doesn't tell the full story. Whilst the sensor performed flawlessly in determining when the bulk of the clothes were dry (things like the towels were dry), it did not account for the layered parts such as the pockets of jeans. The small volume of water in the pocket don't register as a change in humidity. 

A second iteration that measures the moisture content via a fabric sample is in the works and looking promising.


![washinglinemonitor2](/assets/washinglinemonitor2.jpg){: width="30%" } 
