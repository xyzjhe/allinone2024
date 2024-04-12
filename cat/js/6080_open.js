import {
    Crypto, load, _
}
from 'assets://js/lib/cat.js';

let key = '新视觉影视';
let HOST = 'https://www.6080yy4.com';
let siteKey = '';
let siteType = 0;

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';

async function request(reqUrl, agentSp) {
    let res = await req(reqUrl, {
        method: 'get',
        headers: {
            'User-Agent': agentSp || UA,
            'Referer': HOST
        },
    });
    return res.content;
}

// cfg = {skey: siteKey, ext: extend}
async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype;
}

async function home(filter) {
    let classes = [{
        'type_id': '1',
        'type_name': '电影'
    }, {
        'type_id': '2',
        'type_name': '电视剧'
    }, {
        'type_id': '3',
        'type_name': '综艺'
    }, {
        'type_id': '4',
        'type_name': '动漫'
    }, {
        'type_id': '63',
        'type_name': '记录'
    }];
    let filterObj = {};

    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
	const link = HOST + '/vodshow/' + tid + '--------' + pg + '---.html';
	const html = await request(link);
	const $ = load(html);
	const items = $('div.module-list > div.module-items > div.module-item');
	let videos = _.map(items, (item) => {
		const $item = $(item);
		return {
		    vod_id: $item.find('div.module-item-titlebox > a').attr('href'),
		    vod_name: $item.find('div.module-item-titlebox > a').attr('title'),
		    vod_pic: $item.find('div.module-item-cover > div > img').attr('data-src'),
		    vod_remarks: $item.find('div.module-item-text').text(),
		};
	});
	
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: 0,
        limit: 0,
        total: 0,
        list: videos,
    });
}


async function detail(id) {
    const html = await request(HOST + id);
    const $ = load(html);
    const vod = {
        vod_id: id,
        vod_name: $('h1').text(),
        vod_pic: $('div.module-item-pic > img.lazyload').attr('data-src'),
        vod_remarks: '',
        vod_content: '[关注公众号:影视资源站]  ' + $('div.vod_content > span').text(),
    };
	
	//console.debug(vod);
    const playMap = {};
    const tabs = $('div.module-tab-content > div.module-tab-item');
    const playlists = $('div.module-list > div.module-blocklist > div');
    _.each(tabs, (tab, i) => {
        const from = $(tab).find('span').text();
        let list = playlists[i];
        list = $(list).find('a');
        _.each(list, (it) => {
            const title = $(it).find('span').text();
            const playUrl = it.attribs.href;

            if (!playMap.hasOwnProperty(from)) {
                playMap[from] = [];
            }
            playMap[from].push(title + '$' + playUrl);
        });
    });
    vod.vod_play_from = _.keys(playMap).join('$$$');
    const urls = _.values(playMap);
    const vod_play_url = _.map(urls, (urlist) => {
        return urlist.join('#');
    });
    vod.vod_play_url = vod_play_url.join('$$$');
    return JSON.stringify({
        list: [vod],
    });
}

async function play(flag, id, flags) {
    const link = HOST + id;
    const html = await request(link);
    let $ = load(html);
    let js = JSON.parse($('script:contains(player_)').html().replace('var player_aaaa=', ''));
    const playurl = "https://jiexi.xn--1lq90i13mxk5bolhm8k.xn--fiqs8s/player/ec.php?code=ak&if=1&url=" + js.url;
    const result = await request(playurl);
	$ = load(result);
	js = JSON.parse($('script:contains(let ConFig =)').html().replace('let ConFig = ','').replace(',box = $("#player"),lg = ConFig.lg;',''));
    const encUrl = js.url;
	const uid = js.config.uid;
    const playUrl = AES_Decrypt(encUrl, "2890" + uid + "tB959C", '2F131BE91247866E');
    return JSON.stringify({
        parse: 0,
        url: playUrl,
        header: {
            'User-Agent': UA,
        },
    });
}


function AES_Decrypt(word, k, v) {
	var key = Crypto.enc.Utf8.parse(k);
	var iv = Crypto.enc.Utf8.parse(v);
    var srcs = word;
    var decrypt = Crypto.AES.decrypt(srcs, key, {
        iv: iv,
        mode: Crypto.mode.CBC,
        padding: Crypto.pad.Pkcs7
    });
    return decrypt.toString(Crypto.enc.Utf8);
}

async function search(wd, quick) {
    let data = JSON.parse(await request(HOST + '/index.php/ajax/suggest?mid=1&limit=50&wd=' + wd)).list;
    let videos = [];
    for (const vod of data) {
        videos.push({
            vod_id: vod.id,
            vod_name: vod.name,
            vod_pic: vod.pic,
            vod_remarks: '',
        });
    }
    return JSON.stringify({
        list: videos,
    });
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        detail: detail,
        play: play,
        //search: search,
    };
}