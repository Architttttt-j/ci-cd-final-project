const express = require('express');
const app = express();

app.use(express.json());

// Main Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Welcome to CI/CD Final Project JavaScript Application',
    author: 'nivesh4087-spec',
    timestamp: new Date().toISOString()
  });
});

// Health Check Endpoint (Required for Kubernetes/OpenShift Probes)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptime: process.uptime()
  });
});

// App Info Endpoint
app.get('/api/v1/info', (req, res) => {
  res.status(200).json({
    name: 'cicd-final-project-js',
    version: '1.0.0',
    description: 'Continuous Integration and Continuous Delivery (CI/CD) Option B: JavaScript',
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = app;
