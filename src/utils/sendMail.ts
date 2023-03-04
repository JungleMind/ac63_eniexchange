import * as nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async (email: string, subject: string, message: string, linkedAdress: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.mailServer,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.mailUsername, // generated ethereal user
      pass: process.env.mailApiKey, // generated ethereal password
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
    <br/><a href=${linkedAdress}> Confirm Email</a>` , // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}
