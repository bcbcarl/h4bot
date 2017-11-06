FROM node:8-alpine

RUN apk add --no-cache tzdata \
  && ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime
