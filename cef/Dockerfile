FROM node:16.9.1-alpine
RUN npm install -g http-server
WORKDIR /app
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]