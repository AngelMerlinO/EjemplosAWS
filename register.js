const AWS = require('aws-sdk');

// Configuramos las credenciales y la región de AWS
AWS.config.update({
  accessKeyId: 'AKIASYIB6FD553J3AZFQ',
  secretAccessKey: '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',
  region: 'us-east-2' // Reemplaza "us-east-2" por la región que desees utilizar
});

// Creamos una instancia del cliente de SNS
const snsClient = new AWS.SNS();

// Creamos un objeto con los parámetros para agregar el número de teléfono al servicio de SNS
const subscribeParams = {
  Protocol: 'sms',
  TopicArn: 'arn:aws:sns:us-east-2:189519505659:Hacienda_Ambar', // Reemplaza "arn:aws:sns:ca-central-1:189519505659:Hacienda-Ambar.fifo" por el ARN del tema de SNS al que deseas agregar el número de teléfono
  Endpoint: '+529651032159' // Reemplaza "+529631763624" por el número de teléfono que deseas agregar en formato internacional
};

// Llamamos a la función `subscribe` de SNS con los parámetros que acabamos de crear
snsClient.subscribe(subscribeParams, (err, data) => {
  if (err) {
    console.error(err, err.stack);
  } else {
    console.log('Número de teléfono registrado:', data.SubscriptionArn);

    // Si el número de teléfono es un número móvil, AWS SNS enviará un mensaje de texto con un código de confirmación.
    // Si el número de teléfono es un número de teléfono fijo, AWS SNS llamará al número y leerá el código de confirmación en voz alta.
    // En ambos casos, debemos pedirle al usuario que ingrese el código de confirmación.
    const confirmCode = prompt('Ingresa el código de confirmación que recibiste por mensaje de texto o llamada');

    // Creamos un objeto con los parámetros para confirmar la suscripción del número de teléfono
    const confirmParams = {
      TopicArn: 'arn:aws:sns:ca-central-1:189519505659:Hacienda-Ambar.fifo', // Reemplaza "arn:aws:sns:ca-central-1:189519505659:Hacienda-Ambar.fifo" por el ARN del tema de SNS al que deseas agregar el número de teléfono
      Token: data.SubscriptionArn.split(':').pop(), // Extraemos el token de la suscripción del número de teléfono
      AuthenticateOnUnsubscribe: confirmCode // El código de confirmación que ingresó el usuario
    };

    // Llamamos a la función `confirmSubscription` de SNS con los parámetros que acabamos de crear
    snsClient.confirmSubscription(confirmParams, (err, data) => {
      if (err) {
        console.error(err, err.stack);
      } else {
        console.log('Suscripción confirmada:', data.SubscriptionArn);
      }
    });
  }
});

