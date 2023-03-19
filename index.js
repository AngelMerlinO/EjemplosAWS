// Cargar la SDK de JavaScript de AWS
const AWS = require('aws-sdk');

// Configurar las credenciales y la región
AWS.config.update({
  accessKeyId: 'AKIASYIB6FD553J3AZFQ',
  secretAccessKey: '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',
  region: 'us-east-2'
});

// Crear un objeto SNS
const sns = new AWS.SNS();

// Definir los parámetros del mensaje
const params = {
  Message: 'prueba uligami', // el contenido del mensaje
  TopicArn: 'arn:aws:sns:us-east-2:189519505659:Hacienda_Ambar' // el ARN del tema de SNS al que quieres enviar el mensaje
};

// Enviar el mensaje a través de SNS
sns.publish(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
    console.log("El mensaje se ha enviado con éxito.");
  }
});
