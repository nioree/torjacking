var url = "https://spreadsheets.google.com/feeds/list/1_rDlaxDuD3lSnD4c1PLFQcMZIfYGAg3L34xVY21HpiQ/1/public/values?alt=json";
var page_num = 24;
var loading  = false;
			getData(page_num);
			
			$(window).scroll(function() {
			 if($(window).scrollTop() + $(window).height() >= $(document).height()-200) {
				if(loading == false){
					loading = true;
					page_num = page_num + 24;
					getData(page_num);
				}
			 }
			});
			function getData(page_num) {				
				$.getJSON(url, function(data) {
					var entry = data.feed.entry;
					var x = page_num, string = '';
					var i = x - 24;
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
