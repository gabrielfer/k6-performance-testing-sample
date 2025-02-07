# Use a Debian-based Node.js image
FROM node:16-buster

# Install prerequisites and k6 from the official k6 repository
RUN apt-get update && \
    apt-get install -y gnupg curl && \
    curl -s https://dl.k6.io/key.gpg | apt-key add - && \
    echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && \
    apt-get install -y k6 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy the rest of the project files (including src/)
COPY . .

# Default command to run all tests via the npm script
CMD ["npm", "run", "test:all"]