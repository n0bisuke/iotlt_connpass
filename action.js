'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const contetRewrite = require('./libs/rewrite');

const CONFIG = require('./settings/config');
const BASEURL = `https://connpass.com/login/?next=https%3A//connpass.com/event`;
const EVENT_URL = `${BASEURL}/${CONFIG.EVENT_ID}/edit/basic`;

(async () => {
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
    console.log(`ログインdone`);

    //概要を取得
    await page.waitFor(`#id_description_input`);
    const result = await page.evaluate(() => Promise.resolve(document.getElementById(`id_description_input`).value));
    console.log(`概要取得done`);

    //概要を編集
    const text = await contetRewrite(result, CONFIG.SS_ID, CONFIG.SS_RANGE);
    console.log(`概要編集done`);

    //変更を保存
    await page.evaluate((text) => document.getElementById(`id_description_input`).value = text, text);
    await page.click(`input[value=保存]`);
    console.log(`保存done`);

    //撮影
    await page.waitFor(1000);
    await page.screenshot({path: 'example.png'});
    browser.close();
})();