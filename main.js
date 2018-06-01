const puppeteer = require('puppeteer');
const requestAPI = require('request');
const fs = require("fs");

const REPLAY_SELECTOR = '#toplist a[data-res-id="1978921795"] .ply';
const RATE_SELECTOR = '#g_nav2 > div > ul > li:nth-child(2) > a > em';
const DIAN_SELECTOR = '#toplist > div.g-sd3.g-sd3-1 > div > ul:nth-child(4) > li:nth-child(1) > div > div > a > img';
const SONG_TITLE_SELECTOR = '#g_player > div.play > div.j-flag.words > a.f-thide.name.fc1.f-fl';
const NEXT_SELECTOR = '#g_player > div.btns > a.nxt';
(async () => {
    const browser = await puppeteer.launch({
        executablePath: './chrome/chrome.exe',
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://music.163.com/#/discover/toplist?id=1978921795');
    console.log("init folder");
    //init folder date
    let date = new Date();
    let time = date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
    let path = "./" + time;
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
    fs.mkdirSync(path);
    //init data
    let title;
    let title_array = [];
    //start replay music
    await page.evaluate((e) => {
        let a = document.getElementById('g_iframe').contentWindow.document.querySelector(e);
        a.click();
    }, REPLAY_SELECTOR)
    await page.waitForSelector(SONG_TITLE_SELECTOR);
    //went mp3 requestfinished
    console.log("start download");
    page.on('requestfinished', async (request) => {
        if (request.url().endsWith('.mp3')) {
            title = await page.evaluate((e) =>
                document.querySelector(e).innerHTML
                , SONG_TITLE_SELECTOR)
            //local save
            request.response().buffer().then((buffer) => {
                fs.writeFile("./" + time + "/" + title + ".mp3", buffer, (err) => {
                    if (err) throw err;
                    if (title_array.includes(title)) {
                        console.log('download finished!');
                        browser.close();
                    } else {
                        title_array.push(title);
                        console.log(title + '.mp3 has been download !');
                        page.evaluate((e) => {
                            document.querySelector(e).click();
                        }, NEXT_SELECTOR)
                    }
                });
            });

        }

    });

})();
