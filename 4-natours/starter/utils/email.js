const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
  /*1) Create a transport */
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 25,
    // secure:false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    /*Activate in gmail "less secure app" option  */
  });

  /*2)Define the email option  */

  const mailOptions = {
    from :'Rahul <me.kumarrahul@gmail.com>',
    to : options.email,
    subject:options.subject,
    text:options.message,
    // html:
  }
  /*3) Actually send the email */
//   console.log(transport);
  await transport.sendMail(mailOptions)
};



module.exports = sendEmail;