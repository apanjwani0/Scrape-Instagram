const puppeteer = require('puppeteer');
const fetch=require('node-fetch')
const request=require('request')
const fs=require('fs');
const { dir } = require('console');


//const loginPopupClass="RnEpo  _Yhr4    ";
//const imageClass=""
//const numberOfPostsClass=""



async function setup(username) {
    const URL=`https://www.instagram.com/${username}/`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL);


    const privateAccount = await checkIfPrivate(page)
            //Account not public 
            // "rkEop" class has a header which says "this acc is private" on instagram
    if (privateAccount) {
        console.log('This account is private!')
    } else {
        // const data = await getURLs(page)
        // console.log(data.urls,data.urls.length)
        const data=await scrollAndFetchUrls(page)
        const dataSet=new Set(data.urls)
        const dataArray=Array.from(dataSet)
        //console.log(dataSet)
        //const directory=__dirname
        const path="images/"+username
        console.log(path)
        fs.mkdir(path,{recursive:true},(e)=>{
            console.log(e)
            console.log('Directory Created')
        })
        for(var i=0;i<dataSet.size;i++){
            //console.log(dataArray[i])
            await downloadImage({url:dataArray[i], path,name:i})
        }
    }
    await browser.close();
};


async function scrollAndFetchUrls(page) {
    return await page.evaluate(async () => {
        const postsAvailabe = document.getElementsByClassName("g47SY ")[0].innerText
        document.body.style="overflow:visible";
        const urls = [];

        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                if(document.getElementsByClassName("RnEpo  _Yhr4    ")[0]){
                    document.body.removeChild(document.getElementsByClassName("RnEpo  _Yhr4    ")[0])
                }
                const imageElements = document.getElementsByClassName("FFVAD")
                const postsWant = imageElements.length
                for (var i = 0; i < postsWant; i++) {
                    const url = imageElements[i].getAttribute("src")
                    if(url){
                        urls.push(url)
                    }
                }
                
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
        return {
            urls,
            postsAvailabe
        };
    })
}

async function checkIfPrivate(page) {
    return await page.evaluate(() => {
        return document.getElementsByClassName("rkEop").length === 1
    })
    //return private
}

async function downloadImage({url,path,name}){
    // console.log(url)
    // console.log(path)
    // console.log(name)
    request({url ,encoding:null},(err,res,buffer)=>{
        try{
            fs.writeFile(`${path}/${name}.jpeg`,buffer,()=>{
                console.log(`${name} downloaded!`)
            })
        }catch{
            console.log(err)
        }
        
    })
}

async function end(browser){
    await browser.close()
}

module.exports={
    setup,
    scrollAndFetchUrls,
    end
}