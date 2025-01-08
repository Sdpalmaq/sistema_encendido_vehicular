import mqtt from "mqtt";

// Configuración de las credenciales MQTT
const MQTT_OPTIONS = {
  host: "df6522c08e0b44129df99259929215a3.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "Sdpalmaq2",
  password: "St@0402003602",
};

// Crear cliente MQTT
const client = mqtt.connect(
  `mqtts://${MQTT_OPTIONS.host}:${MQTT_OPTIONS.port}`,
  {
    username: MQTT_OPTIONS.username,
    password: MQTT_OPTIONS.password,
    reconnectPeriod: 1000, // Intentar reconectar cada segundo
  }
);

// Manejo de eventos MQTT
client.on("connect", () => {
  console.log("Conectado al broker MQTT.");
});

client.on("error", (err) => {
  console.error("Error en la conexión MQTT:", err);
});

client.on("message", (topic, message) => {
  console.log(`Mensaje recibido en el tópico ${topic}: ${message.toString()}`);
});

// Función para suscribirse a un tópico
export const subscribeToTopic = (topic) => {
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Suscrito al tópico: ${topic}`);
    } else {
      console.error(`Error al suscribirse al tópico ${topic}:`, err);
    }
  });
};

// Función para publicar un mensaje
export const publishMessage = (topic, message) => {
  client.publish(topic, message, (err) => {
    if (!err) {
      console.log(`Mensaje publicado en el tópico ${topic}: ${message}`);
    } else {
      console.error(`Error al publicar en el tópico ${topic}:`, err);
    }
  });
};

// Exportar cliente para usar en toda la app
export default client;
