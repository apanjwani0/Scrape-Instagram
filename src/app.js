const express=require('express')
const scrap =require('./scrape-instagram')
const fs=require('fs');
const deleteZips=require('./deleteZips')

const app=express()
deleteZips.deleteExtra()

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
    if(!fs.existsSync('./zipFiles/'+username+'.zip')){
        console.log('Getting Posts')
        scrap.setup(username).then(()=>{
            console.log('Done')
            res.redirect('/'+username+'.zip')
            //scrap.end(scrap.browser)
        }).catch((err)=>{
            console.log(err)
            res.redirect('/')
            //scrap.end(scrap.browser)
        })
    }else{
        console.log('File already exists')
        //res.redirect('/')
        res.redirect('/'+username+'.zip')
    }
})

app.get('/:username'+'.zip',(req,res)=>{
    if(fs.existsSync('./zipFiles/'+req.params.username+'.zip')){
        res.download('./zipFiles/'+req.params.username+'.zip',req.params.username+'.zip',(err)=>{
            if(err){
                console.error(err)
            }
            deleteZips.deleteExtra()
        })
        console.log('File ready to download')
    }else{
        console.log('File Does not exist')
        res.redirect('/')
    }
    //res.redirect('/')
})

//harcoded

// scrap.setup('badminton_iiitdmjabalpur').then(()=>{
//     console.log('Done')
//     //scrap.end(scrap.browser)
// }).catch((err)=>{
//     console.log(err)
//     //scrap.end(scrap.browser)
// })

