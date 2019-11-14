$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'sys/tblbehaviourcollecth5/list',
		datatype: "json",
		colModel: [
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 },
			{ label: '统计动作类型', name: 'statType', index: 'stat_type', width: 100 },
			{ label: '统计名称', name: 'statName', index: 'stat_name', width: 100 },
			{ label: 'IP', name: 'ip', index: 'ip', width: 100 },
			{ label: '浏览器UA', name: 'userAgent', index: 'user_agent', width: 100 },
			{ label: '渠道H5风格', name: 'channelH5Style', index: 'channel_h5_style', width: 100 },
			{ label: '页面URL', name: 'pageUrl', index: 'page_url', width: 100 },
			{ label: '手机系统', name: 'os', index: 'os', width: 100 },
			{ label: '渠道编码', name: 'channelCode', index: 'channel_code', width: 100 },
			{ label: '备注', name: 'message', index: 'message', width: 100 },
			{ label: '系统版本', name: 'osVersion', index: 'os_version', width: 100 },
			{ label: '网络类型', name: 'networkType', index: 'network_type', width: 100 }
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
		rowList : [10,30,50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth:true,
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
			statDateStart : null , 	 statDateEnd : null, createdTime : null , 	                	      	               statType : null , 	                	      	               statName : null , 	                	      	               ip : null , 	                	      	               userAgent : null , 	                	      	               channelH5Style : null , 	                	      	               pageUrl : null , 	                	      	               os : null , 	                	      	               channelCode : null , 	                	      	               message : null , 	                	      	               osVersion : null , 	                	      	               networkType : null 	                	    },
		showList: true,
		title: null,
		tblBehaviourCollectH5: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblbehaviourcollecth5/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;

		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblBehaviourCollectH5 = {};
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
			var url = vm.tblBehaviourCollectH5.id == null ? "sys/tblbehaviourcollecth5/save" : "sys/tblbehaviourcollecth5/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.tblBehaviourCollectH5),
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
					url: baseURL + "sys/tblbehaviourcollecth5/delete",
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
			$.get(baseURL + "sys/tblbehaviourcollecth5/info/"+id, function(r){
				vm.tblBehaviourCollectH5 = r.tblBehaviourCollectH5;
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'statDateStart' : vm.q.statDateStart ,  'statDateEnd' : vm.q.statDateEnd , 'statType' : vm.q.statType ,   'statName' : vm.q.statName ,   'ip' : vm.q.ip ,   'userAgent' : vm.q.userAgent ,   'channelH5Style' : vm.q.channelH5Style ,   'pageUrl' : vm.q.pageUrl ,   'os' : vm.q.os ,   'channelCode' : vm.q.channelCode ,   'message' : vm.q.message ,   'osVersion' : vm.q.osVersion ,   'networkType' : vm.q.networkType  },
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