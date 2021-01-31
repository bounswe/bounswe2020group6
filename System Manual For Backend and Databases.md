# System Manual

In this file, we'll walk you through on how you can get the backend and backend related services such as Postgresql Database and Elasticsearch running.

## Requirements

- Docker
- Docker-Compose
- Preferably a Linux distribution as the OS

## Files required

The docker image of the backend application is stored in the file **akademise.tar**. Also since we will have 3 containters running in parallel, 
we will also need a **docker-compose.yml**. This YAML file can be found in the main directory of this repository. Database dump **akademise.db** is also required, 
if you want to restore the database. 

## How to deploy/run

1. First change directory to the directory where you keep the file **akademise.tar**
2. Run below command to import the image into your docker system
```bash 
docker image load -i akademise.tar 
```
3. Now head in to the directory where you keep the file **docker-compose.yml**
4. Open up this file and have a look at line 26
5. This url should be the url that other people will use to connect to this computer. So change this url accordingly. 
If you are not planning to expose the backend to outerworld, you might simply write localhost.
 We use this url to create the links to the static files in the project, such as profile pictures. 
 For example if you provide www.example.com, a profile picture will reside in the url www.example.com/static/avatars/filename.png.
6. Under database-service tab, you can see the username, password and the database name the project uses. DO NOT change these variables, these are preconfigured 
in the akademise image, and changing these settings here will cause the backend app not being able to connect to the database.
7. After saving the file after changes, again head in to the directory of the file **docker-compose.yml**
8. Now run below command to run the docker-compose
```bash
docker-compose up -d
```
9. After docker does it's thing, we are done. You can reach the rest API on port 3000, the database on port 5432 and the elasticsearch client on port 9200

## Restoring the database

The database is initially empty, to restore the database follow directions below:

1. Run the below command to copy the dump into Postgresql container
```bash
docker cp akademise.db bounswe2020group6_database-service_1:/
```
2. Then run the below command to enter the Postgresql container
```bash
docker exec -it bounswe2020group6_database-service_1 bash
```
3. Make sure you are inside of the container
4. Finally run below command inside the container to import the dump
```bash
psql akademise < akademise.db
```
