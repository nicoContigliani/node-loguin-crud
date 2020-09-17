const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


//initialization
const app = express()

//seting
app.set('port', (process.env.PORT || 4000));
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')

}));
//global variables 
app.use((req,res,next)=>{
    next();
})

//midalware
app.use(morgan('dev'));
app.set('view engine','.hbs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//public 
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('links',require('./routes/links'))
//Public

//starting server 

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})