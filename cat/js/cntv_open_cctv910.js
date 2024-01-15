// 无搜索功能
import { _ } from "./lib/cat.js";
let key = 'CCTV9纪录科教';
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
	{type_id: "TOPC1460958142363297", type_name: "纪录频道"},
	{type_id: "TOPC1571389841186799", type_name: "纪录频道·微9"},
	{type_id: "TOPC1451557052519584", type_name: "百家讲坛 "},
	{type_id: "TOPC1451557421544786", type_name: "地理·中国"},
        {type_id: "TOPC1451558150787467", type_name: "自然传奇"},
        {type_id: "TOPC1482483166133803", type_name: "味道"},
        {type_id: "TOPC1451557646802924", type_name: "健康之路"},
        {type_id: "TOPC1451557893544236", type_name: "探索·发现"},
        {type_id: "TOPC1576631973420833", type_name: "透视新科技"},
        {type_id: "TOPC1571021159595290", type_name: "实验现场"},
        {type_id: "TOPC1571021323137369", type_name: "科幻地带"},
        {type_id: "TOPC1571021385508957", type_name: "科学动物园"},
        {type_id: "TOPC1570874587435537", type_name: "时尚科技秀"},
        {type_id: "TOPC1570780618796536", type_name: "人物·故事"},
        {type_id: "TOPC1571021251454875", type_name: "考古公开课"},
        {type_id: "TOPC1575253587571324", type_name: "跟着书本去旅行"},
        {type_id: "TOPC1574995326079121", type_name: "百家说故事"},
        {type_id: "TOPC1451557523542854", type_name: "读书"},
        {type_id: "TOPC1570876640457386", type_name: "解码科技史"},
        {type_id: "TOPC1570875218228998", type_name: "创新进行时"},
        {type_id: "TOPC1592552941644815",type_name: "中国影像方志"}
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
