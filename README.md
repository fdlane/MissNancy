MissNancy
=========

**The project is being developement and is not ready for release.**

A port of a simple MS Access application
----------------------------------------

MissNancy is a pet project that ports a MS Access application that I wrote almost 10 years ago for my local church.  The church has a HUGE Vacation Bible School event each year and needed a way to track the Children, Workers, Buses, Classes, and Neighborhoods.  The application was originally written in MS Access because I needed to build it very quickly, app was mostly data entry, and all the users were located in the same office space/network.

I used the following in this project:

* PetaPoco
* ExtJs4
* Only the layers that I absolutely needed
* MVC 3  

There are some (probably many) things that should not be taken as *best practice*.  The application is only used one week a year.

Some lessons learned from moving from the MS Access development to .Net/Javascript world:
* Primary key in each table simply 'Id' (makes coding each object easier and the ExtJs stores easier to copy/paste during development)
* No table/objects named with reserved words like I did. (Class, duh)
* Table/object name singlar (Bus, Worker, Classroom)
* Table/object names should avoid difficult pluralization words like Children (use Student)
* Remember MS Access 'true' is '-1' used abs(active) = 1 because the MS Access front end was still also used on the same sql db
* At least for me, development takes a lot longer...maybe I was this slow when I first started with Access too. *sigh

This work was done for **Knoxville Christian Center**, see here - http://knoxvillechristiancenter.org - for details about the church.

Make sure you ask someone about Miss Nancy and her story....