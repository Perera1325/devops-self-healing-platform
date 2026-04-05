const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    const healthStatus = {
        status: 'UP',
        message: 'Self-Healing Platform: System is operational.',
        serverTime: new Date().toISOString(),
        version: 'v1.0.0',
        environment: process.env.NODE_ENV || 'development'
    };
    res.json(healthStatus);
});

// Endpoint to simulate failure for testing liveness probe
app.get('/fail', (req, res) => {
    console.error('Simulating a fatal error...');
    process.exit(1);
});

// Endpoint to check health
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});
