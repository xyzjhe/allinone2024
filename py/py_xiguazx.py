#coding=utf-8
#!/usr/bin/python
import sys
sys.path.append('..') 
from base.spider import Spider
import json
import re
from urllib import request, parse
import urllib
import urllib.request

class Spider(Spider):  # 元类 默认的元类 type
	def getName(self):
		return "西瓜影视"#此网站的大部分资源都是盗的那几个正规视频网站的资源
	def init(self,extend=""):
		print("============{0}============".format(extend))
		pass
	def isVideoFormat(self,url):
		pass
	def manualVideoCheck(self):
		pass
	def homeContent(self,filter):
		result = {}
		cateManual = {
			"电影片库": "20",
			"连续剧片库": "37",
			"动漫片库": "43",
			"综艺片库": "45",
			"B站片库": "47"
		}
		classes = []
		for k in cateManual:
			classes.append({
				'type_name':k,
				'type_id':cateManual[k]
			})
		result['class'] = classes
		if(filter):
			result['filters'] = self.config['filter']
		return result
	def homeVideoContent(self):
		htmlTxt=self.webReadFile(urlStr='http://www.xiguazx.com/',header=self.header)
		videos=self.get_list(html=htmlTxt,patternTxt=r'<div class="module-item-pic">\s*\n*\s*<a href="(?P<url>.+?)" title="(?P<title>.+?)" >\s*\n*\s*<i class="icon-play"></i>\s*\n*\s*</a>\s*\n*\s*<img class="lazy lazyloaded"\s*\n*\s*data-src="(?P<img>.+?)"')
		result = {
			'list':videos
		}
		return result
	def categoryContent(self,tid,pg,filter,extend):
		result = {}
		videos=[]
		types=tid
		letter=''#字母='/letter/'+extend['captions']
		# if 'cat' in extend.keys():
		# 	types=extend['cat']
		# if 'letter' in extend.keys():
		# 	types='/letter/'+extend['letter']
		
		url='http://www.xiguazx.com/index.php/vod/show/id/{0}{2}/page/{1}.html'.format(types,pg,letter)
		    #http://www.xiguazx.com/index.php/vod/show/id/20/page/2.html
		    #http://www.xiguazx.com/index.php/vod/show/id/guoyu/page/20.html

		htmlTxt=self.webReadFile(urlStr=url,header=self.header)
		
		videos=self.get_list(html=htmlTxt,patternTxt=r'<div class="module-item-pic">\s*\n*\s*<a href="(?P<url>.+?)" title="(?P<title>.+?)" >\s*\n*\s*<i class="icon-play"></i>\s*\n*\s*</a>\s*\n*\s*<img class="lazy lazyloaded"\s*\n*\s*data-src="(?P<img>.+?)"')
		
		listCount=len(videos)
		pagecount=self.custom_RegexGetText(Text=htmlTxt,RegexText=r'<a href="/index.php/vod/show/id/'+types+'/page/(\d+?)\.html" class="page-number page-next display" title="尾页">尾页</a>',Index=1)
		# print(pagecount)
		if pagecount=='':
			pagecount=999
		result['list'] = videos
		result['page'] = pg
		result['pagecount'] =pg if listCount<1 else int(pagecount)
		result['limit'] = listCount
		result['total'] = 99999
		return result

	def detailContent(self,array):		
		result = {}
		aid = array[0].split('###')
		title = aid[0]#片名
		urlId = ''+aid[1]#URL
		logo = aid[2]#封面
		year=''#年份
		area=''
		actor=''
		director=''
		content=''
		vodItems=[]
		typeName=''
		vod_play_from=[]#线路
		vod_play_url=[]#剧集

		htmlTxt=self.webReadFile(urlStr=urlId,header=self.header)
		vod_play_from=self.get_RegexGetTextLine(Text=htmlTxt,RegexText=r'<a class="titleName cr3 swiper-slide active">(.+?)</a>',Index=1)
		print(vod_play_from)
		if len(vod_play_from)<1:
			return  {'list': []}
		circuit=self.custom_lineList(Txt=htmlTxt,mark=r'<ul class="content_playlist flex wrap">',after='</ul>')
		#print(circuit)
		for v in circuit:
			vodItems = self.get_EpisodesList(html=v,RegexText='<li><a class="btn" href="(?P<url>.+?)">(?P<title>.+?)</a></li>')
			joinStr = "#".join(vodItems)
			vod_play_url.append(joinStr)
			#print(vod_play_url)
		
		temporary=self.get_RegexGetTextLine(Text=htmlTxt,RegexText=r'<a href="/index.php/vod/search/class/.+?.html" target="_blank">(.+?)</a>',Index=1)
		typeName= "/".join(temporary)
		year=self.custom_RegexGetText(Text=htmlTxt,RegexText=r'<a href="/index.php/vod/search/year/.+?.html" target="_blank">(.+?)</a>',Index=1)
		area=''
		temporary=self.get_RegexGetTextLine(Text=htmlTxt,RegexText=r'<a href="/index.php/vod/search/actor/.+?.html" target="_blank">(.+?)</a>',Index=1)
		actor="/".join(temporary)
		temporary=self.get_RegexGetTextLine(Text=htmlTxt,RegexText=r'<a href="/index.php/vod/search/director/.+?.html" target="_blank">(.+?)</a>',Index=1)
		director="/".join(temporary)
		content=self.custom_RegexGetText(Text=htmlTxt,RegexText=r'<div class="summary detailsTxt">(.+?)<',Index=1)
		vod = {
			"vod_id":array[0],
			"vod_name":title,
			"vod_pic":logo,
			"type_name":typeName,
			"vod_year":self.removeHtml(txt=year),
			"vod_area":self.removeHtml(txt=area),
			"vod_remarks":"",
			"vod_actor":self.removeHtml(txt=actor),
			"vod_director":self.removeHtml(txt=director),
			"vod_content":self.removeHtml(txt=content)
		}
		vod['vod_play_from'] =  "$$$".join(vod_play_from)
		vod['vod_play_url'] = "$$$".join(vod_play_url)
		result = {
			'list':[
				vod
			]
		}
		return result
	
	
	def searchContent(self,key,quick):
		url='http://www.xiguazx.com/index.php/vod/search.html?wd='+urllib.parse.quote(key)
		htmlTxt=self.webReadFile(urlStr=url,header=self.header)
		videos = self.custom_list_search(html=htmlTxt)
		result = {
			'list':videos
		}
		return result
	
	def playerContent(self,flag,id,vipFlags):
		result={}
		parse=1
		jx=1
		url=id
		htmlTxt=self.webReadFile(urlStr=url,header=self.header)
		temporary=self.custom_lineList(Txt=htmlTxt,mark=r'var player_aaaa=',after='</script>')
		if len(temporary)>0:
			jRoot=json.loads(temporary[0][16:])
			url=jRoot['url']
			if len(url)<5:
				url=id
		jx=self.ifJx(url=url)
		result["parse"] = parse#1=嗅探,0=播放
		result["playUrl"] = ''
		result["url"] = url
		result['jx'] = jx#1=VIP解析,0=不解析
		result["header"] = ''	
		return result
	def localProxy(self,param):
		pass
	config = {
		"player": {},
		"filter": {
		"20":[
		{"key":"cat","name":"类型","value":[{"n":"全部","v":"20"},{"n":"动作片","v":"56"},{"n":"喜剧片","v":"57"},{"n":"爱情片","v":"58"},{"n":"科幻片","v":"59"},{"n":"剧情片","v":"61"},{"n":"战争片","v":"62"},{"n":"惊悚片","v":"63"},{"n":"犯罪片","v":"64"},{"n":"冒险片","v":"65"},{"n":"动画片","v":"66"},{"n":"悬疑片","v":"67"},{"n":"武侠片","v":"68"},{"n":"奇幻片","v":"69"},{"n":"记录片","v":"70"},{"n":"其它片","v":"71"}]},
		{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"C","v":"C"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]}
		],
		"72":[
		{"key":"cat","name":"类型","value":[{"n":"全部","v":"72"},{"n":"国产剧","v":"73"},{"n":"港台剧","v":"74"},{"n":"欧美剧","v":"75"},{"n":"日韩剧","v":"76"},{"n":"其他剧","v":"77"}]},
		{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"C","v":"C"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]}
		],
		"78":[
		{"key":"cat","name":"类型","value":[{"n":"全部","v":"78"},{"n":"动漫","v":"79"}]},
		{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"C","v":"C"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]}
		],
		"80":[
		{"key":"cat","name":"类型","value":[{"n":"全部","v":"80"},{"n":"综艺","v":"81"}]},
		{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"C","v":"C"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]}
		],
		"82":[
		{"key":"cat","name":"类型","value":[{"n":"全部","v":"82"},{"n":"番剧(B站)","v":"83"},{"n":"国创(B站)","v":"84"},{"n":"电影(B站)","v":"85"},{"n":"电视剧(B站)","v":"86"}]},
		{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"C","v":"C"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]}
		]
		}
		}
	header = {
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36",
		"Host": "www.xiguazx.com",
		"Referer": "http://www.xiguazx.com/"
	}
	#-----------------------------------------------自定义函数-----------------------------------------------
	#访问网页
	def webReadFile(self,urlStr,header):
		html=''
		req=urllib.request.Request(url=urlStr,headers=header)#,headers=header
		with  urllib.request.urlopen(req)  as response:
			html = response.read().decode('utf-8')
		return html
	#正则取文本
	def custom_RegexGetText(self,Text,RegexText,Index):
		returnTxt=""
		Regex=re.search(RegexText, Text, re.M|re.S)
		if Regex is None:
			returnTxt=""
		else:
			returnTxt=Regex.group(Index)
		return returnTxt
	#取集数
	def get_EpisodesList(self,html,RegexText):
		ListRe=re.finditer(RegexText, html, re.M|re.S)
		videos = []
		head="http://www.xiguazx.com"
		for vod in ListRe:
			url = vod.group('url')
			title =vod.group('title')
			if len(url) == 0:
				continue
			videos.append(self.removeHtml(txt=title)+"$"+head+url)
			#print(title)
		return videos
	#取剧集区
	def custom_lineList(self,Txt,mark,after):
		circuit=[]
		origin=Txt.find(mark)
		while origin>8:
			end=Txt.find(after,origin)
			circuit.append(Txt[origin:end])
			origin=Txt.find(mark,end)
		return circuit	
	#正则取文本,返回数组	
	def get_RegexGetTextLine(self,Text,RegexText,Index):
		returnTxt=[]
		pattern = re.compile(RegexText, re.M|re.S)
		ListRe=pattern.findall(Text)
		if len(ListRe)<1:
			return returnTxt
		for value in ListRe:
			returnTxt.append(value)	
		return returnTxt
	#分类取结果
	def get_list(self,html,patternTxt):
		videos = []
		head="http://www.xiguazx.com"
		temporaryList=self.custom_lineList(Txt=html,mark='<a target="_top"',after='</a>')
		# print(temporaryList[0])
		# return videos
		for vod in temporaryList:
			img=self.custom_RegexGetText(Text=vod,RegexText=r"url\('(.+?)'\)",Index=1)
			title=self.custom_RegexGetText(Text=vod,RegexText=r'title=".+?">(.+?)</div>',Index=1)
			url=self.custom_RegexGetText(Text=vod,RegexText=r"href='(.+?)'",Index=1)
			renew=self.custom_RegexGetText(Text=vod,RegexText=r'<a href="/vodsearch/-------------(\d{4}).html" target="_blank">\1</a>',Index=1)

			if title=='' or url=='':
				continue
			
			if len(img)<5:
				img='https://agit.ai/lanhaidixingren/Tvbox/raw/branch/master/CoverError.png'
			videos.append({
					"vod_id":"{0}###{1}###{2}".format(title,head+url,img),
					"vod_name":title,
					"vod_pic":img,
					"vod_remarks":renew
				})
		res = [i for n, i in enumerate(videos) if i not in videos[:n]]
		videos = res
		return videos
	#删除html标签
	def removeHtml(self,txt):
		soup = re.compile(r'<[^>]+>',re.S)
		txt =soup.sub('', txt)
		return txt.replace("&nbsp;"," ")
	#是否是vip解析
	def ifJx(self,url):
		Isjiexi=0
		RegexTxt=r'(youku.com|v.qq|bilibili|iqiyi.com|tv.cctv|c(c|n)tv|v.pptv|mgtv.com)'
		if self.custom_RegexGetText(Text=url,RegexText=RegexTxt,Index=1)!='':
			Isjiexi=1
		return Isjiexi
	def custom_list_search(self,html):
		videos = []
		head="http://www.xiguazx.com"
		temporaryList=self.custom_lineList(Txt=html,mark='<div class="vod-search-list">',after=' <div class="movie-rating cor4">')
		for vod in temporaryList:
			img=self.custom_RegexGetText(Text=vod,RegexText=r'data-original="(.+?)"',Index=1)
			title=self.custom_RegexGetText(Text=vod,RegexText=r'<div class="movie-title txtHide txtHide" title="(.+?)">',Index=1)
			url=self.custom_RegexGetText(Text=vod,RegexText=r'href="(.+?)"',Index=1)
			if title=='' or url=='':
				continue
			if len(img)<5:
				img='https://agit.ai/lanhaidixingren/Tvbox/raw/branch/master/CoverError.png'
			videos.append({
					"vod_id":"{0}###{1}###{2}".format(title,head+url,img),
					"vod_name":title,
					"vod_pic":img,
					"vod_remarks":''
				})
		return videos

# T=Spider()
# l=T.homeVideoContent()
# l=T.searchContent(key='柯南',quick='')
# l=T.categoryContent(tid='37',pg='1',filter=False,extend='')
# for x in l['list']:
# 	print(x['vod_id'])

# mubiao= l['list'][2]['vod_id']
# playTabulation=T.detailContent(array=[mubiao,])
# # print(playTabulation)
# vod_play_from=playTabulation['list'][0]['vod_play_from']
# vod_play_url=playTabulation['list'][0]['vod_play_url']
# url=vod_play_url.split('$$$')
# vod_play_from=vod_play_from.split('$$$')[0]
# url=url[0].split('$')
# url=url[1].split('#')[0]
# # print(vod_play_from)
# m3u8=T.playerContent(flag=vod_play_from,id=url,vipFlags=True)
# print(m3u8)