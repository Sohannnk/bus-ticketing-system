# Dockerfile for the entire application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose ports
EXPOSE 3000 5000

# Start the application
CMD ["npm", "start"]
