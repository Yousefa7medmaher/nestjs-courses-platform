# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (default NestJS port)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]