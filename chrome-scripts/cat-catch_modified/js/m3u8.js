//正则
var EXTINF = new RegExp("#EXTINF:(.*),");

//获取m3u8_url参数
var results = new RegExp('[\?]m3u8_url=([^\n]*)').exec(window.location.href);
var url = results[1];

//获取m3u8的参数
results = new RegExp('\\.m3u8\\?([^\n]*)').exec(url);
if(results){
    var m3u8_arg = results[1];
}

//dmm.co.jp url特殊处理
if (url.indexOf('.dmm.co.jp') != -1) {
	url = url.replace('=','%3D');
	url = url.replace('+','%2B');
}

$('#m3u8_url').html(url);

//获取url内容
var html = $.ajax({url:url,async:false}).responseText;
html = html.split("\n");

//基本文件目录
var getManifestUrlBase = function() {
	var url_decode = decodeURIComponent(url);
	url_decode = url_decode.split("?")[0];
	var parts = url_decode.split('/');
	parts.pop();
	return parts.join('/') + '/';
}
//根目录
var getManifestUrlRoot = function() {
	var Path = url.split("/");
	return Path[0] + '//' + Path[2];
}
var BasePath = getManifestUrlBase();
var RootPath = getManifestUrlRoot();

//验证是否远程文件
var isRelative = function(url) {
	var r = new RegExp('^(?:[a-z]+:)?//', 'i');
	return !r.test(url);
}

//写入textarea
var add_textarea = function(str){
    //ts文件加参数
    results = new RegExp('[\?]([^\n]*)').exec(str);
    if(!results && m3u8_arg){
        str = str + '?' +m3u8_arg;
    }
	link = $('#html').text() + str + "\n";
	$('#html').text(link);
}

var add_next_m3u8 = function(str){
	$('#next_m3u8').append('<p><a href="/m3u8.html?m3u8_url='+str+'">'+str+'</a></p>');
}

//链接列表
var show_list = function(str){
	if(str === undefined){ str = '' }
	var num = 0;
	$('#html').text('');
	for(i in html) {
		var link = html[i];
		
		//密钥
		if (link.indexOf('URI=') != -1) {
			var re = /URI="(.*)"/.exec(link);
			$('#key').html('，The media is encrypted，You must download the .key file');
			
			//dmm.co.jp url特殊处理
			if (re[1].indexOf('.dmm.co.jp') != -1) {
				re[1] = re[1].replace('ld%3D','ld=');
			}
			
			add_textarea(str + re[1]);
		}
		
		//ts文件
		if (link.indexOf('#') == -1 && link !== '') {
			if (isRelative(link)) {
				if (link[0] == '/'){
					link = RootPath + link;
				}else{
					link = BasePath + link;
				}
			}
			$('#num').html(++num);
			add_textarea(str + link);
			
			//判断是否m3u8
			if (link.indexOf('.m3u8') != -1) {
				$('#textarea').hide();
				$('button').hide();
				$('#next_m3u8_tr').show();
				add_next_m3u8(link);
			}
		}
	}
}
show_list();

$('#Copym3u8Link').bind("click", function(){
	$('#m3u8_url').select();
 document.execCommand('copy');
});

//文本 格式 按钮
$('#Text').bind("click", function(){
	show_list();
});

//COPY  TEXTAREA
$('#CopyAll').bind("click", function(){
	$("textarea").select();
    document.execCommand('copy');
});


//下载 文本格式 按钮
$('#Download').bind("click", function(){
	show_list();
	var txt = $('#html').html().toString();
	txt = encodeURIComponent(txt);
	var a = document.createElement('a');
	a.href = "data:application/json," + txt;
	a.setAttribute('download', 'm3u8.txt');
	a.dispatchEvent(new MouseEvent('click'));
});