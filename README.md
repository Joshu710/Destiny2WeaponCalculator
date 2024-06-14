# About

This was a group project for "Introduction to Graphical User Interface Programming" and "Introduction to Databases" at the Unversity of Maryland, Baltimore County.

This project is a stat calculator for the online game Destiny 2 where you can see stat changes for weapons given perks selected in each slot.


# Technical Details

For this project we used MySQL as our database platform which was then connect to our Django backend. This backend was treated as a REST Framework in which our React.js frontend called upon for data.

# How to Run

We originally created to this project to run locally, however, I recently Dockerized the project using three images for MySQL, Django, and Node.js.

Docker-compose was then used to combine the three images.

`docker-compose --build` to build the images.
`docker-compose up` to create three containers and run them.
`docker-compose down` to stop and remove all containers. 
