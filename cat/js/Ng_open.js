import {
    Crypto, load, _
}
from 'assets://js/lib/cat.js';

let key = '影视大全';
let deviceInfo = "app=ylys&devices=android&imei=&deviceModel=PCLM10&deviceVersion=9&appVersionName=1.0.9&deviceScreen=1920*1080&appVersionCode=9&deviceBrand=OPPO";
let siteKey = '';
let siteType = 0;
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';

async function request(reqUrl) {
	
	let time = Math.round(new Date().getTime()/1000).toString();
	let sign = Crypto.MD5("#uBFszdEM0oL0JRn@" + time).toString()
    let res = await req(reqUrl, {
        method: 'get',
        headers: {
            'User-Agent': 'okhttp/4.6.0',
            'package_name': 'com.app.nanguatv',
			'version_code':'9',
			'version_name':'1.0.9',
			'timeMillis':time,
			'sign':sign,
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
	let filterObj = [];
	let time = Math.round(new Date().getTime()/1000).toString();
	let api = "http://ys.changmengyun.com/api.php/provide/home_nav?time="+time+"&"+deviceInfo;
	const resp = await request(api);
	const navs = JSON.parse(resp);
	const classes = _.map(navs,(item) => {
	    let typeId = item.id;
		if( 0 === typeId) return {};
	    let typeName = item.name;
	    return {
	        type_id: typeId,
	        type_name: typeName
	    };
	});
    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
	let time = Math.round(new Date().getTime()/1000).toString();
    const link = "http://ys.changmengyun.com/api.php/provide/vod_list?time="+time+"&id="+tid+"&page="+pg+"&"+deviceInfo;
    const resp = await request(link);
	const items = JSON.parse(resp);
    let videos = _.map(items.list, (item) => {
        return {
            vod_id: item.id,
            vod_name: item.name,
            vod_pic: item.img,
            vod_remarks: item.msg,
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
	let time = Math.round(new Date().getTime()/1000).toString();
	const link = "http://ys.changmengyun.com/api.php/provide/vod_detail?time="+time+"&id="+id+"&"+deviceInfo;
    const resp = await request(link);
    const item = JSON.parse(resp).data;
    const vod = {
        vod_id: id,
        vod_name: item.name,
        vod_pic: item.img,
        vod_remarks: item.msg,
        vod_content: '[关注公众号:影视资源站]  ' + item.info,
    };
    const playMap = {};
    const tabs = item.player_info;
    _.each(tabs, (tab, i) => {
        const from = tab.show || tab.from;
        let list = tab.video_info;
        _.each(list, (it) => {
            const title = it.name;
            const playUrl = it.url;
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
	const links = id.split(',');
	let playurl = '', ua = '';
	for(const link of links) {
		try{
			let resp = await request(link);
			let js = JSON.parse(resp);
			playurl = js.hasOwnProperty('data') ? js.data.url : js.url;
			ua = js.data.header['User-Agent'];
			if (playurl.length > 10) break;
		}catch(e){
			console.debug("err " + e);
		}
	}
    return JSON.stringify({
        parse: 0,
        url: playurl,
        header: {
            'User-Agent': ua || UA,
        },
    });
}

async function search(wd, quick) {
	let time = Math.round(new Date().getTime()/1000).toString();
	const link = "http://ys.changmengyun.com/api.php/provide/search_result?video_name="+ key +"&time="+time+"&"+deviceInfo;
    let data = JSON.parse(await request(link)).data;
    let videos = [];
    for (const typeData of data) {
		
		for(const vod of typeData.data) {
			videos.push({
			    vod_id: vod.id,
			    vod_name: vod.video_name,
			    vod_pic: vod.img,
			    vod_remarks: vod.qingxidu,
			});
		}
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
        search: search,
    };
}