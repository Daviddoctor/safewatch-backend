const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const { errorFormat } = require('../utils/errorFormat');

const admin = require('firebase-admin');

// Configuración del puerto serial
const port = new SerialPort('COM3', { baudRate: 9600 }); // Reemplazar 'COM3' con el puerto serial correcto
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

const serviceAccount = require('../config/firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Metodo para enviar notificaciones push
async function sendPushNotification(message) {
  try {
    const payload = {
      notification: {
        title: 'Notificación de movimiento',
        body: message
      }
    };

    const response = await admin.messaging().sendToTopic('motion-detected', payload);
    return {
      status: 200,
      data: {
        success: true,
        message: "Notificación enviada",
        internalCode: "SUC"
      }
    }
  } catch (error) {
    console.error('Error al enviar notificación:', error);
    return errorFormat({
      status: 500,
      internalCode: "ERR",
      message: "Error al enviar notificación",
      process: error.message
    });
  }
};

//Método para escuchar el puerto serial
function handleSerialData(data) {
  console.log('Datos recibidos del Arduino:', data);

  // Manejar los eventos recibidos del Arduino
  if (data.trim() === 'MOVIMIENTO DETECTADO') {
    console.log('Se ha detectado movimiento');
    
    sendPushNotification('Se ha detectado movimiento');
    // Agregar lógica para registrar eventos.
    return {
      status: 200,
      data: {
        success: true,
        message: "Se ha detectado movimiento",
        internalCode: "SUC"
      }
    };
  } else if (data.trim() === 'SIN MOVIMIENTO') {
    console.log('No hay movimiento');
    // Agregar lógica para manejar la ausencia de movimiento
    return {
      status: 200,
      data: {
        success: true,
        message: "No hay movimiento",
        internalCode: "SUC"
      }
    }
  }
}

parser.on('data', (data) => {
  const response = handleSerialData(data);
  // Enviar la respuesta al cliente
  console.log('Respuesta:', response);
});

// Manejar errores del puerto serial
port.on('error', (err) => {
  console.error('Error en el puerto serial:', err);
  return errorFormat({
    status: 500,
    internalCode: "ERR",
    message: "Error en el puerto serial",
    process: err.message
  });
});

module.exports = {
  handleSerialData
};