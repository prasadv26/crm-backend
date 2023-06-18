const emailSender = require("../helpers/emailSender");

const registerUserMail = async (user) => {
  const fromEmail = process.env.GMAIL_ID;
  const toEmail = user.email;
  const subject = "Registration successful on CS app";
  const body = `
    <html>
      <body>
        <p>Hello ${user.name},</p>
        <p>You have successfully registered on <b>Customer Support Application.</b></p>
        <img height="200px" width="200px" src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUuHGymIdrXKLF0jGKsMwW98Y7NjCDV1-NiqOOLnb5Cg&usqp=CAU&ec=48600113" alt="welcome img"/>
        <p>We are happy to have you.</p>
        <p>Thanks</p>
      </body>
    </html>
  `;

  await emailSender(fromEmail, toEmail, subject, body);
};

module.exports = registerUserMail;
