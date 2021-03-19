const $downloadForm=document.forms['downloadForm']
const $scrapeForm=document.forms['scrapeForm']

$downloadForm.elements.downloadButton.addEventListener('click',(e)=>{
    e.preventDefault()
    var username=$downloadForm.elements.username.value
    location.href='/'+username+'.zip'
})
