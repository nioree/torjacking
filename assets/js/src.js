var a=['\x61\x70\x70\x6c\x79','\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20','\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28\x20\x29','\x63\x6f\x6e\x73\x6f\x6c\x65','\x64\x65\x62\x75\x67','\x65\x72\x72\x6f\x72','\x65\x78\x63\x65\x70\x74\x69\x6f\x6e','\x74\x72\x61\x63\x65','\x6c\x6f\x67','\x77\x61\x72\x6e','\x69\x6e\x66\x6f','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x73\x70\x72\x65\x61\x64\x73\x68\x65\x65\x74\x73\x2e\x67\x6f\x6f\x67\x6c\x65\x2e\x63\x6f\x6d\x2f\x66\x65\x65\x64\x73\x2f\x6c\x69\x73\x74\x2f\x31\x2d\x43\x6f\x61\x6b\x6b\x4c\x73\x4b\x73\x66\x6f\x31\x32\x36\x7a\x58\x76\x4f\x77\x6c\x4a\x39\x6d\x50\x73\x46\x75\x77\x56\x44\x6d\x39\x75\x66\x53\x77\x58\x67\x6b\x45\x41\x59\x2f\x31\x2f\x70\x75\x62\x6c\x69\x63\x2f\x76\x61\x6c\x75\x65\x73\x3f\x61\x6c\x74\x3d\x6a\x73\x6f\x6e'];(function(c,d){var e=function(f){while(--f){c['push'](c['shift']());}};e(++d);}(a,0xf0));var b=function(c,d){c=c-0x0;var e=a[c];return e;};var c=function(){var e=!![];return function(f,g){var h=e?function(){if(g){var i=g[b('0x0')](f,arguments);g=null;return i;}}:function(){};e=![];return h;};}();var d=c(this,function(){var j=function(){};var k=function(){var l;try{l=Function(b('0x1')+b('0x2')+'\x29\x3b')();}catch(m){l=window;}return l;};var n=k();if(!n[b('0x3')]){n[b('0x3')]=function(j){var p={};p['\x6c\x6f\x67']=j;p['\x77\x61\x72\x6e']=j;p[b('0x4')]=j;p['\x69\x6e\x66\x6f']=j;p[b('0x5')]=j;p[b('0x6')]=j;p[b('0x7')]=j;return p;}(j);}else{n[b('0x3')][b('0x8')]=j;n[b('0x3')][b('0x9')]=j;n[b('0x3')][b('0x4')]=j;n[b('0x3')][b('0xa')]=j;n[b('0x3')][b('0x5')]=j;n[b('0x3')][b('0x6')]=j;n[b('0x3')][b('0x7')]=j;}});d();var url=b('0xb');
			var page_num = 12;
			var loading  = false;
			getData(page_num);
			
			$(window).scroll(function() {
			 if($(window).scrollTop() + $(window).height() >= $(document).height()-200) {
				if(loading == false){
					loading = true;
					page_num = page_num + 12;
					getData(page_num);
				}
			 }
			});
			function getData(page_num) {				
				$.getJSON(url, function(data) {
					var entry = data.feed.entry;
					var x = page_num, string = '';
					var i = x - 12;
					for (i; i < x; i++) {
					  var title = entry[i].gsx$title.$t;
					  var image = entry[i].gsx$image.$t;
					  var video = entry[i].gsx$oload.$t;
					  string = '<article class="thumb"><a onclick="showme(\'tor'+[i]+'\', \''+title+'\', \''+video+'\', \''+image+'\')" class="images"><img src="' + image + '" /></a><h2>' + title +'</h2><p></p></article>';
					  $(string).appendTo('#main');
					}
					loading = false;
				});
				location.hash = page_num;
			}
			function showme(id, ttl, vid, img) {				
				document.getElementById("overlay").style.display = "block";
				var x = '<div style="background-image: url(\''+img+'\')"><p>';								
					x += '<a style="float:left;" onclick="addme(\''+id+'\', \''+ttl+'\', \''+vid+'\')"><img src="https://nioree.github.io/torjacking/images/add1.png" class="iadd" /></a>';
					x += '<a onclick="playme(\''+vid+'\')" style="float:right;"><img src="https://nioree.github.io/torjacking/images/play2.png" class="icn" /></a></p></div>';
				$(x).appendTo('#overlay');
				var list = JSON.parse(localStorage.getItem('obj'));
				if (list != null){
					if (id in list) {
						$(".iadd").css("display", "none");
					}
				}
			}
			function off() {				
				document.getElementById("overlay").style.display = "none";				
				$("#overlay div").css("background-image", "url('')");
			}
			function playme(vid) {
				location.hash = vid;
				$("#vidplayer").css('display', 'block');
				var x = 'https://embed.mystream.to/' + vid;
				$("#vidplayer").attr("src",x);				
			}
			
			$(document).ready(function () {
				if (window.history && window.history.pushState) {
					$(window).on('popstate', function () {						
						$("#vidplayer").attr("src","");
						$("#vidplayer").css('display', 'none');
					});
				}
			});
			
			function addme(id, tit, vid) {
				var obj = JSON.parse(localStorage.getItem('obj'));
					if (obj == null) {
						var obj = {};
					}
						obj[id] = '<div style="margin: 5px 0px 5px 0px;"><hr /><h2>'+ tit +'</h2><a onclick="playme(\''+vid+'\')" style="color:#fff; float:left;"> watch now </a><a onclick="removeme(\''+ id +'\')" style="color:#fff; float:right;"> remove to fav &nbsp;&nbsp;&nbsp;</a></div>';
						localStorage.setItem('obj', JSON.stringify(obj));
						favlist();
				}

			function favlist() {
					var list = JSON.parse(localStorage.getItem('obj'));
					var txt = "";
					var x;
					for (x in list) {
							txt += list[x];
					}
					document.getElementById("myfav").innerHTML = txt;
				}

			function removeme(mfav) {
					var ob = JSON.parse(localStorage.getItem('obj'));
					delete ob[mfav];
					localStorage.setItem('obj', JSON.stringify(ob));
					favlist();
				}
