FROM node:16

WORKDIR /app

# install app dependencies

COPY package.json .

# add app

COPY . .

RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# start app

CMD [" REACT_APP_SERVER_URL=http://3.0.53.162/api && ","npm", "start"]