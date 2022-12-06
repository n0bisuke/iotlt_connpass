'use strict'

const auth = require(`./ss_auth`).auth;
const listMajors = require(`./ss_auth`).listMajors;

const ss = (ssid, range) => {
    return new Promise((resolve, reject) => {
        auth({SECRET_PATH:'./settings/client_secret.json'})
        .then((auth) => {
            return listMajors(auth, ssid, range);
        }).then((text) => {
            text = convertMD(text);
            resolve(text);
        }).catch((err)=>{
            reject(err);
        })
    });
}

const convertMD = (res) => {
    const rows = res.values;
    //||LT: 未定	|未定 |
    //||LT: 未定	|未定 |
    let text = '';
    for(let i = 0,len=rows.length; i<len; i++){
        const head = `LT`;
        const newline = (i<len-1) ? '\n' : '\n|21:00'; 
        rows[i][1] = rows[i][1] ? rows[i][1] : '未定';
        rows[i][2] = rows[i][2] ? rows[i][2] : '未定';
        text += `||${head}: ${rows[i][1]} | ${rows[i][2]} ${newline}`;
    }
    return text;
}

module.exports = ss;