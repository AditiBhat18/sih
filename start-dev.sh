#!/bin/bash

# Gamified Education Platform - Development Startup Script
echo "🎓 Starting Gamified Education Platform in Development Mode..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️ MongoDB is not installed. Please install MongoDB or use Docker Compose."
fi

echo "📦 Installing dependencies..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend && npm install
cd ..

# Create .env file for backend if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📄 Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "✅ Please update backend/.env with your configuration"
fi

echo ""
echo "🚀 Ready to start! Choose an option:"
echo "1. Start with Docker Compose (recommended)"
echo "2. Start development servers locally"
echo ""

read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "🐳 Starting with Docker Compose..."
        if command -v docker-compose &> /dev/null; then
            docker-compose up -d mongodb
            echo "⏳ Waiting for MongoDB to start..."
            sleep 10
            docker-compose up backend frontend
        else
            echo "❌ Docker Compose not found. Please install Docker first."
        fi
        ;;
    2)
        echo "💻 Starting development servers locally..."
        echo "Make sure MongoDB is running on mongodb://localhost:27017"
        echo ""
        echo "Starting backend and frontend servers..."
        npm run dev
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        ;;
esac
