FROM node:20-alpine AS builder
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup -S app && adduser -S -G app app
USER app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder --chown=app:app /app/package*.json ./
RUN npm ci --only=production

COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/src ./src

EXPOSE 3000



CMD ["node", "dist/main.js"]
