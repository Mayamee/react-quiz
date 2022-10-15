FROM node:16
LABEL maintainer="ponyashcat228@gmail.com"
ENV PORT=8081
EXPOSE 8081
WORKDIR /usr/src/app
COPY build .
RUN ["yarn", "install", "--production=true"]
CMD ["node", "backend/bundle.js"]