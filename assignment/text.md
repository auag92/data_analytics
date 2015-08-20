Module 1 of E0 259, Data Analytics, August 2015

Kepler's data set on Mars

Lectures

Lecture 1 (Ramesh Hariharan, Scribe: Apaar Shanker, Neha Makhija)
Lecture 2 (Ramesh Hariharan, Scribe: TBD, TBD)
Lecture 3: Continuation of Lecture 2.

Data set

Mars Opposition data (.csv file) :

  This file contains data on longitude/latitude of Mars under "opposition" with the Sun, in the ecliptic coordinate system.
    a) Columns A/B/C are day/month/year.

    b) Columns D,E,F,G denote ZodiacIndex, Degree, Minute, Second, respectively, of Mars's (heliocentric) longitude in the ecliptic coordinate system. ZodiacIndex refers to the zodiac (Aries 0, Taurus 1, ... Pisces 11).
    Longitude = s*30 + Degree + Minute/60 + Second/3600 (degrees)

    c) Columns H,I refer to degree, minute of the geocentric latitudinal position of Mars in the ecliptic coordinate system.

    d) Columns J,K,L,M refer to Mars's mean longitude, with reference to Kepler's approximated equant.

Triangulation data (.csv file) :
  This file contains data on the longitude of Earth (centred at the Sun) and the longitude of Mars (centred at Earth).
    a) Column A indicates the index of the pair. Columns B/C/D are day/month/year. Paired observations are 687 days apart.

    b) Columns E,F denote the heliocentric longitude of Earth.

    c) Columns G,H denote the geocentric longitude of Mars.

Assignment 1 (Updated and final)

Due: 11:59 pm on 20 August 2015. We will inform you in class on where to submit your code. Discussion is encouraged. But write your own code.

We do not take the approach of slide 21 of Lecture 1. You are welcome to discuss the merits/demerits of such an approach.

  1. Use the paired observations in the triangulation data for this part of the assignment. Assume that the Sun is at the origin, and the Earth is orbiting around the Sun at radius 1 AU (astronomical unit).
    (i) Triangulate and solve for the five different projections of Mars's location on the ecliptic plane.

    (ii) Find the best fit circle centred at the Sun. (This is a regression to find the radius in AU). Take the loss function to be the squared Euclidean distance to the nearest point on the circle.

  2. Use the Mars opposition data for this part of the assignment. Again assume that the Sun is at the origin, and the Earth is orbiting around the Sun at a radius of 1 AU.
    (i) Using opposition and the geocentric latitudes of Mars, find the corresponding heliocentric latitudes of Mars. Together with the heliocentric longitudes, we now have 12 locations of Mars (heliocentric latitudes and longitudes) on the celestial sphere, with the Sun as the centre.

    (ii) Take the celestial sphere's radius to be 1. Find the best fit for Mars's orbital plane. This plane should contain the Sun; so you are really finding the best great circle on the celestial sphere, which is also the best 'straight line' on the celestial sphere. Take the loss function to be the squared Euclidean distance between Mars's position on the celestial sphere and its projection on the plane. Report the inclination of this plane in degrees/minutes.

  3. Go back to the paired observations in the triangulation data.
    (i) Find Mars's five different (3-d) locations on Mars's orbital plane. Use the orbital plane you identified in 2(ii) and the projections you identified in 1(i).

    (ii) Now find the best fit circle on Mars's orbital plane with the Sun as centre. Report the sum of losses.

    (iii) Find the best fit ellipse on Mars's orbital plane with the Sun at one of the foci. Report the sum of the losses. Draw the circle of 3(ii) and the ellipse of 3(iii) on the same plot. Mark the location of the Sun and the 12 positions of Mars.
