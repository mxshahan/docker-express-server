# Create a Dockerfile in root directory

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