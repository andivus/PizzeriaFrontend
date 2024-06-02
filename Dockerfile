FROM node:22-alpine as build

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli

RUN npm install

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/pizzeria /usr/share/nginx/html

EXPOSE 80
