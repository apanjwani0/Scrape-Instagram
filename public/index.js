const $searchBoxInput=document.querySelector("div.search-box input[name='username']")
const $searchBoxButton=document.querySelector("div.search-box button")


$searchBoxButton.addEventListener('click',()=>{
    const username=$searchBoxInput.value
    console.log(username)
    //instagramScrapper.setup(username)
    
})

