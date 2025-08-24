#!/bin/bash
echo "🔧 Installing dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🏗️ Building frontend..."
npm run build

echo "✅ Build completed successfully!"
