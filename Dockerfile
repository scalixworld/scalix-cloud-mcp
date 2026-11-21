FROM node:24-bookworm-slim

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

# Copy package manifests and install
COPY package.json ./
RUN npm install --omit=dev

# Copy application files and patch
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
