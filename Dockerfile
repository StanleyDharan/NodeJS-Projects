FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN ["node", "bin/www"]
EXPOSE 8081