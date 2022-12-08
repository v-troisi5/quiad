FROM node:16.14.0

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY dist ./dist/

COPY docker.env .env

COPY prisma ./prisma/

RUN npm install

COPY tsconfig.json ./

RUN npx prisma generate

# RUN npx prisma db push

CMD npm start

EXPOSE 80