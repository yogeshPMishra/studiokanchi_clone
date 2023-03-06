// emailer utils  
const nodemailer = require("nodemailer");

const mailHelper = async (option) => {
    let transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
      });
  
      const message = {
        from:'mail.yogeshpmishra@gmail.com', // sender address
        to: option.email, // list of receivers
        subject:option.subject , // Subject line
        text:option.message , // plain text body
        html: option.message, // html body
      }
      // send mail with defined transport object
      await transporter.sendMail(message);
    
}

module.exports = mailHelper