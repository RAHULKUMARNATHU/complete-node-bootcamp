const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

// new Email(user ,url).sendWelcome
module.exports = class Email {
  
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Rahul Kumar <${process.env.EMAIL_FROM}>`;
    
  }

 


  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        // host: 'smtp.sendgrid.net',
        // port: 587,
        // requireTLS: true,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    /*1) Create a transport */
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 25,
      // secure:false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      /*Activate in gmail "less secure app" option  */
    });
  }

  //send the actual email
  async send(template, subject) {
    //1)Render HTML based on a pug template

    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    /*2)Define the email option  */

    const mailOptions = {
      from: this.from,
      // from: process.env.SENDGRID_EMAIL_FROM,
      to: this.to,
      subject,
      text: htmlToText.convert(html),
      html,
    };

    //3)create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password token (valid for only 10 minutes)',
    );
  }

   
};
