FROM alpine:latest

# Install Node and NPM
RUN apk add --update nodejs npm
RUN apk add --update npm

# Creating a Work directory
WORKDIR /app

# Copying the folder contents
COPY . .

RUN npm install

# Exposing the ports
EXPOSE 5000 5001

CMD [ "node", "app.js" ]