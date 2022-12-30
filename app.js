require("dotenv").config()
const puppeteer=require("puppeteer")
const loginlink=process.env.LOGIN_LINK
let browserOpen=puppeteer.launch({
    headless:false,
    args:['---start-maximized'],
    defaultViewport:null,
})

let page

browserOpen.then(function(browserObj){
    let browserOpenPromise=browserObj.newPage()
    return browserOpenPromise
}).then(function(newtab){
    page=newtab
    let hackerRankOpenPromise=newtab.goto(loginlink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered=page.type("input[id='input-1']",process.env.EMAIL,{delay:50})  // to type use page.type
    return emailIsEntered
}).then(function(){
    let passwordIsEntered=page.type("input[type='password']",process.env.PASSWORD,{delay:50})
    return passwordIsEntered
}).then(function(){
    let loginButtonClicked=page.click("button[data-analytics='LoginPassword']",{delay:50}) // to click use page.click
    return loginButtonClicked
}).then(function(){
    let clickOnAlgoPromise=bhaiWaitKar('.topic-card a[data-attr1="algorithms"]',page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp=bhaiWaitKar('input[value="warmup"]',page)
    return getToWarmUp
}).then(function(){
    let wait3Sec=page.waitForNetworkIdle({timeout:3000})
    return wait3Sec
}).then(function(){
    let allQuestionPromise=page.$$('.ui-btn .ui-btn-normal .primary-cta .ui-btn-primary .ui-btn-styled',{delay:50})
    return allQuestionPromise
}).then(function(questionArr){
    console.log(questionArr)
})


function bhaiWaitKar(selector,currentPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=currentPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel=currentPage.click(selector,{delay:50})
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}