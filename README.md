# device-management-back

The server is up and running on 
[ec2-52-67-226-180.sa-east-1.compute.amazonaws.com](http://ec2-52-67-226-180.sa-east-1.compute.amazonaws.com/)
Deployed on an EC2 machine, with Nginx as a proxy redirecting the API to port 80. 
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple device management. We can manage devices and it's categories.
	
## Technologies
Project is created with:
* cors:  2.8.5
* dotenv:  10.0.0
* express:  4.17.1
* knex:  0.95.12
* mysql:  2.18.1
* objection:  2.2.17
	
## Setup
To run this project, install it locally using npm:

```
$ cd ../project-folder
$ npm install
```
Then you need to run Knex Migrations:
```
$ knex migrate:lateste
```
It will be necessary to create the .env file with the enviroment variables for DB configuration and for some standard messages.

After running the migrations, you can check them all with:
```
$ knex migrate:list
```
more info can be found in the oficial documentation here:
https://knexjs.org/

Now, just have to go into project root folder and run:
```
$ node server.js
```