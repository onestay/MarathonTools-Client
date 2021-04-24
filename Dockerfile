FROM node:15
COPY ./ /app
WORKDIR /app
RUN yarn && yarn run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY .htpasswd /.htpasswd
COPY nginx.conf /etc/nginx/nginx.conf
