const nodemailer = require("nodemailer");

exports.sendMail = (req, res) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "rishabhjain88712@gmail.com",
            pass: "qgmj cxwg pswv ikee",
        },
    });

    const mailOptions = {
        from: "Dhanesh Pvt. Ltd.<dhanesh1296@gmail.com>",
        to: req.body.email,
        subject: "NEWSLETTER SUBSCRIPTION",
        // text: "Do not share this link to anyone.",
        html: `<h1>Welcome to Bookstore.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, earum.</p>
<button>Explore More</button>`,
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return res.send(err);
        console.log(info);
        return res.send(
            "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔️</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1><a href='/'>HomePage</a>"
        );
    });
};