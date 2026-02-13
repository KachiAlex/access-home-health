FROM node:20-slim

# Create app directory
WORKDIR /usr/src/functions

# Install dependencies
COPY package*.json ./
RUN npm install --no-audit --no-fund --production

# Copy source
COPY . .

# Port for Cloud Run
ENV PORT 8080
EXPOSE 8080

# Start the functions framework (defined in package.json start script)
CMD ["npm", "start"]
