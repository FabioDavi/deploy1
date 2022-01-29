const express = require('express')
const bodyparser = require('body-parser')
const {check, validationResult} = require('express-validator')
const bodyParser = require('body-parser')
const res = require('express/lib/response')

const app = express()
const port = process.env.PORT || 3000

app.use('./css', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const urlencodedParser = bodyParser.urlencoded({extended: false})

app.post('/forms', urlencodedParser, [
            check('user', 'O nome do usuário precisa ter 3 ou mais caracteres')
                .exists()
                .isLength({min:3}),
            check('email', 'Email invalido')
                .isEmail()
                .normalizeEmail(),
            check('senha', "senha precisa ser igual ou maior q 6")
                .isLength({min:6}),
            check('senha', "As senhas são diferentes")                
                .not().equals('senha1')

], (req, res)=> {
   
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       // return res.status(422).jsonp(errors.array())
       const alerts = errors.array()
       res.render('pages/forms',{
            alerts
       })
    }
    else{
       // console.log(req.body);
        return res.json(req.body)
    }
});

app.get('/', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/home', {
        mascots: mascots,
        tagline: tagline
    });
});

// about page
app.get('/about', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/about', {
        mascots: mascots,
        tagline: tagline
    });
});


// about page
app.get('/forms', function(req, res) {
   
    res.render('pages/forms', {
     
    });
});



app.listen(port, ()=>{
    console.info('rodando')
})
