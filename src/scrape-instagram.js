const puppeteer = require('puppeteer');
const fetch=require('node-fetch')
//const request=require('request')
const axios=require('axios').default
const fs=require('fs');
const AdmZip = require('adm-zip');
const { dir } = require('console');


//const loginPopupClass="RnEpo  _Yhr4    ";
//const imageClass=""
const numberOfPostsClass="g47SY "   // "document.getElementsByClassName('g47SY ')[0].outerText == number of posts"
//const loginToInstagramCloseButtonClass ="dCJp8 afkep xqRnw"

async function setup(username) {
    const URL=`https://www.instagram.com/${username}/`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL);

    const privateAccount = await checkIfPrivate(page)
            //Account not public 
            // "rkEop" class has a header which says "this acc is private" on instagram
    if (privateAccount) {
        //console.log('This account is private!')
        await end(browser)
        throw Error('This account is private!')
    } else {
        var postsAvailable=await page.evaluate(()=>{
            return  parseInt(document.getElementsByClassName("g47SY ")[0].innerText)
            //console.log(this.postsAvailable)
            //alert(this.postsAvailable)
        })
        var path="images/"+username+' -'+postsAvailable+' posts'
        
        const data=await scrollAndFetchUrls(page)
        console.log(Object.keys(data.images).length)
        
        console.log(path)
        fs.mkdir(path,{recursive:true},(e)=>{
            console.log('Directory Created')
        })
        var num=1
        for(url in data.images){
            var altText=data.images[url]
            var title=num.toString()+'-'+getTitle(altText)
            await downloadImage({url,path,name:title})
            num++;
        }
        await end(browser)
        //createZIP(username+' -'+postsAvailable+' posts')
        createZIP(username,postsAvailable)
        return console.log('You can close now')
    }
};

function getTitle(altText){
    // altText.indexOf(".") = end of first sentence
    const firstSentence=altText.slice(0,altText.indexOf(".")+1)
    //console.log(firstSentence);
    // firstSentence.search(" on ") +4 = start of date
    var pos=firstSentence.search(" on ") +4
    var date='';
    var title
    if(pos!==3){
        for(var i=0;i<3 && pos<firstSentence.length;i++){
            var word=firstSentence.slice(pos,firstSentence.indexOf(" ",pos))
            pos=firstSentence.indexOf(" ",pos)+1
            if(word[-1]===','){
                word=word.slice(0,-1)
            }
            //console.log(word)
            date+=word;
        }
    }
    //console.log(date)
    title=date ? date+' ': date
    pos=altText.search("ay be an "); // M/may be an image of 7 people.
    title+=altText.slice(pos-1,(altText.indexOf("people",pos))+6)
    //console.log(title)
    return title
}


async function scrollAndFetchUrls(page) {
    return await page.evaluate(async () => {
        const postsAvailable = document.getElementsByClassName("g47SY ")[0].innerText
        document.body.style="overflow:visible";
        const urls = [];
        const images={};

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
                    const altText =imageElements[i].getAttribute("alt")
                    if(url){
                        urls.push(url)
                        images[url]=altText ? altText : i 
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
            postsAvailable,
            images
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
    const buffer=(await axios.get(url)).data
    fs.writeFile(`${path}/${name}.jpeg`,buffer,()=>{
        console.log(`${name} downloaded!`)
    })
}

const zipFile = new AdmZip();
function createZIP(username,postsAvailable){
    const folderName=username+' -'+postsAvailable+' posts'
    zipFile.addLocalFolder('./images/'+folderName,username)
    console.log('Creating zip file')
    fs.writeFileSync('./zipFiles/'+username+'.zip', zipFile.toBuffer());
    console.log('Deleting Original Folder')
    //TODO
    //Delete Original Folder
    fs.rmdir('./images/'+folderName,{recursive:true},(err)=>{
        if(err){
            throw err
        }
        console.log('./images/'+folderName+' Deleted !')
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