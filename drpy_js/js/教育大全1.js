/* 直播弹幕 -> vod_area:'bilidanmu'
目前只有皮皮虾大佬的DMBox, 支持弹幕
DMBox下载:https://t.me/pipixiawerun
设置 > 窗口预览 > 开启
*/

/* Cookie设置
Cookie改为预设获取蜂蜜大佬Github的
https://github.com/FongMi/CatVodSpider/raw/main/txt/cookie.txt

Cookie获取方法
https://github.com/UndCover/PyramidStore/blob/main/list.md#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9

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
    class_name:'幼儿教育&小学教育&初中教育&高中教育',
    class_url:'幼儿教育&小学教育&初中教育&高中教育',
    filterable: 1,
    filter_url: '&keyword={{fl.tid}}&page=fypage&duration={{fl.duration}}&order={{fl.order}}',
    filter_def:{
        幼儿教育:{tid:'幼儿教育'},
        小学教育:{tid:'小学教育'},
        初中教育:{tid:'初中教育'},
        高中教育:{tid:'高中教育'}

    },
    filter: {
    
    "幼儿教育":[
{"key":"order","name":"排序","value":[
{"n":"综合排序","v":"0"},
{"n":"最多点击","v":"click"},
{"n":"最新发布","v":"pubdate"},
{"n":"最多弹幕","v":"dm"},
{"n":"最多收藏","v":"stow"}
]
},
{"key":"tid","name":"分类","value":[
{"n":"全部","v":"幼儿教育"},
{"n":"教育","v":"儿童教育"},
{"n":"歌曲","v":"儿童歌曲"},
{"n":"舞蹈","v":"儿童舞蹈"},
{"n":"成语故事","v":"儿童成语故事"},
{"n":"音乐","v":"儿童音乐"},
{"n":"儿童MV","v":"儿童MV"},
{"n":"贝乐虎","v":"贝乐虎"},
{"n":"宝宝巴士","v":"宝宝巴士"},
{"n":"儿童好声音","v":"儿童好声音"}
]
},
{"key":"duration","name":"时长","value":[
{"n":"全部","v":"0"},
{"n":"60分钟以上","v":"4"},
{"n":"30~60分钟","v":"3"},
{"n":"10~30分钟","v":"2"},
{"n":"10分钟以下","v":"1"}]}],


           "小学教育":[
{"key":"order","name":"排序","value":[
{"n":"综合排序","v":"0"},
{"n":"最多点击","v":"click"},
{"n":"最新发布","v":"pubdate"},
{"n":"最多弹幕","v":"dm"},
{"n":"最多收藏","v":"stow"}
]
},
{"key":"tid","name":"分类","value":[
{"n":"全部","v":"小学教育"},
{"n":"1年级语文","v":"1年级语文"},
{"n":"1年级数学","v":"1年级数学"},
{"n":"1年级英语","v":"1年级英语"},
{"n":"2年级语文","v":"2年级语文"},
{"n":"2年级数学","v":"2年级数学"},
{"n":"2年级英语","v":"2年级英语"},
{"n":"3年级语文","v":"3年级语文"},
{"n":"3年级数学","v":"3年级数学"},
{"n":"3年级英语","v":"3年级英语"},
{"n":"4年级语文","v":"4年级语文"},
{"n":"4年级数学","v":"4年级数学"},
{"n":"4年级英语","v":"4年级英语"},
{"n":"5年级语文","v":"5年级语文"},
{"n":"5年级数学","v":"5年级数学"},
{"n":"5年级英语","v":"5年级英语"},
{"n":"6年级语文","v":"6年级语文"},
{"n":"6年级数学","v":"6年级数学"},
{"n":"6年级英语","v":"6年级英语"},
{"n":"小学信息技术","v":"小学信息技术"}
]
},
{"key":"duration","name":"时长","value":[
{"n":"全部","v":"0"},
{"n":"60分钟以上","v":"4"},
{"n":"30~60分钟","v":"3"},
{"n":"10~30分钟","v":"2"},
{"n":"10分钟以下","v":"1"}]}],


           "初中教育":[
{"key":"order","name":"排序","value":[
{"n":"综合排序","v":"0"},
{"n":"最多点击","v":"click"},
{"n":"最新发布","v":"pubdate"},
{"n":"最多弹幕","v":"dm"},
{"n":"最多收藏","v":"stow"}
]
},
{"key":"tid","name":"分类","value":[
{"n":"全部","v":"初中教育"},
{"n":"初一语文","v":"初一语文"},
{"n":"初一数学","v":"初一数学"},
{"n":"初一英语","v":"初一英语"},
{"n":"初一物理","v":"初一物理"},
{"n":"初一化学","v":"初一化学"},
{"n":"初一生物","v":"初一生物"},
{"n":"初一政治","v":"初一政治"},
{"n":"初一历史","v":"初一历史"},
{"n":"初一地理","v":"初一地理"},
{"n":"初二语文","v":"初二语文"},
{"n":"初二数学","v":"初二数学"},
{"n":"初二英语","v":"初二英语"},
{"n":"初二物理","v":"初二物理"},
{"n":"初二化学","v":"初二化学"},
{"n":"初二生物","v":"初二生物"},
{"n":"初二政治","v":"初二政治"},
{"n":"初二历史","v":"初二历史"},
{"n":"初二地理","v":"初二地理"},
{"n":"初三语文","v":"初三语文"},
{"n":"初三数学","v":"初三数学"},
{"n":"初三英语","v":"初三英语"},
{"n":"初三物理","v":"初三物理"},
{"n":"初三化学","v":"初三化学"},
{"n":"初三生物","v":"初三生物"},
{"n":"初三政治","v":"初三政治"},
{"n":"初三历史","v":"初三历史"},
{"n":"初三地理","v":"初三地理"},
{"n":"初中信息技术","v":"初中信息技术"}
]
},
{"key":"duration","name":"时长","value":[
{"n":"全部","v":"0"},
{"n":"60分钟以上","v":"4"},
{"n":"30~60分钟","v":"3"},
{"n":"10~30分钟","v":"2"},
{"n":"10分钟以下","v":"1"}]}],



           "高中教育":[
{"key":"order","name":"排序","value":[
{"n":"综合排序","v":"0"},
{"n":"最多点击","v":"click"},
{"n":"最新发布","v":"pubdate"},
{"n":"最多弹幕","v":"dm"},
{"n":"最多收藏","v":"stow"}
]
},
{"key":"tid","name":"分类","value":[
{"n":"全部","v":"高中教育"},
{"n":"高一语文","v":"高一语文"},
{"n":"高一数学","v":"高一数学"},
{"n":"高一英语","v":"高一英语"},
{"n":"高一物理","v":"高一物理"},
{"n":"高一化学","v":"高一化学"},
{"n":"高一生物","v":"高一生物"},
{"n":"高一政治","v":"高一政治"},
{"n":"高一历史","v":"高一历史"},
{"n":"高一地理","v":"高一地理"},
{"n":"高二语文","v":"高二语文"},
{"n":"高二数学","v":"高二数学"},
{"n":"高二英语","v":"高二英语"},
{"n":"高二物理","v":"高二物理"},
{"n":"高二化学","v":"高二化学"},
{"n":"高二生物","v":"高二生物"},
{"n":"高二政治","v":"高二政治"},
{"n":"高二历史","v":"高二历史"},
{"n":"高二地理","v":"高二地理"},
{"n":"高三语文","v":"高三语文"},
{"n":"高三数学","v":"高三数学"},
{"n":"高三英语","v":"高三英语"},
{"n":"高三物理","v":"高三物理"},
{"n":"高三化学","v":"高三化学"},
{"n":"高三生物","v":"高三生物"},
{"n":"高三政治","v":"高三政治"},
{"n":"高三历史","v":"高三历史"},
{"n":"高三地理","v":"高三地理"},
{"n":"高中信息技术","v":"高中信息技术"}
]
},
{"key":"duration","name":"时长","value":[
{"n":"全部","v":"0"},
{"n":"60分钟以上","v":"4"},
{"n":"30~60分钟","v":"3"},
{"n":"10~30分钟","v":"2"},
{"n":"10分钟以下","v":"1"}]}]
    },
    detailUrl:'/x/web-interface/view?aid=fyid',//二级详情拼接链接(json格式用)
    searchUrl:'/x/web-interface/search/type?search_type=video&keyword=**&page=1',
    searchable:2,
    quickSearch:0,
    headers:{
        "User-Agent":"PC_UA",
        "Referer": "https://www.bilibili.com",
        //"Cookie":"$bili_cookie"
        "Cookie":"http://127.0.0.1:9978/file/tvbox/bilicookie.txt"
    },
    timeout:5000,
    limit:8,
    play_parse:true,
    lazy:"js:let ids=input.split('_');let result={};let iurl='https://api.bilibili.com:443/x/player/playurl?avid='+ids[0]+'&cid='+ids[1]+'&qn=116';let html=request(iurl);let jRoot=JSON.parse(html);let jo=jRoot['data'];let ja=jo['durl'];let maxSize=-1;let position=-1;ja.forEach(function(tmpJo,i){if(maxSize<Number(tmpJo['size'])){maxSize=Number(tmpJo['size']);position=i}});let purl='';if(ja.length>0){if(position===-1){position=0}purl=ja[position]['url']}result['parse']=0;result['playUrl']='';result['url']=unescape(purl);result['header']={Referer:'https://live.bilibili.com','User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'};result['contentType']='video/x-flv';input=result",
    double:false,
    推荐:'*',
    // 一级:'js:let html=request(input);let msg=JSON.parse(html).message;function title_rep(title){if(/keyword/.test(title)){title=title.replace(\'<em class="keyword">\',"").replace("</em>","").replace("&quot;","\'");log("名称替换👉"+title)};return title}if(msg!=="0"){VODS=[{vod_name:KEY+"➢"+msg,vod_id:"no_data",vod_remarks:"别点,缺少bili_cookie",vod_pic:"https://ghproxy.com/https://raw.githubusercontent.com/hjdhnx/dr_py/main/404.jpg"}]}else{let videos=[];let vodList=JSON.parse(html).data.result;vodList.forEach(function(vod){let aid=vod["aid"];let title=vod["title"].trim();title=title_rep(title);title=title_rep(title);title=title_rep(title);title=title_rep(title);let img="https:"+vod["pic"];let remark=vod["duration"];videos.push({vod_id:aid,vod_name:title,vod_pic:img,vod_remarks:remark})});VODS=videos}',
    一级:'js:let html=request(input);function title_rep(title){if(/keyword/.test(title)){title=title.replace(\'<em class="keyword">\',"").replace("</em>","");log("名称替换👉"+title)};return title}function turnDHM(duration){let min=duration.split(":")[0];let sec=duration.split(":")[1];if(min==0){return sec+"秒"}else if(0<min&&min<60){return min+"分"}else if(60<=min&&min<1440){if(min%60==0){let h=min/60;return h+"小时"}else{let h=min/60;h=(h+"").split(".")[0];let m=min%60;return h+"小时"+m+"分"}}else if(min>=1440){let d=min/60/24;d=(d+"").split(".")[0];let h=min/60%24;h=(h+"").split(".")[0];let m=min%60;let dhm="";if(d>0){dhm=d+"天"}if(h>=1){dhm=dhm+h+"小时"}if(m>0){dhm=dhm+m+"分"}return dhm}return null}let videos=[];let vodList=JSON.parse(html).data.result;vodList.forEach(function(vod){let aid=vod["aid"];let title=vod["title"].trim().replace("&quot;","\'");title=title_rep(title);title=title_rep(title);title=title_rep(title);let img="https:"+vod["pic"];let remark=turnDHM(vod["duration"]);videos.push({vod_id:aid,vod_name:title,vod_pic:img,vod_remarks:remark})});VODS=videos',
    二级:'js:let html=request(input);let jo=JSON.parse(html).data;let aid=jo["aid"];let title=jo["title"].replace(\'<em class="keyword">\',"").replace("</em>","");let pic=jo["pic"];let desc=jo["desc"];let year=jo["pubdate"];let dire=jo["owner"]["name"];let typeName=jo["tname"];let remark=jo["duration"];let vod={vod_id:aid,vod_name:title,vod_pic:pic,type_name:typeName,vod_year:year,vod_area:"bilidanmu",vod_remarks:remark,vod_tags:"mv",vod_director:dire,vod_content:desc};let ja=jo["pages"];let playurls=[];ja.forEach(function(tmpJo){let cid=tmpJo["cid"];let part=tmpJo["part"].replace("#","﹟").replace("$","﹩");playurls.push(part+"$"+aid+"_"+cid)});let playUrl=playurls.join("#");vod["vod_play_from"]="B站";vod["vod_play_url"]=playUrl;VOD=vod;',
    搜索:'*',
    预处理:'if(rule_fetch_params.headers.Cookie.startsWith("http")){rule_fetch_params.headers.Cookie=fetch(rule_fetch_params.headers.Cookie);setItem(RULE_CK,cookie)};log(rule_fetch_params.headers.Cookie)',
}