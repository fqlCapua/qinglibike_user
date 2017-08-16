$(function() {
	var http="https://cooperator.coolqi.com" ; // 正式
	//var http="http://59.110.16.9:9998/"; // 测试
	//var http="http://192.168.35.195:8081/"; // py测试
	var submitUrl = http+"/v1/verify/apply"; //提交数据接口；
	var getNumUrl = http+"/v1/verify/count"; //获取参加人数
	var putUrlArgUrl = "" ;//提交统计参数
	var imgUrl = http+"/v1/verify/verifyPic"; //验证码
		getNum() ;//初始化参加人数
		initProvinceAndCitySelector() ; //初始化区域
		securityCode(); //初始化验证码
		//	judgeExplorer()   //判断浏览器版本
		//	putUrlArgObject()  //ready提交数据初始化
		
	$(".inputBox button").on("click", function() { //提交事件
		var verifyID=$("#captchaImg").attr("src").split("?")[1].split("=")[1];
		var parmes={};
		parmes.name = $("#name").val();
		parmes.phone = $("#phone").val();
		parmes.verify = $("#captcha").val();
		parmes.regionid=$("#citySelectedId").val();
		parmes.verifyId=verifyID;
		if(!(/^[\u4E00-\u9FA5]{2,4}$/.test(parmes.name))) { //手机号是否正确
			showCenter("名字填写有误");
			return false;
		}

		if(!(/^1[34578]\d{9}$/.test(parmes.phone))) { //手机号是否正确
			showCenter("手机号不正确");
			return false;
		}
		
		if(parmes.verify=="") { //验证码是否填写
			showCenter("请填写验证码");
			return false;
		}
		if(parmes.regionid==""||parmes.regionid=="0") { //区域是否填写
			if( $("#provinceSelectedId").val()==919||$("#provinceSelectedId").val()==920||$("#provinceSelectedId").val()==921){
				parmes.regionid=$("#provinceSelectedId").val();
			}else{
				showCenter("请选择地区");
				return false;
			}
		}
		
		
		$.extend(parmes, putUrlArgObject());
		$.ajax({
			type: "POST",
			url: submitUrl,
			data: parmes,
			async: true,
			success: function(data) {
				if(data.code == 0) {
					$('.cd-popup').addClass('is-visible'); //弹出模态框
				}else{
					showCenter(data.msg);
				}
				securityCode();
			},
			errror: function() {

			}
		});

	});

	$("#captchaImg").on("click", function() { //刷新验证码
		securityCode();
	});

	$(document).on("click", function() { //输入错误提示框消失
		$(".inputBox p").hide();
	});

	function getNum() {  //初始化报名人数
		jQuery.support.cors = true;
		$.ajax({
			type: "get",
			url: getNumUrl,
			data: {},
			async: true,
			crossDomain: true, 
			dataType:"json",
			success: function(data) {
				if(data.code == 0) {
					$(".howMuch").html(data.result + "位");
				}
			},
			error: function(xhr){
                console.log(xhr)//打印服务器返回的内容看看是什么
            	alert("异常");
        }
		});
	}
  
  	function securityCode(){ //点击切换验证码
  		$.ajax({
			type: "get",
			url: imgUrl,
			data: {
				verifyID:MathRand()
			},
			async: true,
			success: function(data) {
				$("#captchaImg").attr({"src":imgUrl+"?verifyID="+MathRand()})
			},
			error: function() {
				
			}
		});
  		
  	}
  
	function judgeExplorer() {  //版本号
		var DEFAULT_VERSION = "8.0";
		var ua = navigator.userAgent.toLowerCase();
		var isIE = ua.indexOf("msie") > -1;
		var safariVersion;
		if(isIE) {
			safariVersion = ua.match(/msie ([\d.]+)/)[1];
			if(safariVersion <= DEFAULT_VERSION) {
				// 低于8.0
			} else {
				// 高于8.0
			}
		} else {
			// 非IE
		}
	}

	function MathRand() { //随机8位数
		var Num = "";
		for(var i = 0; i < 8; i++) {
			Num += Math.floor(Math.random() * 10);
		}
		return Num
	}

	function putUrlArgObject() { //取到需要统计的数据
		var data = new Object();
		var query = location.search.substring(1);
		var pairs = query.split("&");
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if(pos == -1) {
				continue;
			}
			var argname = pairs[i].substring(0, pos);
			var value = pairs[i].substring(pos + 1);
			data[argname] = decodeURI(value); //保存值
		}
		return  data;
	}

	function showCenter(val) { //提示框出现
		$(".inputBox p").show();
		$(".inputBox p").html(val);
	}

	//旋转换字
	$(".divOne").hover(function() {
		$(this).html("<p style='margin-top: 80px;'>你出力 我出车</p><p>第三方提供资金</p><p>共享利润</p><p>年赚百万不是梦</p>");
		$(this).find("p").css({
			fontSize: 16 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("零投入模式");

	});

	//旋转换字
	$(".divTwo").hover(function() {
		$(this).html("<p style='margin-top: 80px;'>你出钱 我出车</p><p>优势整合</p><p>互利共赢</p><p>年化收益50%以上</p>");
		$(this).find("p").css({
			fontSize: 16 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("加盟模式");

	});

	//旋转换字
	$(".divThree").hover(function() {
		$(this).html("<p style='margin-top: 80px;'>如果你有实力</p><p>酷骑与你建立分公司</p><p>占领城市</p><p>共享胜利果实</p>");
		$(this).find("p").css({
			fontSize:16 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("合伙模式");

	});

	//旋转换字
	$(".divFour").hover(function() {
		$(this).html("<p style='margin-top: 80px;'>政府</p><p>教育</p><p>开发商</p><p>...</p>");
		$(this).find("p").css({
			fontSize: 16 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("更多模式");

	});

	//五大保障
	$(".sureOne").hover(function() {
		$(this).html("<p style='margin-top:85px;'>市场成熟</p><p>回报丰厚</p>");
		$(this).find("p").css({
			fontSize: 20 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("收益保障");

	});

	$(".sureTwo").hover(function() {
		$(this).html("<p style='margin-top:85px;'>自由解除合同</p><p>酷骑全盘接手</p>");
		$(this).find("p").css({
			fontSize: 20 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("退出免责");

	});

	$(".sureThree").hover(function() {
		$(this).html("<p style='margin-top: 110px;'>强大的技术</p><p>客服团队</p>");
		$(this).find("p").css({
			fontSize: 20 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("运营无忧");

	});

	$(".sureFour").hover(function() {
		$(this).html("<p style='margin-top:70px;'>前期培训</p><p>中期指导</p><p>后期维护</p>");
		$(this).find("p").css({
			fontSize: 20 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("全程护航");

	});

	$(".sureFive").hover(function() {
		$(this).html("<p style='margin-top: 70px;'>全方位</p><p>品牌打造</p><p>引爆市场</p>");
		$(this).find("p").css({
			fontSize: 20 + "px",
			lineHeight: 30 + "px"
		})
	}, function() {
		$(this).html("广告营销");

	});

	var num = 168;

	function addNum() {
		num++;
		$("#howMuch").html(num + "位");
	}

	//循环时间
	var time = 4 * 60 * 60 * 1000;
	setInterval(addNum, time)
});
$(function(){
if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();
}
});
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}