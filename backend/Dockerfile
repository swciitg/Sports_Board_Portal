FROM node:20-alpine
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3001
CMD [ "node","index.js" ]