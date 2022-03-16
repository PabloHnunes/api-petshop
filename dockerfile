FROM node:14 
WORKDIR /api-petshop
ARG PORT_BUILD=6000
ENV PORT=$PORT_BUILD
EXPOSE $PORT_BUILD
COPY . .
RUN npm install 
ENTRYPOINT npm start 