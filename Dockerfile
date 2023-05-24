# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port specified via environment variable
ENV PORT=3000
EXPOSE $PORT

# Set environment variables for the Lambda function name
ENV LAMBDA_FUNCTION_NAME=your-lambda-function-name

# Start the API server
CMD ["npm", "start"]