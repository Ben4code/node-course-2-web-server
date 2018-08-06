const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//Botstrap the express framwork.
let app = express();

//Handlebars config
app.set('view-engine', 'hbs');

//Register Partials
hbs.registerPartials(__dirname + '/views/partials');

//Register Helpers 
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('toCaps', (text)=>{
    return text.toUpperCase();
});

app.use((req, res, next )=>{
    let now = new Date().toString();
    console.log(`${now}, ${req.method}, ${req.url}`);
    let log = `${now}, ${req.method}, ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append server.log');
        }
    });
    next();
});

//app.use((req, res, next)=>{ 
    //res.render('maintenance.hbs',{});
//});

//Create response and route for home
app.get('/', (req, res)=>{   
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMsg: "Welcome to our site"
    })
});

//Create response and route for about
app.get('/about', (req, res)=>{
    //Ideal for view engine
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

//Create response and route for contact page
app.get('/contact', (req, res)=>{
    //Ideal for view engine
    res.render("contact.hbs", {
        pageTitle: "Contact Page",
    });
});


//Setup port to listen for
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});




//Setup Middleware to serve contents of public directory.
//app.use(express.static(__dirname + "/public"));
 