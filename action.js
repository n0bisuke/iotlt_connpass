'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const contetRewrite = require('./libs/rewrite');

const init = () => {
    let config = {};
    config.USER_ID = process.env.CONNPASS_USER || require('./settings/config').USER_ID;
    config.PASS = process.env.CONNPASS_PASS || require('./settings/config').PASS;
    config.SS_ID = process.env.CONNPASS_SS_ID || require('./settings/config').SS_ID;
    config.SS_RANGE = process.env.CONNPASS_SS_RANGE || require('./settings/config').SS_RANGE;
    config.EVENT_ID = process.env.CONNPASS_EVENT_ID || require('./settings/config').EVENT_ID;
    return config;
}

const CONFIG = init();
const BASEURL = `https://connpass.com/login/?next=https%3A//connpass.com/event`;
const EVENT_URL = `${BASEURL}/${CONFIG.EVENT_ID}/edit/basic`;

const logging = (socket = '', message) => {
    if(socket !== ''){
        socket.emit(`chat message`,message);
        socket.emit(`line_notify`,message);
    }
    console.log(message)
}

let flag = 0;
const main = async (socket) => {
    console.log('connecting connpass...');
    if(flag === 1) {
        console.log(`起動中`);
        return;
    }

    flag = 1;//起動中フラグ
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.emulate(iPhone);

    //ログイン
    await page.goto(EVENT_URL);
    await page.focus(`input[name=username]`);
    await page.type(CONFIG.USER_ID);
    await page.focus(`input[name=password]`);
    await page.type(CONFIG.PASS);
    await page.click(`#login_form button`);
    logging(socket,`ログインdone`);

    //概要を取得
    await page.waitFor(`#id_description_input`);
    const result = await page.evaluate(() => Promise.resolve(document.getElementById(`id_description_input`).value));
    logging(socket,`概要取得done`);

    //概要を編集 スプレットシートにアクセス
    const text = await contetRewrite(result, CONFIG.SS_ID, CONFIG.SS_RANGE);
    logging(socket, `スプレットシートアクセスdone`);
    logging(socket,`概要編集done`);

    //変更を保存
    await page.evaluate((text) => document.getElementById(`id_description_input`).value = text, text);
    await page.click(`input[value=保存]`);
    logging(socket,`保存done`);

    //撮影
    await page.waitFor(1000);
    await page.screenshot({path: 'example.png'});
    await page.close();
    browser.close();
    flag = 0; //終了フラグ
};

if(process.argv[2] === '-exec'){
    main();
}else{
    module.exports = main;   
}