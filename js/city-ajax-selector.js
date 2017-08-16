function initProvinceAndCitySelector() {
    var http="https://cooperator.coolqi.com" ; // 正式
   // var http="http://59.110.16.9:9998/"; // 测试
   // var http="http://192.168.35.195:8081/"; // py测试
    var provinceUrl = http+'/v1/provinceList';
    var sectionUrl = http+'/v1/cityList';
    var provinceSelectedId = $("#provinceSelectedId");
    var citySelectedId = $("#citySelectedId");
    citySelectedId.html("<option value='0'>选择市/区</option>");
    jQuery.support.cors = true;
    $.ajax({
        type: "get",
        url: provinceUrl,
        async: true,
        data: {},
        success: function (data) {
            if (data.code == 0) {
                var list = data.result;
                var html = "";
                html += "<option value='0'>选择省份</option>";
                for (var i = 0; i < list.length; i++) {
                    html += "<option value= " + list[i].id + ">" + list[i].name + "</option>";
                }
                provinceSelectedId.html(html)
            } else {
                alert(data.msg)
            }
        }
    });

    provinceSelectedId.change(function () {
        var provinceId = provinceSelectedId.val();
        if (provinceId!=0){
            $.ajax({
                type: "get",
                url: sectionUrl,
                async: true,
                data: {
                    "provinceId": provinceId
                },
                success: function (data) {
                    if (data.code == 0) {
                        var list = data.result;
                        var html = "";
                        html += "<option value='0'>选择市/区</option>";
                        for (var i = 0; i < list.length; i++) {
                            html += "<option value= " + list[i].id + ">" + list[i].name + "</option>";
                        }
                        citySelectedId.html(html)
                    } else {
                        alert(data.msg)
                    }
                }
            })
        }
    })
    
}