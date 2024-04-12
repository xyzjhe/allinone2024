import {
    Crypto, load, _
}
from 'assets://js/lib/cat.js';

let key = '农民影视';
let HOST = 'https://v.nmvod.cn';
let siteKey = '';
let siteType = 0;
const MACURL = /mac_url\s*=\s*'([^']+)'/;
const PLAYURL = /<video[^>]*src\s*=\s*"([^"]+)"[^>]*>/;



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
        'type_id': '26',
        'type_name': '短剧'
    }];
    let filterObj = {};
    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
    const area = getFilterUrlPart(extend, 'area');
    const clazz = getFilterUrlPart(extend, 'class');
    const by = getFilterUrlPart(extend, 'by');
    const lang = getFilterUrlPart(extend, 'lang');
    const letter = getFilterUrlPart(extend, 'letter');
    const year = getFilterUrlPart(extend, 'year');
    const link = HOST + "/vod-list-id-"+tid+"-pg-"+pg+"-order--by-time-class-0-year-0-letter--area--lang-.html";
    const html = await request(link);
    const $ = load(html);
    const items = $('.globalPicList > .resize_list > li');
    let videos = _.map(items, (item) => {
        const $item = $(item); 
		const it = $item.find('li > a:first')[0];
        return {
            vod_id: it.attribs.href,
            vod_name: it.attribs.title,
            vod_pic: $item.find('li > a > div.pic > img:first')[0].attribs.src,
            vod_remarks: '',
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

function getFilterUrlPart(extend, part) {
    let result = '';
    if (extend[part]) {
        result = '/' + part + '/' + extend[part];
    }
    return result;
}

async function detail(id) {
    const html = await request(HOST + id);
    const $ = load(html);
    const vod = {
        vod_id: id,
        vod_name: $('section.page-hd > a:first').attr('title').trim(),
        vod_pic: $('section.page-hd > a > img').attr('src'),
        vod_remarks: $('div.desc_item > font').text(),
        vod_content: '[关注公众号:影视资源站]  ' + $('div.mod-box-5 > article > p').text(),
    };
	const playlists = $('div.numList > ul > li > a');
	vod.vod_play_from = '公众号|影视资源站';
	const playurl = [];
	_.each(playlists, (playlist) => {
		let item = $(playlist);
		let title = item.text();
		let url = item.attr('href');
		playurl.push(title +"$"+ url);
	});
    vod.vod_play_url = playurl.join('#');
    return JSON.stringify({
        list: [vod],
    });
}

async function play(flag, id, flags) {
    const link = HOST + id;
    let html = await request(link);
	let match = html.match(MACURL);
	let macUrl = match ? match[1] : null;
	let encUrl = macUrl.split("$")[1];
	let url = "https://api.cnmcom.com/webcloud/nmm.php?url=" + encUrl;
	html = await request(url);
	const $ = load(html);
	const lines = $('#lines > ul > a');
	const ids = [];
	_.map(lines, (line) => {
		let item = $(line);
		let id = item.attr('id');
		ids.push(id);	
	});
	let palyUrl = "";
	for(const id of ids){
		try{
			console.debug(id);
			html = await request(id);
			match = html.match(PLAYURL);
			palyUrl = match ? match[1] : null;
			if(palyUrl.startsWith('http')) break;
		}catch(e){
			//TODO handle the exception
			console.debug(e);
		}
	}
    return JSON.stringify({
        parse: 0,
        url: palyUrl,
        header: {
            'User-Agent': UA,
        },
    });
}

async function search(wd, quick) {
    let html = await request(HOST + '/index.php?m=vod-search&wd=' + wd);
	const $ = load(html);
	const items = $('ul#data_list > li');
	let videos = _.map(items, (item) => {
	    const $item = $(item); 
		const it = $item.find('div.pic > a:first')[0];
	    return {
	        vod_id: it.attribs.href,
	        vod_name: $item.find('div.txt > span.sTit').text(),
	        vod_pic: $(it).find('img').attr('data-src'),
	        vod_remarks: '',
	    };
	});
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
        search: search,
    };
}