var express = require('express');
var router = express.Router();
var result = require('../model/result');
const crypto = require("crypto");
const fetch = require('node-fetch');

/* get user */
router.get('*', function(req, res) {
    console.log('get user called, id: lihaoxx' );

    async function fetchData() {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data; // 返回获取到的数据
    }

// 调用async函数并处理返回的数据
    fetchWeb(req).then(returnedData => {
        console.log(returnedData); // 输出获取到的数据
        res.send(returnedData)
    }).catch(error => {
        console.error('Error fetching data:', error);
    });


});

// 部署完成后在网址后面加上这个，获取自建节点和机场聚合节点，/?token=auto或/auto或

let mytoken = 'auto'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
let BotToken =''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID =''; //可以为空，或者@userinfobot中获取，/start
let TG = 0; //小白勿动， 开发者专用，1 为推送所有的访问信息，0 为不推送订阅转换后端的访问信息与异常访问
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; //自定义订阅更新时间，单位小时
let total = 99;//PB
let timestamp = 4102329600000;//2099-12-31

//节点链接 + 订阅链接
let MainData = `
trojan://402d7490-6d4b-42d4-80ed-e681b0e6f1f9@cwork.678567.xyz:443?security=tls&type=ws&host=cwork.678567.xyz&path=%2F#USC
vless://402d7490-6d4b-42d4-80ed-e681b0e6f1f7@jp99.987443.xyz:443?encryption=none&security=tls&sni=jp99.987443.xyz&fp=randomized&type=ws&host=jp99.987443.xyz&path=%2F%3Fed%3D2048#USCC
`

let urls = [];
let subconverter = "url.v1.mk"; //在线订阅转换后端，目前使用肥羊的订阅转换功能。支持自建psub 可自行搭建https://github.com/bulianglin/psub
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini"; //订阅配置文件


async function fetchWeb(request) {
    env = {}
    const userAgentHeader = request.headers['user-agent'];
    const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
    const url = request.headers.host + request.originalUrl;
    const host = request.headers.host;
    console.log("url:" + url);
    const token = request.query['token'];
    mytoken = request._parsedUrl['pathname'];
    BotToken = env.TGTOKEN || BotToken;
    ChatID = env.TGID || ChatID;
    TG = env.TG || TG;
    subconverter = env.SUBAPI || subconverter;
    subconfig = env.SUBCONFIG || subconfig;
    FileName = env.SUBNAME || FileName;
    if (!request.originalUrl.includes('token')) {
        MainData = MainData + 'http://789258.xyz' + request.originalUrl;
    }else {
        MainData = MainData + 'http://789258.xyz/link' + request._parsedUrl['pathname']+'?sub=3';
    }
    console.log(MainData);
    //MainData = env.LINK || MainData;
    if (env.LINKSUB) urls = await ADD(env.LINKSUB);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timeTemp = Math.ceil(currentDate.getTime() / 1000);
    const fakeToken = 'f60ed236-81da-32ed-b47e-8a8fab1bcc58';
    //console.log(`${fakeUserID}\n${fakeHostName}`); // 打印fakeID

    let UD = Math.floor(((timestamp - Date.now()) / timestamp * 99 * 1099511627776 * 1024) / 2);
    total = total * 1099511627776 * 1024;
    let expire = Math.floor(timestamp / 1000);
    SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;

    let 重新汇总所有链接 = await ADD(MainData + '\n' + urls.join('\n'));
    let 自建节点 = "";
    let 订阅链接 = "";
    for (let x of 重新汇总所有链接) {
        if (x.toLowerCase().startsWith('http')) {
            订阅链接 += x + '\n';
        } else {
            自建节点 += x + '\n';
        }
    }
    MainData = 自建节点;
    urls = await ADD(订阅链接);
    console.log("token:" + token);
    console.log("mytoken:" + mytoken);
    console.log("fakeToken:" + fakeToken);
    console.log("url.pathname:" + url.pathname);

    if (!(token == mytoken || token == fakeToken || url.pathname == ("/" + mytoken) || url.includes("/link/"))) {
        if (TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico") await sendMessage(`#异常访问 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgent}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
        const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
        if (envKey) {
            const URLs = await ADD(env[envKey]);
            const URL = URLs[Math.floor(Math.random() * URLs.length)];
            return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
        }
        return await nginx();
    } else {
        console.log("进入正文处理''''")
        //await sendMessage(`#获取订阅 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
        let 订阅格式 = 'base64';
        if (userAgent.includes('null') || userAgent.includes('subconverter') || userAgent.includes('nekobox') || userAgent.includes(('CF-Workers-SUB').toLowerCase())) {
            订阅格式 = 'base64';
        } else if (userAgent.includes('clash') || (url.includes('clash') && !userAgent.includes('subconverter'))) {
            订阅格式 = 'clash';
        } else if (userAgent.includes('sing-box') || userAgent.includes('singbox') || ((url.includes('sb') || url.includes('singbox')) && !userAgent.includes('subconverter'))) {
            订阅格式 = 'singbox';
        }

        let subconverterUrl;
        let 订阅转换URL = `${host}/link${mytoken}?token=${fakeToken}`;
        console.log("订阅转换URL:"+订阅转换URL);
        let req_data = MainData;
        // 创建一个AbortController对象，用于控制fetch请求的取消
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort(); // 取消所有请求
        }, 8000); // 2秒后触发


        let 追加UA = 'v2rayn';
        if (url.includes('clash')) {
            追加UA = 'clash';
        } else if (url.includes('singbox')) {
            追加UA = 'singbox';
        }
        console.log("urls:" + urls);
        try {
            const responses = await Promise.allSettled(urls.map(url =>
                fetch(url, {
                    method: 'get',
                }).then(response => {
                    console.log("response:" + response.toString());
                    if (response.ok) {
                        return response.text().then(content => {
                            console.log("得到输出------" + content);
                            // 这里可以顺便做内容检查
                            if (content.includes('dns') && content.includes('proxies') && content.includes('proxy-groups')) {
                                //console.log("clashsub: " + url);
                                订阅转换URL += "|" + url;
                            } else if (content.includes('dns') && content.includes('outbounds') && content.includes('inbounds')) {
                                //console.log("singboxsub: " + url);
                                订阅转换URL += "|" + url;
                            } else {
                                //console.log("未识别" + url);
                                return content; // 保证链式调用中的下一个then可以接收到文本内容
                            }
                            //console.log(content);
                        });
                    } else {
                        console.log("没有输出：：：：：");
                        return ""; // 如果response.ok为false，返回空字符串

                    }
                })
            ));

            for (const response of responses) {
                if (response.status === 'fulfilled' && response.value) {
                    const content = response.value;
                    req_data += base64Decode(content) + '\n';
                }
            }

        } catch (error) {
            console.error(error);
        } finally {
            // 无论成功或失败，最后都清除设置的超时定时器
            clearTimeout(timeout);
        }

        //修复中文错误
        const utf8Encoder = new TextEncoder();
        const encodedData = utf8Encoder.encode(req_data);
        const text = String.fromCharCode.apply(null, encodedData);
        console.log("tesxt" + text)
        //去重
        const uniqueLines = new Set(text.split('\n'));
        const result = [...uniqueLines].join('\n');
        console.log("result:" + result);

        const base64Data = btoa(result);

        if (订阅格式 == 'base64' || token == fakeToken) {
            return base64Data;
        } else if (订阅格式 == 'clash') {
            subconverterUrl = `https://${subconverter}/sub?target=clash&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
        } else if (订阅格式 == 'singbox') {
            subconverterUrl = `https://${subconverter}/sub?target=singbox&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
        }
        console.log("订阅格式:"+订阅格式);
        console.log("订阅转换URL:"+订阅转换URL);
        console.log("subconverterUrl:"+subconverterUrl);

        try {
            const subconverterResponse = await fetch(subconverterUrl);

            if (!subconverterResponse.ok) {
                return base64Data;
                //throw new Error(`Error fetching subconverterUrl: ${subconverterResponse.status} ${subconverterResponse.statusText}`);
            }
            let subconverterContent = await subconverterResponse.text();
            console.log("subconverterContent:::"+subconverterContent)
            if (订阅格式 == 'clash') subconverterContent = await clashFix(subconverterContent);
            return subconverterContent;
        } catch (error) {
            return base64Data;
        }
    }
}

