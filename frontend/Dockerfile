FROM node:20.10-alpine

WORKDIR /app

#remove .next and node_modules
RUN rm -rf .next node_modules

# Copy package files
COPY package*.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm cache clean --force && \
    npm i

# Copy source code
COPY . .

# Build the application
ARG BACKEND_URL
ENV NEXT_PUBLIC_API_URL=${BACKEND_URL}


EXPOSE 3000

CMD ["npm", "run", "dev"]