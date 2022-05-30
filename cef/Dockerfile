FROM node:14.15.0-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "nom run serve" ]