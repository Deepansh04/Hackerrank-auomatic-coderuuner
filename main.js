const puppeteer = require('puppeteer');
const loginLink ='https://www.hackerrank.com/auth/login';
const email= 'webprojectig@gmail.com';
const password= 'webprojectig';
const codeobj = require('./codes');
let browseropen = puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null

});
let page;
browseropen.then(function(browserobj){
    let browseropenpromise= browserobj.newPage();
    return browseropenpromise;
}).then(function(newtab){
    page=newtab;
    let hackerrankopen = newtab.goto(loginLink);
    return hackerrankopen;

}).then(function(){
    let emailentered= page.type("input[id='input-1']",email,{delay:50});
    return emailentered;
}).then(function(){
    let passentered= page.type("input[id='input-2']",password,{delay:50});
    return passentered;
}).then(function(){
    let loginbuttonclick= page.click("button[data-analytics='LoginPassword']",{delay:50});
    return loginbuttonclick;
}).then(function(){
    let clickonAlgoPromises = waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
    return clickonAlgoPromises;
}).then(function(){
    let getTowarmup= waitAndClick('input[value="warmup"]',page);
    return getTowarmup;
}).then(function(){
    let waitFor3sec= page.waitForTimeout(3000);
    return waitFor3sec;
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-styled');
    return allChallengesPromise;
}).then(function(questionsArr){
    let questobesolved= questionSolver(page,questionsArr[0],codeobj.answer[0]);
    return questobesolved;
})


function waitAndClick(selector, cPage){
    return new Promise(function(resolve,reject){
        let wait = cPage.waitForSelector(selector);
        wait.then(function(){
            let clickModal = cPage.click(selector);
            return clickModal;
        }).then(function(){
            return resolve();
        }).catch(function(){
              reject();
        })
    })

}

function questionSolver(page, question, answer){
    return new Promise(function(resolve,reject){
        let questionclick= question.click();
        questionclick.then(function(){
            let editorfocus= waitAndClick('.view-lines',page);
            return editorfocus;
        }).then(function(){
            return waitAndClick('.checkbox-input',page);

        }).then(function(){
            return page.waitForSelector('textarea.custominput');
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10});

        }).then(function(){
            let controlispressed= page.keyboard.down('Control');
            return controlispressed;
        }).then(function(){
            let Aispressed= page.keyboard.press('A',{delay:100});
            return Aispressed;
        }).then(function(){
            let Xispressed= page.keyboard.press('X',{delay:100});
            return Xispressed;
        }).then(function(){
            let Ctrlunpress=page.keyboard.up('Control');
            return Ctrlunpress;
        }).then(function(){
            let editor= waitAndClick('.view-lines',page);
            return editor;
        }).then(function(){
            let controlispressed= page.keyboard.down('Control');
            return controlispressed;
        }).then(function(){
            let Aispressed= page.keyboard.press('A',{delay:100});
            return Aispressed;
        }).then(function(){
            let Vispressed= page.keyboard.press('V',{delay:100});
            return Vispressed;
        }).then(function(){
            let Ctrlunpress=page.keyboard.up('Control');
            return Ctrlunpress;
        }).then(function(){
               return page.click('.hr-monaco__run-code',{delay:10});
        }).then(function(){
            return resolve();
        }).catch(function(){
              reject();
        })

    })
}