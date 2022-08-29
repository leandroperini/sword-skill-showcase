FROM node:lts
WORKDIR /var/www/sword
COPY . .

RUN npm install --location=global npm@latest
RUN npm install --location=global

EXPOSE 3000
CMD ["npm", "start"]