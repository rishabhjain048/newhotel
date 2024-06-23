const nodemailer = require("nodemailer");

// --------------
exports.sendWelcomeEmail = async (email,name) => {
    try {
      const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'rishabhjain88712@gmail.com', // replace with your Gmail email
          pass: 'qgmj cxwg pswv ikee', // replace with your Gmail password or app-specific password
        },
      });
  
      const mailOptions = {
        from: 'Your Company Name <rishabhjain88712@gmail.com>',
        to: email,
        subject: 'Welcome to Our Service',
        html: `<h1>Welcome to Bookstore.${name}</h1>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, earum.</p>
               <button>Explore More</button>`,
      };
  
      await transport.sendMail(mailOptions);
    } catch (error) {
      console.error(`Failed to send welcome email to ${email}:`, error);
      throw error; // re-throw the error to be caught in the caller function
    }
  };
  
  // ------------
