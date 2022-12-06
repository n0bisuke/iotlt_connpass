'use strict';

/**
 * テキストの書き換え部分
 */

const ss = require('./ss_connpass_iotlt');

module.exports = (text, SS_ID, SS_RANGE) => {
  return new Promise((resolve, reject) => {
    ss(SS_ID, SS_RANGE)
    .then((ss_text) => {
      resolve(text.replace(/\|\|([\s\S]*)\|21:00/, ss_text)); //SSのテキストに書き換え
    }).catch(err => reject(err));
  });
}