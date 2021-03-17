const express=require('express')
const scrap =require('./scrape-instagram')

const app=express()
const path=require('path')
const port =process.env.PORT || 3000
const publicDir =path.join(__dirname,'../public')

app.use(express.static(publicDir))

app.listen(port,()=>{
    console.log('Server is up on port',port)
})

app.get('/',(req,res)=>{
    res.render('index')
})

//harcoded
scrap.setup('badminton_iiitdmjabalpur').then(()=>{
    console.log('Done')
    //scrap.end(scrap.browser)
}).catch((err)=>{
    console.log(err)
    //scrap.end(scrap.browser)
})

