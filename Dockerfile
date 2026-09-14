# Step 1: Base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY . .

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose port 8080 (OpenShift standard non-root port)
EXPOSE 8080

# Run container as non-root user (Security Best Practice)
USER 1001

# Command to start application
CMD ["npm", "start"]
