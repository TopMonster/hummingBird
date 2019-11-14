$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblh5conversionreport/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '统计日期', name: 'statDate', index: 'stat_date', width: 100 }, 			
			{ label: '渠道类型', name: 'channelType', index: 'channel_type', width: 100 }, 			
			{ label: '渠道名称', name: 'channelName', index: 'channel_name', width: 100 }, 			
			{ label: '渠道编码', name: 'channelCode', index: 'channel_code', width: 100 }, 			
			{ label: '注册页UV', name: 'registerPageUv', index: 'register_page_uv', width: 100 }, 			
			{ label: '手机号输入框点击数', name: 'phoneInputBoxClick', index: 'phone_input_box_click', width: 100 }, 			
			{ label: '验证码输入框点击数', name: 'verifycodeInputBoxClick', index: 'verifycode_input_box_click', width: 100 }, 			
			{ label: '注册按钮点击数', name: 'registerBtnClick', index: 'register_btn_click', width: 100 }, 			
			{ label: '手机号收集数', name: 'collectPhone', index: 'collect_phone', width: 100 }, 			
			{ label: 'UV到手机号转化', name: 'uvPhoneConversion', index: 'uv_phone_conversion', width: 100 }, 			
			{ label: '新注册用户数', name: 'newRegisterUser', index: 'new_register_user', width: 100 }, 			
			{ label: '老手机号数', name: 'oldPhoneNum', index: 'old_phone_num', width: 100 },
            { label: '微信下载引导页UV', name: 'wechatDownloadPageuv', index: 'wechat_download_pageuv', width: 100 },
			{ label: '下载页UV', name: 'downloadPageUv', index: 'download_page_uv', width: 100 }, 			
			{ label: '下载按钮点击数', name: 'downloadBtnClick', index: 'download_btn_click', width: 100 },
            { label: '手机号输入数', name: 'phoneInputLeaveTimes', index: 'phone_input_leave_times', width: 100 },
            { label: '刷量参考值', name: 'brushAmountValue', index: 'brush_amount_value', width: 100 },
			//{ label: '渠道设备激活数', name: 'channelDeviceActive', index: 'channel_device_active', width: 100 },
			//{ label: '注册到激活转化', name: 'registerActiveConversion', index: 'register_active_conversion', width: 100 },
			{ label: 'APP登录用户数', name: 'appLoginTimes', index: 'app_login_times', width: 100 }, 			
			{ label: 'H5注册到登录转化', name: 'activeLoginConversion', index: 'active_login_conversion', width: 100 },
			{ label: '产品点击用户数', name: 'productClickUser', index: 'product_click_user', width: 100 }, 			
			{ label: '点击用户占比', name: 'clickProductUserRate', index: 'click_product_user_rate', width: 100 }, 			
			{ label: '产品点击数', name: 'productClick', index: 'product_click', width: 100 }, 			
            { label: '人均产品点击数', name: 'percapitaProductClick', index: 'percapita_product_click', width: 100 },
            { label: '新手机号占比', name: 'newPhoneRate', index: 'new_phone_rate', width: 100 }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
                  shrinkToFit:false,
                 multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	          //$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
                 	
        }
    });
    laydate.render({
        elem: '#statDateStart',
        done: function(value, date, endDate){
            vm.q.statDateStart=value;
        }
    });

    laydate.render({
        elem: '#statDateEnd',
        done: function(value, date, endDate){
            vm.q.statDateEnd=value;
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
	    q:{
	    	statDateStart : null , 	statDateEnd:null,                	      	               channelType : null , 	                	      	               channelName : null , 	                	      	               channelCode : null , 	                	      	               registerPageUv : null , 	                	      	               phoneInputBoxClick : null , 	                	      	               verifycodeInputBoxClick : null , 	                	      	               registerBtnClick : null , 	                	      	               collectPhone : null , 	                	      	               uvPhoneConversion : null , 	                	      	               newRegisterUser : null , 	                	      	               oldPhoneNum : null , 	                	      	               downloadPageUv : null , 	                	      	               downloadBtnClick : null , 	                	      	               channelDeviceActive : null , 	                	      	               registerActiveConversion : null , 	                	      	               appLoginTimes : null , 	                	      	               activeLoginConversion : null , 	                	      	               productClickUser : null , 	                	      	               clickProductUserRate : null , 	                	      	               productClick : null , 	                	      	               percapitaProductClick : null , 	                	      	               newPhoneRate : null 	                	    },
		showList: true,
		title: null,
		tblH5ConversionReport: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblh5conversionreport/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblH5ConversionReport = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.tblH5ConversionReport.id == null ? "sys/tblh5conversionreport/save" : "sys/tblh5conversionreport/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblH5ConversionReport),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/tblh5conversionreport/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "sys/tblh5conversionreport/info/"+id, function(r){
                vm.tblH5ConversionReport = r.tblH5ConversionReport;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'statDateEnd' : vm.q.statDateEnd , 'statDateStart' : vm.q.statDateStart ,   'channelType' : vm.q.channelType ,   'channelName' : vm.q.channelName ,   'channelCode' : vm.q.channelCode ,   'registerPageUv' : vm.q.registerPageUv ,   'phoneInputBoxClick' : vm.q.phoneInputBoxClick ,   'verifycodeInputBoxClick' : vm.q.verifycodeInputBoxClick ,   'registerBtnClick' : vm.q.registerBtnClick ,   'collectPhone' : vm.q.collectPhone ,   'uvPhoneConversion' : vm.q.uvPhoneConversion ,   'newRegisterUser' : vm.q.newRegisterUser ,   'oldPhoneNum' : vm.q.oldPhoneNum ,   'downloadPageUv' : vm.q.downloadPageUv ,   'downloadBtnClick' : vm.q.downloadBtnClick ,   'channelDeviceActive' : vm.q.channelDeviceActive ,   'registerActiveConversion' : vm.q.registerActiveConversion ,   'appLoginTimes' : vm.q.appLoginTimes ,   'activeLoginConversion' : vm.q.activeLoginConversion ,   'productClickUser' : vm.q.productClickUser ,   'clickProductUserRate' : vm.q.clickProductUserRate ,   'productClick' : vm.q.productClick ,   'percapitaProductClick' : vm.q.percapitaProductClick ,   'newPhoneRate' : vm.q.newPhoneRate  },
                page:page
            }).trigger("reloadGrid");
		},
		 foramtQueryData(json) {
      var arr = []
      for (let i in json) {
        if (json[i]) {
          arr.push(i + '=' + json[i])
        }
      }
      return arr.join('&')
    }
	}
});