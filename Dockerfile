# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 5000

# Set environment to production by default
ENV NODE_ENV=production

# Start the backend server
CMD ["npm", "start"]

