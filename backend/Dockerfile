FROM node:22-alpine
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3001
CMD [ "node","index.js" ]
