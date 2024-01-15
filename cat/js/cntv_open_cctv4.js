// 无搜索功能
import { _ } from "./lib/cat.js";
let key = 'CCTV4中文国际';
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
	{type_id: "TOPC1451542134053698", type_name: "走遍中国"},
	{type_id: "TOPC1571300682556971", type_name: "环球综艺秀"},
        {type_id: "TOPC1571034804976375", type_name: "美食中国"},
        {type_id: "TOPC1451540709098112", type_name: "深度国际"},
        {type_id: "TOPC1451539894330405", type_name: "中国新闻"},
        {type_id: "TOPC1451540389082713", type_name: "今日关注"},
        {type_id: "TOPC1451541432396114", type_name: "中国文艺"},
        {type_id: "TOPC1451540448405749", type_name: "今日亚洲"},
        {type_id: "TOPC1451540328102649", type_name: "海峡两岸"},
        {type_id: "TOPC1451541349400938", type_name: "远方的家"},
        {type_id: "TOPC1458109953138295", type_name: "中国舆论场"},
        {type_id: "TOPC1473235107169415", type_name: "国家记忆"},
        {type_id: "TOPC1670828908956975", type_name: "记住乡愁"},
        {type_id: "TOPC1571034869935436", type_name: "国宝·发现"},
        {type_id: "TOPC1571034705435323", type_name: "今日环球"},
        {type_id: "TOPC1571646754621556", type_name: "华人故事"},
        {type_id: "TOPC1571646819318596", type_name: "中国缘"},
        {type_id: "TOPC1609904361007481", type_name: "鲁健访谈"},
        {type_id: "TOPC1451541666791291",type_name: "中华医药"}
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
