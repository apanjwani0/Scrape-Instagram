const express=require('express')
const scrap =require('./scrape-instagram')
const fs=require('fs');

const app=express()


const path=require('path')
const { fstat } = require('fs')
const port =process.env.PORT || 3000
const publicDir =path.join(__dirname,'../public')

app.use(express.urlencoded({extended:true}));
app.use(express.static(publicDir))
app.use(express.json());

app.listen(port,()=>{
    console.log('Server is up on port',port)
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/',(req,res)=>{
    console.log(req.body)
    var username=req.body.username
    res.redirect('/')
    if(!fs.existsSync('./zipFiles/'+username+'.zip')){
        console.log('Getting Posts')
        scrap.setup(username).then(()=>{
            console.log('Done')
            //scrap.end(scrap.browser)
        }).catch((err)=>{
            console.log(err)
            //scrap.end(scrap.browser)
        })
    }else{
        console.log('File already exists')
    }
})


//harcoded

// scrap.setup('badminton_iiitdmjabalpur').then(()=>{
//     console.log('Done')
//     //scrap.end(scrap.browser)
// }).catch((err)=>{
//     console.log(err)
//     //scrap.end(scrap.browser)
// })

