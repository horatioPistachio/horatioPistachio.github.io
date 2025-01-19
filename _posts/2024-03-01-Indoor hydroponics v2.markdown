---
layout: post
title:  "Indoor Hydroponics v2"
date:   2024-03-01
categories: Projects
thumbnail-img: /assets/homeHydro_v2b_2.jpg

---


Following on from version 1, the system was redesigned from scratch.  Significantly more thought was put into the goal of the system. The focused goals informed design designed. The goal of this system is to be able to gather and process large amounts of data about the plant being grown. The end goal is to grow fruit trees indoors.
## v2a
This was the first iteration of v2. It focused on a single plant.
The biggest changes were
- Improved focus on size
- Custom PCBs
- EC measuring
- A webserver that allows for scalable data storage that
- API and dynamic front end for easier to use
- Controlled by esp32 (Adafruit feather)
- Improved pump and drain system
- USB c powered (no pd... just yet)

The new webserver dramatically improved development as the API provided a portal to dump logs and sensor data easily. The information could then be used to diagnose issues. One of the difficulties with generating so much data was being able to retrieve it. initially all the sensor data was retrieved at once which caused a huge delay in loading the webpage. To solve this, the sensor data was capped at 100 data points over whatever timescale was chosen.

The EC meter used two graphite pencil leads which were spaced using a 3d printed holder. Ring terminals were then gently crimped on the the leads. Unfortunately the noise from the EC meter was too strong and a good measurement could not be made, however they did provide an open circuit when the water was drained. This showed up on the webserver and was used to verify the system was watering as expected.

Unlike v1 which was a drip system, v2 was an ebb and flow system. The change was made as it prevented roots growing into the tank. The hydraulic system takes advantage of the back feeding properties of centrifugal pumps. When the pump is powered, the water is sucked out of the tank and risen into the pot, once the pump is powered off, gravity pushes the water back through the pump to drain. This eliminated the need to any form of valves and does everything in one pipe.

Being more complex, this system initially had issues with leaking. To remedy, Vaseline was use in all joints. Vaseline, being oil based, repels the water and prevent water leaking. It also lubricates the fittings, making them easier to assembled (and disassemble).

![Hydro v2a 1](/assets/homeHydo_v2a_1.jpg){: width="30%" } 

## v2b
Following on from v2a, the lighting system was upgraded along with the ability to drain the water more effectively. The growing medium was also changed.

The biggest issue with v2a was that the lights were under powered and inefficient. It was calculate that most plants need around 600 umol/m2/s of light for a 12 hour day cycle. From this, the day length could be increase to require less lighting (~400 umol/m2/s). Samsung's high efficiency grow leds (LM301H) were there arranged to optimize the voltage drop improve efficiency of the LED6000 driver. 

Along with the improved lighting, the issue of draining the water from the tank was solved. The solution was add a T-piece in the main filling pipe. In normal operation a plug was plug stopped the system leaking through the T-piece however when the tank needed to be drained the plug was removed. The pump is then power and the water flows back out through the T-piece as it is lower than the pot. 


![Hydro v2b 1](/assets/homeHydro_v2b_1.jpg){: width="60%"} 

The growing medium was initial perlite. perlite had an issue where it would float when water was pumped into the pot. This cause the plants roots to be displaced causing the plants to die. instead clay balls which are heavier were used. the offer the same about of drainage but to not float.

This has been the most successful version to date and has been able to grow parsley and almost grow strawberries (see root growth however plant eventually dies in around month)


![Hydro v2b 2](/assets/homeHydro_v2b_3.jpg){: width="30%" }
![Hydro v2b 3](/assets/homeHydro_v2b_2.jpg){: width="30%" }
