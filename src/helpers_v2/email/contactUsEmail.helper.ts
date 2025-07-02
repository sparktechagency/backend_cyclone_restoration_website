import { nodemailerTransporter } from '../../config/nodemailer/nodemailer.config';

export const sendContactUsEmail = (
  name: string, // User's name
  userEmail: string, // User's email address
  userPhone: string, // User's phone number
  message: string, // The message the user wants to send
  companyEmail: string // The email address of the company to receive the message
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contactEmail = {
        to: companyEmail, // Send the email to the company email address
        from: userEmail, // The sender's email address (user)
        subject: `Contact Us Message from ${name}`, // Email subject
        html: `
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f7fc;
              color: #333;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #2d3748;
              text-align: center;
              font-size: 24px;
            }
            p {
              line-height: 1.6;
              font-size: 16px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #aaa;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Contact Us Message</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Phone:</strong> ${userPhone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <div class="footer">
              <p>Thank you for reaching out!</p>
              <p>Best Regards, <br> Your Website</p>
            </div>
          </div>
        </body>
      </html>
        `,
      };

      nodemailerTransporter.sendMail(contactEmail, (error, info) => {
        if (error) {
          console.error('Error:', error);
          reject(error);
        } else {
          console.log('Email sent:', info.response);
          resolve('Email Sent');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
};
