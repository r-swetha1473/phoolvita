# Use Node.js LTS version
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# ✅ Expose Cloud Run's required port
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
