FROM node:20-alpine AS builder


WORKDIR /app

COPY package*.json ./

RUN npm install 
COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup -S app && adduser -S -G app app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN chown -R app:app /app
USER app

EXPOSE 3000

CMD ["node", "dist/main.js"]
