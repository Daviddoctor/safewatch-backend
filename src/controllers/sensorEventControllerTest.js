const fs = require('fs');
const events = require("../../config/Events.json");

// Función para enviar notificaciones
function sendNotification() {
  console.log('Enviando notificación: "Movimiento detectado"');
  // Aquí iría la lógica real para enviar una notificación (puede ser una llamada a una API, enviar un mensaje, etc.)
}

// Procesar los eventos
events.forEach(event => {
  console.log(`Evento: ${event.event}, Timestamp: ${event.timestamp}`);
  
  // Manejar cada tipo de evento
  switch (event.event) {
    case 'MOTION_DETECTED':
      console.log('Se ha detectado movimiento');
      sendNotification();
      break;
    case 'NO_MOTION':
      console.log('No hay movimiento');
      break;
    default:
      console.log(`Evento desconocido: ${event.event}`);
  }
});
