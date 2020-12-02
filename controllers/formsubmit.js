const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const GMAIL_OAUTH_CLIENT_ID = '615833031820-tqierl43439c05eo5ajlvadq1s4o46es.apps.googleusercontent.com';
const GMAIL_OAUTH_CLIENT_SECRET = 'xWiLLXwy-3Kp5lHaZuEgJeIw';

const oauth2Client = new OAuth2(
    GMAIL_OAUTH_CLIENT_ID, //process.env.GMAIL_OAUTH_CLIENT_ID, // ClientID
    GMAIL_OAUTH_CLIENT_SECRET,//process.env.GMAIL_OAUTH_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground"//process.env.GMAIL_OAUTH_REDIRECT_URL // Redirect URL
);

const GMAIL_OAUTH_REFRESH_TOKEN = '1//0g9VZpeGmLxDUCgYIARAAGBASNwF-L9Irjj0-Yco1GOyjnGkT8G1KnwFKbfqmFL7117-1vbZQMHBBEAwVqOTxRU3ynmC2tmxb04g';
oauth2Client.setCredentials({
    refresh_token: GMAIL_OAUTH_REFRESH_TOKEN //process.env.GMAIL_OAUTH_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

const handleFormSubmit = (req, res) => {
    const { caption, name, companyname, email, message } = req.body;
    const notifyAdmin = `
                    <body bgcolor="#e8e8e8">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#e8e8e8">
                            <tr>
                                <td>
                                    <table width="600px" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF"
                                    style="box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);">
                                        <tr>
                                            <td colspan="3"><a href="http://www.webpoint.io"><img
                                                style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;"
                                                src="https://i.ibb.co/D1pyytZ/email-header.png" width="600" height="60" alt="Header" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                        <td style="font-family:Arial,Helvetica,sans-serif; font-size: 16px; color:#000001; padding: 50px;">
                                                <h3>You have a new contact request.</h3>
                                                <h2>Contact Details</h2>
                                                <div style="border-top: 1px solid #e6e6e6; margin-top: 20px;"/>

                                                <h4>Caption: ${caption}</h4>
                                                <p>Name: ${name}</p>
                                                <p>Company Name: ${companyname}</p>
                                                <p>Email: ${email}</p>
                                                <h3>Message</h3>
                                                <p>${message}</p>

                                                Best wishes,<br/>
                                                The WebPoint Team
                                                <div style="border-top: 1px solid #e6e6e6; margin-top: 20px;"/>
                                                <p style="color:gray">WebPoint Solutions, LLC - 55 Alcovy Forest Dr, Covington, GA 30014<br/></p>
                                            </td>
                                        </tr>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                        `;
            // create reusable transporter object using the default SMTP transport
            
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'james@webpoint.io',
                // user: 'titanofdarkness@gmail.com',
                clientId: GMAIL_OAUTH_CLIENT_ID,
                clientSecret: GMAIL_OAUTH_CLIENT_SECRET,
                refreshToken: GMAIL_OAUTH_REFRESH_TOKEN,
                accessToken: accessToken,
            }
        });

        let mailOptions = {
            // from: '"Webpoint Contact Form" <titanofdarkness@gmail.com>', // sender address
            from: '"Webpoint Contact Form" <sales@webpoint.io>', // sender address
            to: 'james@webpoint.io', // list of receivers
            cc: 'manol@webpoint.io',
            subject: "New Contact Request Submitted", // Subject line
            text: "Hello world?", // plain text body
            html: notifyAdmin // html body
        };

        // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            transporter.close();
            // res.render('index', alert('Email has been sent'));
        })      
       
        const notifyUser = `
                            <body bgcolor="#e8e8e8">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#e8e8e8">
                                    <tr>
                                        <td>
                                            <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF"
                                            style="box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <tr>
                                                <td colspan="3"><a href="http://www.webpoint.io"><img
                                                    style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;"
                                                    src="https://i.ibb.co/D1pyytZ/email-header.png" width="600" height="60" alt="Header" /></a>
                                                </td>
                                                </tr>
                                            <tr>
                                            <td style="font-family:Arial,Helvetica,sans-serif; font-size: 16px; color:#000001; padding: 50px;">
                                                <h2>Welcome To WebPoint Solutions</h2>
                                                <div style="border-top: 1px solid #e6e6e6; margin-top: 20px;"/>

                                                    <p>Hi ${name},</p>
                                                    <p>My team and I are excited to partner with you on your project.The journey ahead to take a great idea and make it into an awesome product or solution can be daunting, but we are confident that working together with you as one team, the end result will exceed your expectations and impress the end user.</p>
                                                    <p>Before we begin, I am going to review your project description to see if it is a good fit for our company. Once we have reviewed it, we will set up a meeting where we can get to know you, your company, and your customers better and begin to understanding the more technical specifics of your project. We don't rush into starting projects because we believe that a thorough understand of your business and customers will allow us to take a strategic approach to your project development.</p>

                                                    Regards,<br/>
                                                    <p>James Wilson<br/>
                                                    Owner | Web Applications Architect<br/>
                                                    Tel: <a href="tel:+1(470) 755-6225" style="text-decoration: none; color: #000001">+1(470) 755-6225</a><br/>
                                                    Email: <a href="mailto:info@webpoint.io" style="text-decoration: none; color: #000001">info@webpoint.io</a><br/>
                                                    Skype: jdw1942<br/>
                                                    Website: <a href="https://webpoint.io/" target="_blank" style="text-decoration: none; color: #000001"; padding-bottom:20px>www.webpoint.io</a><br/></p>
                                                    <div style="border-top: 1px solid #e6e6e6; margin-top: 20px;"/>
                                                    <p style="color:gray">WebPoint Solutions, LLC - 55 Alcovy Forest Dr, Covington, GA 30014<br/></p>
                                                </td>
                                            </tr>
                                        </table>
                                        </td>
                                </tr>
                            </table>
                        </body>
        `;

        let transporter2 = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'james@webpoint.io',
                clientId: GMAIL_OAUTH_CLIENT_ID,
                clientSecret: GMAIL_OAUTH_CLIENT_SECRET,
                refreshToken: GMAIL_OAUTH_REFRESH_TOKEN,
                accessToken: accessToken,
            }
        });

        let mailOptions2 = {
            from: '"WebPoint Soultions, LLC" <sales@webpoint.io>', // sender address
            to: email, // list of receivers
            bcc: '',
            subject: "James @ WebPoint Solutions", // Subject line
            text: "Hello world?", // plain text body
            html: notifyUser // html body
        };

        let info2 = transporter2.sendMail(mailOptions2, (error, info2) => {
            error ? console.log(error) : console.log(info2);
            transporter.close();
            // res.render('index', alert('Email has been sent'));
        }) 
}

module.exports = {
    handleFormSubmit: handleFormSubmit
}