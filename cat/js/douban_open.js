import {
    Crypto, load, _
}
from 'assets://js/lib/cat.js';

let key = '豆瓣电影';
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
        'type_id': '/cinema/nowplaying/@nowplaying',
        'type_name': '正在热映'
    }, {
        'type_id': '/cinema/nowplaying/@upcoming',
        'type_name': '即将上映'
    }, {
        'type_id': '@movie',
        'type_name': '热门电影'
    }, {
        'type_id': '@tv',
        'type_name': '热门电视剧'
    }];
    let filterObj = {};

    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
	let flag = tid.split('@')[1];
	const link = "https://movie.douban.com" + tid.split('@')[0];
	const html = await request(link);
	const $ = load(html);
	let items,$item,videos;
	switch(flag){
		case 'nowplaying':
			items = $('div#nowplaying > div > ul > li');
			videos = _.map(items, (item) => {
				$item = $(item);
				return {
				    vod_id: $item.find('ul > li.stitle > a').attr('href'),
				    vod_name: $item.find('ul > li.stitle > a').attr('title'),
				    vod_pic: $item.find('ul > li.poster > a > img').attr('src'),
				    vod_remarks: $item.find('ul > li.srating > span.subject-rate').text() || $item.find('ul > li.srating > span.text-tip').text(),
				};
			});
			break;
		case 'upcoming':
			items = $('div#upcoming > div > ul > li');
			videos = _.map(items, (item) => {
				$item = $(item);
				return {
				    vod_id: $item.find('ul > li.stitle > a').attr('href'),
				    vod_name: $item.find('ul > li.stitle > a').attr('title'),
				    vod_pic: $item.find('ul > li.poster > a > img').attr('src'),
				    vod_remarks: $item.find('ul > li.srating > span.release-date').text(),
				};
			});
			break;
		default:
			let url = 'https://movie.douban.com/j/search_subjects?type=' + flag + '&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0';
			let subjects = JSON.parse(await request(url)).subjects;
			videos = _.map(subjects, (subject) => {
			    return {
			        vod_id: subject.url,
			        vod_name: subject.title,
			        vod_pic: subject.cover,
			        vod_remarks: subject.rate,
			    };
			});
	}

	
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: 0,
        limit: 0,
        total: 0,
        list: videos,
    });
}


async function detail(id) {
		let html = await request(id);
		let $ = load(html);
		let json = $("script[type='application/ld+json']").text();
		let v = JSON.parse(json.replaceAll('@',''));
		let directors = [];
		_.map(v.director, (director) => {
					directors.push(director.name.split(' ')[0]);
				});
		const director = directors.join('/');
		
		let actors = [];
		_.map(v.actor, (actor) => {
					actors.push(actor.name.split(' ')[0]);
				});
		const actor = actors.join('/');
		const vod = {
		    vod_id: id,
		    vod_name: v.name,
		    vod_pic: v.image,
		    vod_remarks: '',
			vod_director: director,
			vod_actor: actor,
			vod_year: v.datePublished,
		    vod_content: '[关注公众号:影视资源站]  ' + v.description,
		};
		
		console.debug(vod);
		let trailer = $("a.related-pic-video").attr("href").replace('#content','');
		if(trailer.length === 0){
			vod.vod_play_from = '暂无预告片';
			vod.vod_play_url = '无预告片$https://boot-video.xuexi.cn/video/1006/p/423728851d9dd3838079f59c0d994ddc-ffd3ac9ba2a349848733c6f31bb0802c-2.mp4';
		}else{
			const playMap = {};
			html = await request(trailer);
			$ = load(html);
			const playlists = $('ul.video-list-col > li');
			playMap['预告片'] = [];
			_.each(playlists, (playlist) => {
				const $playlist = $(playlist);
				const title = $playlist.find('a.pr-video > strong').text();
				const playUrl = $playlist.find('a.pr-video').attr('href');
				playMap['预告片'].push(title + '$' + playUrl.replace('#content',''));
			});
			vod.vod_play_from = _.keys(playMap).join('$$$');
			const urls = _.values(playMap);
			const vod_play_url = _.map(urls, (urlist) => {
			    return urlist.join('#');
			});
			vod.vod_play_url = vod_play_url.join('$$$');
		}
	
    return JSON.stringify({
        list: [vod],
    });
}

async function play(flag, id, flags) {
	let playUrl;
	if(id.endsWith('.mp4')){
		playUrl = id;
	}else{
		const html = await request(id);
		const $ = load(html);
		let json = $("script[type='application/ld+json']").text();
		let v = JSON.parse(json.replaceAll('@',''));
		playUrl = v.embedUrl;
	}
    return JSON.stringify({
        parse: 0,
        url: playUrl,
        header: {
            'User-Agent': UA,
        },
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
    };
}