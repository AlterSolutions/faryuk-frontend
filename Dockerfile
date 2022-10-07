# pull official base image
FROM node:alpine as build

# set working directory
COPY . /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
RUN npm install -g npm@8.19.1
RUN npm install react-scripts@3.4.1 -g --silent --force
RUN npm install --silent --force
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
