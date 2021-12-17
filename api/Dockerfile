FROM node:14-alpine

WORKDIR /api
ADD package.json /api/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install
ADD . /api
EXPOSE 3000
CMD ["npm", "run", "start"]
