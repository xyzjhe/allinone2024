// 无搜索功能
import { _ } from "./lib/cat.js";
let key = 'CCTV新闻频道';
let HOST = 'http://api.cntv.cn';
let siteKey = '';
let siteType = 0;
const MOBILE_UA = 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36';

async function request(reqUrl, agentSp) {
	let res = await req(reqUrl, {
		method: 'get',
		headers: {
			'User-Agent': agentSp || MOBILE_UA,
		},
	});
	return res.content
}

async function init(cfg) {
	siteKey = cfg.skey;
	siteType = cfg.stype
}

async function home(filter) {
	const classes = [
	{type_id: "TOPC1451530382483536", type_name: "对话"},
	{type_id: "TOPC1451533652476962", type_name: "经济半小时"},
	{type_id: "TOPC1451533782742171", type_name: "经济信息联播"},
	{type_id: "TOPC1451530259915198", type_name: "第一时间"},
	{type_id: "TOPC1451534775834896", type_name: "消费主张"},
	{type_id: "TOPC1672292475106944", type_name: "欢乐大猜想"},
       {type_id: "TOPC1451529684665516", type_name: "创业英雄汇"},
       {type_id: "TOPC1451534118159896", type_name: "生财有道"},
       {type_id: "TOPC1467078494968390", type_name: "职场健康课"},
       {type_id: "TOPC1451538759798817", type_name: "一锤定音"},
       {type_id: "TOPC1451532939300997", type_name: "回家吃饭"},
       {type_id: "TOPC1451538686034772", type_name: "央视财经评论"},
       {type_id: "TOPC1514182710380601", type_name: "中国经济大讲堂"},
       {type_id: "TOPC1453100395512779", type_name: "正点财经"},
       {type_id: "TOPC1451531385787654", type_name: "天下财经"},
       {type_id: "TOPC1593419181674791", type_name: "生活家"},
       {type_id: "TOPC1499160712571517",type_name: "魅力中国城"}

];
	const filterObj = {};
	return JSON.stringify({
		class: _.map(classes, (cls) => {
			cls.land = 1;
			cls.ratio = 1.78;
			return cls;
		}),
		filters: filterObj,
	})
}

async function homeVod() {
	const data = JSON.parse(await request(HOST + '/NewVideo/getVideoListByColumn?id=TOPC1451558856402351&n=10&sort=desc&p=1&mode=0&serviceId=tvcctv'));
	let videos = _.map(data.data.list, (it) => {
		return {
			vod_id: it.guid,
			vod_name: it.title,
			vod_pic: it.image,
			vod_remarks: it.time || '',
		}
	});
	return JSON.stringify({
		list: videos,
	})
}

async function category(tid, pg, filter, extend) {
	if (pg <= 0 || typeof pg == 'undefined') pg = 1;
	const data = JSON.parse(await request(HOST + '/NewVideo/getVideoListByColumn?id=' + tid + '&n=10&sort=desc&p=' + pg + '&mode=0&serviceId=tvcctv'));
	let videos = _.map(data.data.list, (it) => {
		return {
			vod_id: it.guid,
			vod_name: it.title,
			vod_pic: it.image,
			vod_remarks: it.time || '',
		}
	});
	const pgChk = JSON.parse(await request(HOST + '/NewVideo/getVideoListByColumn?id=' + tid + '&n=10&sort=desc&p=' + (parseInt(pg) + 1) + '&mode=0&serviceId=tvcctv')).data.list;
	const pgCount = pgChk.length > 0 ? parseInt(pg) + 1 : parseInt(pg);
	return JSON.stringify({
		page: parseInt(pg),
		pagecount: parseInt(pgCount),
		limit: 10,
		total: parseInt(data.total),
		list: videos,
	})
}

async function detail(id) {
	const vod = {
		vod_id: id,
		vod_remarks: '',
	};
	const playlist = ['点击播放' + '$' + 'https://hls.cntv.myhwcdn.cn/asp/hls/2000/0303000a/3/default/' + id + '/2000.m3u8'];
	vod.vod_play_from = key;
	vod.vod_play_url = playlist.join('#');
	return JSON.stringify({
		list: [vod],
	});
}

async function play(flag, id, flags) {
	// console.debug('视聚场 id =====>' + id); // js_debug.log
	return JSON.stringify({
		parse: 0,
		url: id,
	})
}

async function search(wd, quick, pg) {
	return '{}'
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
	}
}
