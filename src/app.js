const express=require('express')
const scrap =require('./scrape-instagram')

const app=express()
const path=require('path')
const port =process.env.PORT || 3000
const publicDir =path.join(__dirname,'../public')

app.use(express.static(publicDir))
app.get('/',(req,res)=>{
    res.render('index')
})

//harcoded
scrap.setup('iiitdm_jabalpur').then(
    console.log('Done')
)


app.listen(port,()=>{
    console.log('Server is up on port',port)
})