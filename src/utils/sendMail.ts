import * as nodemailer from 'nodemailer'
import * as sgMail from '@sendgrid/mail'

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async (email: string, subject: string, message: string, linkedAdress: string) => {
  //NODEMAILER METHOD
  // let transporter = nodemailer.createTransport({
  //   host: process.env.mailServer,
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.mailUsername, // generated ethereal user
  //     pass: process.env.mailApiKey, // generated ethereal password
  //   },
  // });

  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: process.env.verifiedMailSender, // sender address
  //   to: email, // list of receivers
  //   subject: subject, // Subject line
  //   text: message, // plain text body
  //   html: `<b>Link for ${subject}.</b> 
  //   <div> Confirmation code: ${message} </div>
  //   <br/><a href=${linkedAdress}> ENI </a>` , // html body
  // });

  // console.log("Message sent: %s", info.messageId);


  //SENDGRID METHOD
  sgMail.setApiKey(process.env.apiSendGrid);
  const msg = {
    to: email,
    from: 'lucfabior@gmail.com', // Use the email address or domain you verified above
    subject: subject,
    text: message,
    html: `<b>Link for ${subject}.</b> 
     <div> Confirmation code: ${message} </div>
     <br/><a href=${linkedAdress}> ENI </a>` ,
  };

  sgMail
  .send(msg)
  .then(
    () => { console.log('Mail Sent') }, 
    error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  );
}
