$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'sys/tblbehaviourcollectapp/list',
		datatype: "json",
		colModel: [
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 },
			{ label: '设备ID', name: 'deviceId', index: 'device_id', width: 100 },
			{ label: '用户ID', name: 'userId', index: 'user_id', width: 100 },
			{ label: '统计类型', name: 'statType', index: 'stat_type', width: 100 },
			{ label: '统计名称', name: 'statName', index: 'stat_name', width: 100 },
			{ label: '位置编号', name: 'positionCode', index: 'position_code', width: 100 },
			{ label: '产品编码', name: 'productCode', index: 'product_code', width: 100 },
			{ label: 'IP', name: 'ip', index: 'ip', width: 100 },
			{ label: 'UA', name: 'userAgent', index: 'user_agent', width: 100 },
			{ label: '渠道名称', name: 'channelCode', index: 'channel_code', width: 100 },
			{ label: '渠道H5风格', name: 'channelH5Style', index: 'channel_h5_style', width: 100 },
			{ label: '手机系统', name: 'os', index: 'os', width: 100 },
			{ label: '系统版本', name: 'osVersion', index: 'os_version', width: 100 },
			{ label: '手机型号', name: 'phoneModel', index: 'phone_model', width: 100 },
			{ label: 'APP版本', name: 'terminalProductVersion', index: 'terminal_product_version', width: 100 },
			{ label: 'APP名称', name: 'terminalProductName', index: 'terminal_product_name', width: 100 },
			{ label: '页面停留时间', name: 'pageStayTime', index: 'page_stay_time', width: 100 },
			{ label: '手机当前角度', name: 'phoneNowAngle', index: 'phone_now_angle', width: 100 },
			{ label: '手机电量', name: 'phoneElectric', index: 'phone_electric', width: 100 },
			{ label: '充电状态', name: 'stateOfCharge', index: 'state_of_charge', width: 100 },
			{ label: '备注', name: 'message', index: 'message', width: 100 },
			{ label: '网络类型', name: 'networkType', index: 'network_type', width: 100 },
			{ label: 'gps', name: 'gps', index: 'gps', width: 100 },
			{ label: '省份', name: 'gpsProvince', index: 'gps_province', width: 100 },
			{ label: '城市', name: 'gpsCity', index: 'gps_city', width: 100 }
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
			statDateStart : null , statDateEnd:null,	                	      	               deviceId : null , 	                	      	               userId : null , 	                	      	               statType : null , 	                	      	               statName : null , 	                	      	               positionCode : null , 	                	      	               productCode : null , 	                	      	               ip : null , 	                	      	               userAgent : null ,
			channelCode : null , 	                	      	               channelH5Style : null , 	                	      	               os : null , 	                	      	               osVersion : null , 	                	      	               phoneModel : null , 	                	      	               terminalProductVersion : null , 	                	      	               terminalProductName : null , 	                	      	               pageStayTime : null , 	                	      	               phoneNowAngle : null , 	                	      	               phoneElectric : null , 	                	      	               stateOfCharge : null , 	                	      	               message : null , 	                	      	               networkType : null , 	                	      	               gps : null , 	                	      	               gpsProvince : null , 	                	      	               gpsCity : null 	                	    },
		showList: true,
		title: null,
		tblBehaviourCollectApp: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblbehaviourcollectapp/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;

		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblBehaviourCollectApp = {};
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
			var url = vm.tblBehaviourCollectApp.id == null ? "sys/tblbehaviourcollectapp/save" : "sys/tblbehaviourcollectapp/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.tblBehaviourCollectApp),
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
					url: baseURL + "sys/tblbehaviourcollectapp/delete",
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
			$.get(baseURL + "sys/tblbehaviourcollectapp/info/"+id, function(r){
				vm.tblBehaviourCollectApp = r.tblBehaviourCollectApp;
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{  'id' : vm.q.id , 'statDateStart' : vm.q.statDateStart ,
					'statDateEnd' : vm.q.statDateEnd ,   'deviceId' : vm.q.deviceId ,   'userId' : vm.q.userId ,
					'statType' : vm.q.statType ,   'statName' : vm.q.statName ,   'positionCode' : vm.q.positionCode ,
					'productCode' : vm.q.productCode ,   'ip' : vm.q.ip ,   'userAgent' : vm.q.userAgent ,   'channelCode' : vm.q.channelCode ,   'channelH5Style' : vm.q.channelH5Style ,   'os' : vm.q.os ,
					'osVersion' : vm.q.osVersion ,   'phoneModel' : vm.q.phoneModel ,   'terminalProductVersion' : vm.q.terminalProductVersion ,
					'terminalProductName' : vm.q.terminalProductName ,   'pageStayTime' : vm.q.pageStayTime ,   'phoneNowAngle' : vm.q.phoneNowAngle ,   'phoneElectric' : vm.q.phoneElectric ,
					'stateOfCharge' : vm.q.stateOfCharge ,   'message' : vm.q.message ,   'networkType' : vm.q.networkType ,   'gps' : vm.q.gps ,   'gpsProvince' : vm.q.gpsProvince ,   'gpsCity' : vm.q.gpsCity  },
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