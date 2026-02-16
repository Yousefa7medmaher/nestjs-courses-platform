FROM node:20-alpine AS builder


WORKDIR /app

COPY package*.json ./

RUN npm install 
COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup -S app && adduser -S -G app app

ENV PORT=3000

COPY --from=builder --chown=app:app /app/package*.json ./
RUN npm install  --only=production

COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/src ./src
USER app

EXPOSE 3000



CMD ["node", "dist/main.js"]
