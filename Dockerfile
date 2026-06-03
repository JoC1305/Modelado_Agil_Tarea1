FROM nginx:1.27-alpine

ENV PORT=8080

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY . /usr/share/nginx/html

EXPOSE 8080
