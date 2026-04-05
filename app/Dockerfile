# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --production

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 80

# Command to run the application
CMD ["node", "app.js"]
