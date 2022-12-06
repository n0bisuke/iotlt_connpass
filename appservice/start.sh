#!/bin/sh

apt update  \
  && apt install -y \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcairo2 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libnss3 \
    libpango-1.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
  && mkdir /noto && cd /noto \
  && wget https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip \
  && unzip NotoSansCJKjp-hinted.zip \
  && mkdir -p /usr/share/fonts/noto \
  && cp *.otf /usr/share/fonts/noto \
  && chmod 644 -R /usr/share/fonts/noto/ \
  && fc-cache -fv \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /noto


cd /home/site/wwwroot
PUPPETEER_CACHE_DIR=$(pwd)/node_modules/puppeteer node app.js