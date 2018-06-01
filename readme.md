# 网易云音乐爬虫

## 说明

本项目不得用于商业用途，仅做学习交流

## 开发环境

*   Nodejs ^7.9.0

## 运行

### windows

*   step1 win+r 打开 cmd，进入某路径（如 D:\）
*   step2 下载项目
    `git clone https://github.com/Cyloving/musicdown.git`
*   step3 跳过自动下载 Chromium
    `set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1`
*   step4 npm install
*   step5 手动下载 Chromium [https://download-chromium.appspot.com/](https://download-chromium.appspot.com/)
*   step6 npm start
*   step7 下载完成后，会放到项目文件目录下以 YYYY-MM-DD ( 如 2018-01-01 ) 命名的文件夹里

## 版本信息

目前只完成了[云音乐电音榜](https://music.163.com/#/discover/toplist?id=1978921795) 的榜单下载

后续待增加别的榜单
