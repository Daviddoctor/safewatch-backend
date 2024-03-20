const express = require('express');

const sensorEventController = require('../controllers/sensorEventController');
const { formatResponse } = require('../utils/formatResponse');

const api = express.Router();

api.post('/sensor-event', (req, res) => {
    const response = sensorEventController.handleSerialData(req.body.data);
    if (response.status >= 400) console.error('Error controlado: ', response.data);
    return res.status(response.status).send(formatResponse(response.status, response.data));
});