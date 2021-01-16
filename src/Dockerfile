#Maps out what is to be included in the image. Docker images are 
#layered so build image from another image. Each command is 
#considered another layer. This allows sharing of layers between 
#containers, and save on resources on the host
FROM node:12.2.0-alpine 
WORKDIR /usr/app

#differences in local files are noticed so that a re-run
#is only performed on the layer if there is a change
COPY package*.json ./

#running shell commands in docker file
RUN npm install

COPY . . 

#setting command to run when container starts. Container
#will exit at completion of this command. If do not have
#this, need to specify a command when running container
CMD [ "npm", "start" ]