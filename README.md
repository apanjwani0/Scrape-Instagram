# Scrape-Instagram

This is a basic web-scraping tool for Instagram-users.




## Current Feature includes :

1) Download all Post of any Public Profile.
2) ..

## Description : 

Enter any Public Profile username, and download a zip of all posts of that profile.
Title of that post-pic will be the Date+(number of people in that post, calculated by Instagram's AI model).

## Flow :

1) Takes username as input
2) Checks for an existing Zip file with that username -> if yes, downloads that file in browser
3) Sets-up Puppeteer to launch
4) Opens 'https://<span></span>www<span></span>.instagram<span></span>.com/{username}'
5) Checks if the account is private -> if yes, ends process
6) Scrolls through all posts and maps img.src with img.alt
7) Creates a name for that post with img.alt
8) Downloads all posts and stores them in './images/{username} -{numberOfPosts} posts'
9) Create a {username}.zip of that images folder
10) Deletes Images Folder
11) Redirects page to '/{username}.zip'
12) Browser Downloads that zip file



### Tech : 

Node.js- Puppeteer,Axios,Express
