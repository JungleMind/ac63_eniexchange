import * as nodemailer from 'nodemailer'
import * as sgMail from '@sendgrid/mail'

import * as SibApiV3Sdk from 'sib-api-v3-typescript';

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async (email: string, subject: string, message: string, linkedAdress: string) => {
  // //NODEMAILER METHOD
  let transporter = nodemailer.createTransport({
    host: process.env.mailServer,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.mailUsername, // generated ethereal user
      pass: process.env.mailPass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.verifiedMailSender, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<b>Link for ${subject}.</b> 
    <div> Confirmation code: ${message} </div>
    <br/><a href=${linkedAdress}> ENI </a>` , // html body
  });

  console.log("Message sent: %s", info.messageId);

  //SIB Method

// const SibApiV3Sdk = require('sib-api-v3-typescript');
 
// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// let apiKey = apiInstance.authentications['apiKey'];
// apiKey.apiKey = process.env.sibApiKey;

// let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 

// sendSmtpEmail.subject = subject;
// sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
// sendSmtpEmail.sender = {"name":"ENI Exchange","email":process.env.sibEmail};
// sendSmtpEmail.to = [{"email":email,"name":"Jane Doe"}];
// sendSmtpEmail.cc = [{"email":email,"name":"Janice Doe"}];
// // sendSmtpEmail.bcc = [{"name":"John Doe","email":"example@example.com"}];
// sendSmtpEmail.replyTo = {"email":process.env.sibEmail,"name":"John Doe"};
// sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
// sendSmtpEmail.params = {"parameter":"My param value","subject":subject};

// apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
//   console.log('API called successfully. Returned data: ' + JSON.stringify(data));
// }, function(error) {
//   console.error(error);
// });

  //SENDGRID METHOD
  // sgMail.setApiKey(process.env.apiSendGrid);
  // const msg = {
  //   to: email,
  //   from: 'AC63Eni.Exchange@gmail.com', // Use the email address or domain you verified above
  //   subject: subject,
  //   text: message,
  //   html: `<b>Link for ${subject}.</b> 
  //    <div> Confirmation code: ${message} </div>
  //    <br/><a href=${linkedAdress}> ENI </a>` ,
  // };

  // sgMail
  // .send(msg)
  // .then(
  //   () => { console.log('Mail Sent to', msg.to) }, 
  //   error => {
  //     console.error(error);

  //     if (error.response) {
  //       console.error(error.response.body)
  //     }
  //   }
  // );
}