async function ADD(envadd) {
    var addtext = envadd.replace(/[	"'|\r\n]+/g, ',').replace(/,+/g, ',');  // 将空格、双引号、单引号和换行符替换为逗号
    //console.log(addtext);
    if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
    if (addtext.charAt(addtext.length -1) == ',') addtext = addtext.slice(0, addtext.length - 1);
    const add = addtext.split(',');
    //console.log(add);
    return add ;
}

async function nginx() {
    const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
    return text ;
}

async function sendMessage(type, ip, add_data = "") {
    if ( BotToken !== '' && ChatID !== ''){
        let msg = "";
        const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
        if (response.status == 200) {
            const ipInfo = await response.json();
            msg = `${type}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
        } else {
            msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
        }

        let url = "https://api.telegram.org/bot"+ BotToken +"/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);
        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
            }
        });
    }
}

function base64Decode(str) {
    const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
}

async function MD5MD5(text) {
    const encoder = new TextEncoder();

    const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
    const firstPassArray = Array.from(new Uint8Array(firstPass));
    const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
    const secondPassArray = Array.from(new Uint8Array(secondPass));
    const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return secondHex.toLowerCase();
}

function clashFix(content) {
    if(content.includes('wireguard') && !content.includes('remote-dns-resolve')){
        let lines;
        if (content.includes('\r\n')){
            lines = content.split('\r\n');
        } else {
            lines = content.split('\n');
        }

        let result = "";
        for (let line of lines) {
            if (line.includes('type: wireguard')) {
                const 备改内容 = `, mtu: 1280, udp: true`;
                const 正确内容 = `, mtu: 1280, remote-dns-resolve: true, udp: true`;
                result += line.replace(new RegExp(备改内容, 'g'), 正确内容) + '\n';
            } else {
                result += line + '\n';
            }
        }

        content = result;
    }
    return content;
}
module.exports = router;
