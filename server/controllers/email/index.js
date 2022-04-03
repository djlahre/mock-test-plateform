const transporter = require("../../config/nodemailer");

const URL = process.env.BASE_URL;
const emailAddress = process.env.EMAIL_USER;

function sendVerificationLink(userAddress, token) {
  return transporter.sendMail({
    from: `"Mock Test Plateform" <dhananjaylahre@gmail.com>`, // sender address
    to: userAddress, // list of receivers
    subject: "Verify account", // Subject line
    text: `${URL}/api/users/verify/${token}`, // plain text body
    html: verifyTemplate(token), // html body
  });
}

function verifyTemplate(token) {
  return `<div style="text-align: center; padding: 20px 5px">
  <h2>Mock Test Plateform</h2>
  <strong>Thanks for registering with us</strong>
  <p>
    <a
      href="${URL}/api/users/verify/${token}"
      style="
        text-decoration: none;
        background-color: dodgerblue;
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        margin-top:15px;
      "
      >Verify account</a
    >
  </p>
</div>`;
}

function sendOTP(userAddress, otp) {
  return transporter.sendMail({
    from: `"Mock Test Plateform" <dhananjaylahre@gmail.com>`, // sender address
    to: userAddress, // list of receivers
    subject: "Reset password", // Subject line
    text: otp, // plain text body
    html: `<h3 style="text-align:center">OTP : ${otp}</h3>`, // html body
  });
}

module.exports = { sendVerificationLink, sendOTP };
