FROM node:14.16.0 as build
WORKDIR /frontd
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
FROM node:14.16.0
COPY --from=build /frontd/build
