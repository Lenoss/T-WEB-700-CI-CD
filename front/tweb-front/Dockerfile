#FROM NODEJS
FROM node:lts-alpine
# install simple http server for serving static content

# make the 'app' folder the current working directory
WORKDIR /front

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN apk add --no-cache git
RUN npm install

COPY . .

CMD ["npm", "run", "serve"]
