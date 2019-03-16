const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: '007j.edgar@gmail.com',
    subject: 'Welcome to TASKS',
    text: `Welcome to the app ${name}. Let me know how you get along with the app.`,
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: '007j.edgar@gmail.com',
    subject: 'Sorry to see you leave',
    text: `Hi ${name}, is there anything we could have done to keep you on the app?`,
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
}
