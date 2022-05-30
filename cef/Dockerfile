FROM node:16.9.1-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "nom run serve" ]