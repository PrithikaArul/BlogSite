const express=require('express');
const path=require('path');
const morgan=require('morgan');
const mongoose=require('mongoose');
const blogRoutes=require('./routes/blogRoutes');


//express app
const app=express();

const dbURI='mongodb+srv://prithika_a:Prithika100@node.mvgmi.mongodb.net/node-crash';
mongoose.connect(dbURI)
.then((result)=>{
    app.listen(3000);

})
.catch((err)=>{
    console.log(err);
});
//register view engine
app.set('view engine','ejs');
//listen for requests
// app.listen(3000);

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.redirect('/blogs');
})


app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about',{title:'About'});
})

app.get('/blogs/create',(req,res)=>{
    res.render('./blogs/create',{title:'Create'});
})

//blog routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})