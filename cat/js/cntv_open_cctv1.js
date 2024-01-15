// 无搜索功能
import { _ } from "./lib/cat.js";
let key = 'CCTV1综合频道';
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
	{type_id: "TOPC1451528971114112", type_name: "新闻联播"},
	{type_id: "TOPC1451558976694518", type_name: "焦点访谈"},
	{type_id: "TOPC1451378757637200", type_name: "等着我"},
	{type_id: "TOPC1451528792881669", type_name: "晚间新闻"},
	{type_id: "TOPC1460958183626327", type_name: "经典咏流传"},
	{type_id: "TOPC1579169060379297", type_name: "挑战不可能"},
        {type_id: "TOPC1451464665008914", type_name: "今日说法"},
        {type_id: "TOPC1636516276237257", type_name: "故事里的中国"},
        {type_id: "TOPC1557892390700355", type_name: "时代楷模发布厅"},
        {type_id: "TOPC1451464884159276", type_name: "开讲啦"},
        {type_id: "TOPC1451525396109388", type_name: "我有传家宝"},
        {type_id: "TOPC1451378857272262", type_name: "第一动画乐园"},
        {type_id: "TOPC1451378967257534", type_name: "动物世界"},  
        {type_id: "TOPC1451525103989666", type_name: "人与自然" },  
        {type_id: "TOPC1650782829200997", type_name: "正大综艺" }, 
        {type_id: "TOPC1451466072378425", type_name: "人口" }, 
        {type_id: "TOPC1451379250581117", type_name: "国际艺苑"}, 
        {type_id: "TOPC1451526037568184", type_name: "生活提示"}, 
        {type_id: "TOPC1451525460925648", type_name: "中华民族"}, 
        {type_id: "TOPC1554187056533820", type_name: "秘境之眼"}, 
        {type_id: "TOPC1611740341987572", type_name: "典籍里的中国"}, 
        {type_id: "TOPC1460958183626327", type_name: "中国诗词大会"},
        {type_id: "TOPC1451546588784893",type_name: "生活圈"}
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
