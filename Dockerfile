# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and compile the production build
COPY . .
RUN npm run build

# Stage 2: Serve the production build using Nginx
FROM nginx:stable-alpine

# Copy the compiled static assets from Stage 1 to Nginx's default public directory
# Note: If your framework generates a 'dist' folder instead of 'build', change 'build' to 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]