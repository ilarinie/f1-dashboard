FROM node:18.12.0

RUN npm install -g npm@8.8.0

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]