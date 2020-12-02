const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const formsubmit = require('./controllers/formsubmit');
const Process = require('process');
const request = require('request');


const app = express();

app.use(compression());
app.use(helmet());

//BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
//STATIC FOLDER
app.use('/public', express.static(path.join(__dirname, 'public')));

//SET VIEW ENGINE

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
   res.render('index');
});

app.get('/privacy', (req, res) => { 
    res.render('privacy')
});

//SEND END POINT
app.post('/formsubmit', async (req, res) => {
    console.log(req.body.captcha);
    const { captcha } = req.body;
    if(!captcha) {
        return res.json({"success" : false, "msg" : 'Please Select Captcha'})
    }

    //secret key
    const SECRET_KEY = '6LfOg8AUAAAAAD3OU3VHUvAYPCQxCanCl6zilzir';


    //verify URL
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captcha}`

    await request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);

        //if not successful
        if(body.success !== undefined && !body.success){
            return res.json({"success" : false, "msg" : 'Failed Captcha Verification'})
        }

        //if successful
        res.json({"success" : true, "msg" : 'Captcha Passed'})
        return formsubmit.handleFormSubmit(req, res)
    })
});

const port = process.env.PORT || 3000;
//local dev env
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.listen(3000, () => {
//     console.log(`Server is running on port..3000`);
// })
