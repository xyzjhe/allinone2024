import { Crypto, load, _ } from 'assets://js/lib/cat.js';

let key = '一起看APP';
let deviceInfo = "app=ylys&devices=android&imei=&deviceModel=PCLM10&deviceVersion=9&appVersionName=1.0.9&deviceScreen=1920*1080&appVersionCode=9&deviceBrand=OPPO";
let siteKey = '';
let siteType = 0;
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
let nextVal = "";
const appId = "e6ddefe09e0349739874563459f56c54";
const reqDomain = "m.yqktv888.com";

async function post(reqUrl, data) {
    let res = await req(reqUrl, {
        method: 'post',
        headers: {
            'User-Agent': UA,
        },
        data: data,
        postType: 'json',
    });
    return res.content;
}


// cfg = {skey: siteKey, ext: extend}
async function init(cfg) {
	siteKey = cfg.skey;
	siteType = cfg.stype;
}

async function home(filter) {
	try{
		let filterObj = [];
		let url = "https://api.gquaxhce.com/v1/api/home/header";
		const requestId = getRequestId();
		const udid = getUUID();
		const signData = 'appId='+appId+'&reqDomain='+reqDomain+'&requestId='+requestId+'&udid='+udid+'&appKey=3359de478f8d45638125e446a10ec541';
		const sign = Crypto.MD5(signData).toString();
		const params = {
		    "appId": appId,
		    "reqDomain": reqDomain,
		    "requestId": requestId,
		    "udid": udid,
			"sign": sign
		};
		const resp = await post(url,params);
		const navs = JSON.parse(resp).data.channelList;
		const classes = _.map(navs, (item) => {
			let typeId = item.channelId;
			let typeName = item.channelName;
			return {
				type_id: typeId,
				type_name: typeName
			};
		});
		return JSON.stringify({
			class: classes,
			filters: filterObj,
		});
	}catch(e){
		//TODO handle the exception
		console.debug("err " + e);
	}
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
	const link = "https://api.gquaxhce.com/v1/api/search/queryNow";
	const queryJson = {};
	queryJson.filerName = "channelId";
	queryJson.filerValue = tid;
	const queryValueJson = "["+JSON.stringify(queryJson)+"]";
	const requestId = getRequestId();
	const udid = getUUID();
	const signData = "appId=e6ddefe09e0349739874563459f56c54&nextCount=18"+(nextVal.length === 0 ?"":"&nextVal="+nextVal)+"&queryValueJson="+queryValueJson+"&reqDomain=m.yqktv888.com&requestId="+requestId+"&udid="+udid+"&appKey=3359de478f8d45638125e446a10ec541";
	const sign = Crypto.MD5(signData).toString();
	const params = {
		"appId": appId,
		"reqDomain": reqDomain,
		"nextCount": 18,
		"nextVal": nextVal,
		"queryValueJson": queryValueJson,
		"requestId": requestId,
		"udid": udid,
		"sign": sign
	};
	const resp = await post(link,params);
	const items = JSON.parse(resp);
	nextVal = items.data.nextVal;
	let videos = _.map(items.data.items, (item) => {
		return {
			vod_id: item.vodId,
			vod_name: item.vodName,
			vod_pic: item.coverImg,
			vod_remarks: item.watchingCountDesc,
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
	const link = "https://api.gquaxhce.com/v1/api/vodInfo/detail";
	const requestId = getRequestId();
	const udid = getUUID();
	const signData = "appId=e6ddefe09e0349739874563459f56c54&reqDomain=m.yqktv888.com&requestId="+requestId+"&udid="+udid+"&vodId="+id+"&appKey=3359de478f8d45638125e446a10ec541";
	const sign = Crypto.MD5(signData).toString();
	const params = {
		"appId": appId,
		"reqDomain": reqDomain,
		"requestId": requestId,
		"udid": udid,
		"vodId": id,
		"sign": sign
	};
	const resp = await post(link,params);
	const item = JSON.parse(resp).data;
	const vod = {
		vod_id: id,
		vod_name: item.vodName,
		vod_pic: item.coverImg,
		vod_remarks: item.tagList,
		vod_content: '[关注公众号:影视资源站]  ' + item.intro,
	};
	const playMap = {};
	const tabs = item.playerList;
	_.each(tabs, (tab, i) => {
		const from = tab.playerName;
		let list = tab.epList;
		_.each(list, (it) => {
			const title = it.epName;
			const playUrl = it.epId;
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
	try{
		let url = "https://api.gquaxhce.com/v1/api/vodInfo/getEpDetail";
		let requestId = getRequestId();
		let udid = getUUID();
		let signData = "appId=e6ddefe09e0349739874563459f56c54&epId="+id+"&reqDomain=m.yqktv888.com&requestId="+requestId+"&udid="+udid+"&appKey=3359de478f8d45638125e446a10ec541";
		let sign = Crypto.MD5(signData).toString();
		let params = {
			"appId": appId,
			"reqDomain": reqDomain,
			"requestId": requestId,
			"udid": udid,
			"epId": id,
			"sign": sign
		};
		let resp = await post(url,params);
		const resolutionItems = JSON.parse(resp).data.resolutionItems;
		const vodResolution = resolutionItems.length > 0 ? resolutionItems[resolutionItems.length - 1].vodResolution : "1";
		url = "https://api.gquaxhce.com/v1/api/vodInfo/getPlayUrl";
		requestId = getRequestId();
		udid = getUUID();
		signData = "appId=e6ddefe09e0349739874563459f56c54&epId="+id+"&reqDomain=m.yqktv888.com&requestId="+requestId+"&udid="+udid+"&vodResolution="+vodResolution+"&appKey=3359de478f8d45638125e446a10ec541";
		sign = Crypto.MD5(signData).toString();
		params = {
			"appId": appId,
			"reqDomain": reqDomain,
			"requestId": requestId,
			"udid": udid,
			"epId": id,
			"vodResolution": vodResolution,
			"sign": sign
		};
		resp = await post(url,params);
		const play = JSON.parse(resp);
		if(!play.result) return "";
		return JSON.stringify({
			parse: 0,
			url: play.data,
			header: {
				'User-Agent': UA,
			},
		});
	}catch(e){
		console.debug("play err " + e);
	}
}

async function search(wd, quick) {
	const link = "https://api.gquaxhce.com/v1/api/search/search";
	let requestId = getRequestId();
	let udid = getUUID();
	let signData = "appId=e6ddefe09e0349739874563459f56c54&keyword="+wd+"&nextCount=15&reqDomain=m.yqktv888.com&requestId="+requestId+"&udid="+udid+"&appKey=3359de478f8d45638125e446a10ec541";
	let sign = Crypto.MD5(signData).toString();
	let params = {
		"appId": appId,
		"reqDomain": reqDomain,
		"requestId": requestId,
		"udid": udid,
		"nextCount": 15,
		"nextVal": "",
		"keyword": wd,
		"sign": sign
	};
	let data = JSON.parse(await post(link,params)).data.items;
	let videos = [];
	for (const vod of data) {
		videos.push({
			vod_id: vod.vodId,
			vod_name: vod.vodName,
			vod_pic: vod.coverImg,
			vod_remarks: vod.watchingCountDesc,
		});
	}
	return JSON.stringify({
		list: videos,
	});
}


function getRequestId() {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let requestId = '';
	for (let i = 0; i < 32; i++) {
		let randomIndex = Math.floor(Math.random() * chars.length);
		requestId += chars[randomIndex];
	}
	return requestId;
}

function getUUID() {
	const uuid = Math.random().toString(16).substring(2) + Date.now().toString(16);
	return uuid;
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