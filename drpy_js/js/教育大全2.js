/* 直播弹幕 -> vod_area:'bilidanmu'
目前只有皮皮虾大佬的DMBox, 支持弹幕
DMBox下载:https://t.me/pipixiawerun
设置 > 窗口预览 > 开启
*/

/* Cookie设置
Cookie改为预设获取蜂蜜大佬Github的
https://ghproxy.net/https://raw.githubusercontent.com/FongMi/CatVodSpider/main/txt/cookie.txt

Cookie获取方法
https://ghproxy.net/https://raw.githubusercontent.com/UndCover/PyramidStore/main/list.md

Cookie设置方法1: DR-PY 后台管理界面
CMS后台管理 > 设置中心 > 环境变量 > {"bili_cookie":"XXXXXXX","vmid":"XXXXXX"} > 保存

Cookie设置方法2: 手动替换Cookie
底下代码 headers的
"Cookie":"$bili_cookie"
手动替换为
"Cookie":"将获取的Cookie黏贴在这"
*/

var rule = {
    title:'我的哔哩',
    host:'https://api.bilibili.com',
    homeUrl:'/x/web-interface/search/type?search_type=video&keyword=小姐姐4K&page=1',
    url:'/x/web-interface/search/type?search_type=videofyfilter',
    class_name:'幼儿启蒙&人教版&沪教版&苏教版&北师大版',
    class_url:'幼儿启蒙&人教版&沪教版&苏教版&北师大版',
    filterable: 1,
    filter_url: '&keyword={{fl.tid}}&page=fypage&duration={{fl.duration}}&order={{fl.order}}',
    filter_def:
    {
        幼儿启蒙:{tid:'幼儿启蒙'},
        人教版:{tid:'人教版'},
        沪教版:{tid:'沪教版'},
        苏教版:{tid:'苏教版'},
        北师大版:{tid:'北师大版'}
            },
    filter: {
    	
    	"幼儿启蒙": [{"key": "tid","name": "分类","value": [{"n": "全部","v": "全部"},{"n":"儿童早教","v":"儿童早教"},{"n":"启蒙故事","v":"儿童启蒙故事"},{"n":"识字启蒙","v":"儿童识字启蒙"},{"n":"数学启蒙","v":"儿童数学启蒙"},{"n":"拼音启蒙","v":"儿童拼音启蒙"},{"n":"英语启蒙","v":"儿童英语启蒙"},{"n":"儿歌","v":"儿童歌曲"},{"n":"绘画","v":"儿童绘画"},{"n":"睡前故事","v":"睡前故事"},{"n":"动画","v":"儿童动画"},{"n":"儿童音乐","v":"儿童音乐"},{"n":"儿童安全教育","v":"儿童安全教育"},{"n":"贝瓦儿歌","v":"贝瓦儿歌"},{"n":"悟空识字","v":"悟空识字"},{"n":"宝宝巴士","v":"宝宝巴士"},{"n":"儿歌多多","v":"儿歌多多"},{"n":"学而思","v":"学而思"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}],
	 "人教版": [{"key": "tid","name": "分类","value": [{"n": "全部","v": "全部"},{"n":"一年级","v":"一年级人教版"},{"n":"二年级","v":"二年级人教版"},{"n":"三年级","v":"三年级人教版"},{"n":"四年级","v":"四年级人教版"},{"n":"五年级","v":"五年级人教版"},{"n":"六年级","v":"六年级人教版"},{"n":"初一年级","v":"初一人教版"},{"n":"初二年级","v":"初二人教版"},{"n":"初三年级","v":"初三人教版"},{"n":"高一年级","v":"高一人教版"},{"n":"高二年级","v":"高二人教版"},{"n":"高三年级","v":"高三人教版"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}],
	 "沪教版": [{"key": "tid","name": "分类","value": [{"n": "全部","v": "全部"},{"n":"一年级","v":"一年级沪教版"},{"n":"二年级","v":"二年级沪教版"},{"n":"三年级","v":"三年级沪教版"},{"n":"四年级","v":"四年级沪教版"},{"n":"五年级","v":"五年级沪教版"},{"n":"六年级","v":"六年级沪教版"},{"n":"初一年级","v":"初一沪教版"},{"n":"初二年级","v":"初二沪教版"},{"n":"初三年级","v":"初三沪教版"},{"n":"高一年级","v":"高一沪教版"},{"n":"高二年级","v":"高二沪教版"},{"n":"高三年级","v":"高三沪教版"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}],
	 "苏教版": [{"key": "tid","name": "分类","value": [{"n": "全部","v": "全部"},{"n":"一年级","v":"一年级苏教版"},{"n":"二年级","v":"二年级苏教版"},{"n":"三年级","v":"三年级苏教版"},{"n":"四年级","v":"四年级苏教版"},{"n":"五年级","v":"五年级苏教版"},{"n":"六年级","v":"六年级苏教版"},{"n":"初一年级","v":"初一苏教版"},{"n":"初二年级","v":"初二苏教版"},{"n":"初三年级","v":"初三苏教版"},{"n":"高一年级","v":"高一苏教版"},{"n":"高二年级","v":"高二苏教版"},{"n":"高三年级","v":"高三苏教版"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}],
	 "北师大版": [{"key": "tid","name": "分类","value": [{"n": "全部","v": "全部"},{"n":"一年级","v":"一年级北师大版"},{"n":"二年级","v":"二年级北师大版"},{"n":"三年级","v":"三年级北师大版"},{"n":"四年级","v":"四年级北师大版"},{"n":"五年级","v":"五年级北师大版"},{"n":"六年级","v":"六年级北师大版"},{"n":"初一年级","v":"初一北师大版"},{"n":"初二年级","v":"初二北师大版"},{"n":"初三年级","v":"初三北师大版"},{"n":"高一年级","v":"高一北师大版"},{"n":"高二年级","v":"高二北师大版"},{"n":"高三年级","v":"高三北师大版"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}]
     
	      },
    detailUrl:'/x/web-interface/view?aid=fyid',//二级详情拼接链接(json格式用)
    searchUrl:'/x/web-interface/search/type?search_type=video&keyword=**&page=fypage',
    searchable:2,
    quickSearch:0,
    headers:{
        "User-Agent":"PC_UA",
        "Referer": "https://www.bilibili.com",
        // "Cookie":"$bili_cookie"
        // "Cookie":"https://ghproxy.net/https://github.com/FongMi/CatVodSpider/raw/main/txt/cookie.txt"
        "Cookie":"http://127.0.0.1:9978/file/tvbox/bilicookie.txt"
    },
    timeout:5000,
    limit:8,
    play_parse:true,
    lazy:`js:
        let ids = input.split('_');
        let result = {};
        let iurl = 'https://api.bilibili.com:443/x/player/playurl?avid=' + ids[0] + '&cid=' + ids[1] + '&qn=116';
        let html = request(iurl);
        let jRoot = JSON.parse(html);
        let jo = jRoot.data;
        let ja = jo.durl;
        let maxSize = -1;
        let position = -1;
        ja.forEach(function(tmpJo, i) {
            if (maxSize < Number(tmpJo.size)) {
                maxSize = Number(tmpJo.size);
                position = i
            }
        });
        let purl = '';
        if (ja.length > 0) {
            if (position === -1) {
                position = 0
            }
            purl = ja[position].url
        }
        result.parse = 0;
        result.playUrl = '';
        result.url = unescape(purl);
        result.header = {
            'Referer': 'https://live.bilibili.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
        };
        result.contentType = 'video/x-flv';
        input = result
    `,
    double:false,
    推荐:'*',
    // 一级:'js:let html=request(input);let msg=JSON.parse(html).message;function title_rep(title){if(/keyword/.test(title)){title=title.replace(\'<em class="keyword">\',"").replace("</em>","").replace("&quot;","\'");log("名称替换👉"+title)};return title}if(msg!=="0"){VODS=[{vod_name:KEY+"➢"+msg,vod_id:"no_data",vod_remarks:"别点,缺少bili_cookie",vod_pic:"https://ghproxy.net/https://raw.githubusercontent.com/hjdhnx/dr_py/main/404.jpg"}]}else{let videos=[];let vodList=JSON.parse(html).data.result;vodList.forEach(function(vod){let aid=vod["aid"];let title=vod["title"].trim();title=title_rep(title);title=title_rep(title);title=title_rep(title);title=title_rep(title);let img="https:"+vod["pic"];let remark=vod["duration"];videos.push({vod_id:aid,vod_name:title,vod_pic:img,vod_remarks:remark})});VODS=videos}',
    一级:`js:
        let html = request(input);
        function stripHtmlTag(src) {
            return src.replace(/<\\/?[^>]+(>|$)/g, '').replace(/&.{1,5};/g, '').replace(/\\s{2,}/g, ' ');
        }
        function turnDHM(duration) {
            let min = duration.split(':')[0];
            let sec = duration.split(':')[1];
            if (min == 0) {
                return sec + '秒'
            } else if (0 < min && min < 60) {
                return min + '分'
            } else if (60 <= min && min < 1440) {
                if (min % 60 == 0) {
                    let h = min / 60;
                    return h + '小时'
                } else {
                    let h = min / 60;
                    h = (h + '').split('.')[0];
                    let m = min % 60;
                    return h + '小时' + m + '分';
                }
            } else if (min >= 1440) {
                let d = min / 60 / 24;
                d = (d + '').split('.')[0];
                let h = min / 60 % 24;
                h = (h + '').split('.')[0];
                let m = min % 60;
                let dhm = '';
                if (d > 0) {
                    dhm = d + '天'
                }
                if (h >= 1) {
                    dhm = dhm + h + '小时'
                }
                if (m > 0) {
                    dhm = dhm + m + '分'
                }
                return dhm
            }
            return null
        }
        let videos = [];
        let vodList = JSON.parse(html).data.result;
        vodList.forEach(function(vod) {
            let aid = vod.aid;
            let title = stripHtmlTag(vod.title);
            let img = 'https:' + vod.pic;
            let remark = turnDHM(vod.duration);
            videos.push({
                vod_id: aid,
                vod_name: title,
                vod_pic: img,
                vod_remarks: remark
            })
        });
        VODS = videos
    `,
    二级:`js:
        function stripHtmlTag(src) {
            return src.replace(/<\\/?[^>]+(>|$)/g, '').replace(/&.{1,5};/g, '').replace(/\\s{2,}/g, ' ');
        }
        let html = request(input);
        let jo = JSON.parse(html).data;
        let aid = jo.aid;
        let title = stripHtmlTag(jo.title);
        let pic = jo.pic;
        let desc = jo.desc;
        let year = jo.pubdate;
        let dire = jo.owner.name;
        let typeName = jo.tname;
        let remark = jo.duration;
        let vod = {
            vod_id: aid,
            vod_name: title,
            vod_pic: pic,
            type_name: typeName,
            vod_year: year,
            vod_area: 'bilidanmu',
            vod_remarks: remark,
            vod_tags: 'mv',
            vod_director: dire,
            vod_content: desc
        };
        let ja = jo.pages;
        let playurls = [];
        ja.forEach(function(tmpJo) {
            let cid = tmpJo.cid;
            let part = tmpJo.part.replace('#', '﹟').replace('$', '﹩');
            playurls.push(
                part + '$' + aid + '_' + cid
            )
        });
        let playUrl = playurls.join('#');
        vod.vod_play_from = 'B站';
        vod.vod_play_url = playUrl;
        VOD = vod;
    `,
    搜索:'*',
    // 预处理:'if(rule_fetch_params.headers.Cookie.startsWith("http")){rule_fetch_params.headers.Cookie=fetch(rule_fetch_params.headers.Cookie);setItem(RULE_CK,cookie)};log(rule_fetch_params.headers.Cookie)',
}