const fs=require('fs')
const path=require('path')
const moment=require('moment')

const sizeLimit = 5e+7 // 5e+7 bytes = 50 MB //50 MBs can store around 600 posts
const zipFilesPath='./zipFiles'
const allFiles=fs.readdirSync(zipFilesPath) || []

const deleteExtra= function (){
    // var size=fs.statSync(zipFilesPath)
    // console.log(size)
    // if(size>=sizeLimit){
    // }
    console.log('Limit is '+(sizeLimit*1e-6)+' MBs')
    var dirSize=0
    var fileOrder={},sortedFileOrder={}
    allFiles.forEach((zipFile)=>{
        //console.log(zipFile)
        const fileStats=fs.statSync(zipFilesPath+'/'+zipFile)
        dirSize+=parseInt(fileStats.size)
        fileOrder[fileStats.birthtime]=zipFile
        //console.log(fileStats.size)
    })
    
    //If Directory size is Greater than limit than start Deleting files from Oldest to match limit
    if(dirSize>sizeLimit){
        console.log('Deleting Extra Files')

        //SORT from Oldest to newest Files
        Object.keys(fileOrder).sort((a,b)=>{
            a=moment(new Date(a).toISOString()).toDate()
            b=moment(new Date(b).toISOString()).toDate()
            return a-b //oldest first
        }).forEach((key)=>{
            sortedFileOrder[key] = fileOrder[key];
        })

        //console.log(sortedFileOrder)
        
        //Start Deleting Files to bring dirSize<sizeLimit
        for(const [dateCreated,file] of Object.entries(sortedFileOrder)){
            const fileSize=fs.statSync(zipFilesPath+'/'+file).size
            fs.unlinkSync(zipFilesPath+'/'+file)
            dirSize-=fileSize
            //console.log(file,dirSize)
            if(dirSize<sizeLimit){break;}
        }
        console.log('New Directory size is '+(dirSize*1e-6)+' MBs')
    }else{
        console.log('Directory size is '+(dirSize*1e-6)+' MBs')
        
    }
}

module.exports={
    deleteExtra
}

