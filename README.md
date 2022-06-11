# Docker With Express Server

A simple webapp that connect with docker 

The requiremement to start Docker

[x] Install Docker client in local pc


## Create a Dockerfile in root directory

Do the step bellow

## build docker image
`docker build . -t node-app-image` -t flag represent image name

After building docker image run following command

## run docker iamge
`docker run -d --name node-app node-app-image` 
`-d` flag represent detach mode
`--name` flag represent docker container name
and next parameter docker image name

- We cannot access to 3000 port because docker will not understand local pc. It will understand local pc as outside device. To fix this problem we need to follow this step 

## run docker iamge image
`docker run -p 8080:8080 -d --name node-app node-app-image` 
`-p` flag represent port and first part represent our local pc which will be run in localhost:8080 and second part which is running under docker image in our express server

## To see the file inside docker container
`docker exec -it node-app bash` `-it` command means intactive mode. this command will show all of the file inside docker container

> **The reason is to see what docker container actually doing**


## After any code in my local pc, we cannot see updated things in runnign port. To solve this we have to follow these

- We need to rebuild and re-run everything

But this process is messy. Every time for small changes rebuild will take time which will slow down development.

To solve this we need to `sync` our local folder into docker container.

### Here we go
> run the same command of docker run and add extra flag -v which stands for `volume` local_path:docker_path
- Here `local_path` is our local project directory.
- And `docker_path` is our docker file directory which we defined `/app`.

#### We can also use a shortcut for local_path
- for windows command shell use %cd%
- for windows power shell use ${pwd}
- for Mac use $(pwd)


Example: `docker run -v $(pwd):/app -p 8080:8080 -d --name node-app node-app-image`

that will grab current directory

> If nodemon doesn't restart in docker pass -L flag


<!-- TODAY SESSION: 56:25
https://www.youtube.com/watch?v=9zUHg7xjIqQ -->


# Syncing with docker container

### We don't want to watch `node_modules` folder with docker container. But if we delete `node_modules` from local directory it delete from docker container as well. To prevent this we need to follow these stese. 
> For this we need add another extra `volume` flag and add parameter as `/app/node_modules`
> `docker run -v $(pwd):/app -v /app/node_modules -p 8080:8080 -d --name node-app node-app-image`

### Now we don't want to docker to change our file. If we create any file inside docker container it impact on our local directory. So to prevent this we need to make docker container `read-only`. 

> use same command and use extra option after docker_path name using colon (:)
> `docker run -v $(pwd):/app:ro  -v /app/node_modules -p 8080:8080 -d --name node-app node-app-image`


## Use of Environment Variables
### To use Environment variable in command, we need to use -e flag or --env flag and use our port. 

Example: `docker run -v $(pwd):/app:ro  -v /app/node_modules -e PORT=4000 -p 8080:4000 -d --name node-app node-app-image`

### To use Environment variable using .env file we need to follow this command along with flag `--env-file` and path of the env file

Example: `docker run -v $(pwd):/app:ro  -v /app/node_modules --env-file ./.env -p 8080:5000 -d --name node-app node-app-image`