$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'sys/tblchannelroireport/list',
		datatype: "json",
		colModel: [
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '统计日期', name: 'statDate', index: 'stat_date', width: 100 },
			{ label: '渠道类型', name: 'channelType', index: 'channel_type', width: 100 },
			{ label: '渠道名称', name: 'channelName', index: 'channel_name', width: 100 },
			{ label: '渠道编码', name: 'channelCode', index: 'channel_code', width: 100 },
			{ label: '注册页UV', name: 'registerPageUv', index: 'register_page_uv', width: 100 },
			{ label: '新注册用户数', name: 'newRegisterUser', index: 'new_register_user', width: 100 },
			{ label: '渠道反馈注册数', name: 'feedbackRegisterNum', index: 'feedback_register_num', width: 100 },
			{ label: '渠道推广消耗', name: 'channelPromotionCost', index: 'channel_promotion_cost', width: 100 },
			{ label: '渠道设备激活数', name: 'chanelDeviceActive', index: 'chanel_device_active', width: 100 },
			{ label: 'APP登录数', name: 'appLoginUser', index: 'app_login_user', width: 100 },
			{ label: '产品点击数', name: 'productClick', index: 'product_click', width: 100 },
			{ label: '预估单日收入', name: 'estimateDailyEarnings', index: 'estimate_daily_earnings', width: 100 },
			{ label: '预估单日ROI', name: 'estimateDailyRoi', index: 'estimate_daily_roi', width: 100 },
			{ label: '7日启动设备数', name: 'deviceStartNumsD7', index: 'device_start_nums_d7', width: 100 },
			{ label: '7日登录用户数', name: 'appLoginUserNumsD7', index: 'app_login_user_nums_d7', width: 100 },
			{ label: '7日登录用户产品点击数', name: 'productClickD7', index: 'product_click_d7', width: 100 },
			{ label: '预估7日收入', name: 'estimateEarningsD7', index: 'estimate_earnings_d7', width: 100 },
			{ label: '预估7日ROI', name: 'estimateRoiD7', index: 'estimate_roi_7', width: 100 },
			{ label: '30日启动设备数', name: 'deviceStartNumsD30', index: 'device_start_nums_d30', width: 100 },
			{ label: '30日登录用户数', name: 'appLoginUserNumsD30', index: 'app_login_user_nums_d30', width: 100 },
			{ label: '30日登录用户产品点击数', name: 'productClickD30', index: 'product_click_d30', width: 100 },
			{ label: '预估30日收入', name: 'estimateEarningsD30', index: 'estimate_earnings_d30', width: 100 },
			{ label: '预估30日ROI', name: 'estimateRoiD30', index: 'estimate_roi_3d0', width: 100 }
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
			statDateStart : null , statDateEnd : null ,	                	      	               channelType : null , 	                	      	               channelName : null , 	                	      	               channelCode : null , 	                	      	               registerPageUv : null , 	                	      	               newRegisterUser : null , 	                	      	               feedbackRegisterNum : null , 	                	      	               channelPromotionCost : null , 	                	      	               chanelDeviceActive : null , 	                	      	               appLoginUser : null , 	                	      	               productClick : null , 	                	      	               estimateDailyEarnings : null , 	                	      	               estimateDailyRoi : null , 	                	      	               deviceStartNums7 : null , 	                	      	               appLoginUserNums7 : null , 	                	      	               productClick7 : null , 	                	      	               estimateEarnings7 : null , 	                	      	               estimateRoi7 : null , 	                	      	               deviceStartNums30 : null , 	                	      	               appLoginUserNums30 : null , 	                	      	               productClick30 : null , 	                	      	               estimateEarnings30 : null , 	                	      	               estimateRoi30 : null 	                	    },
		showList: true,
		title: null,
		tblChannelRoiReport: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblchannelroireport/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;

		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblChannelRoiReport = {};
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
			var url = vm.tblChannelRoiReport.id == null ? "sys/tblchannelroireport/save" : "sys/tblchannelroireport/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.tblChannelRoiReport),
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
					url: baseURL + "sys/tblchannelroireport/delete",
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
			$.get(baseURL + "sys/tblchannelroireport/info/"+id, function(r){
				vm.tblChannelRoiReport = r.tblChannelRoiReport;
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{  'id' : vm.q.id ,   'statDateStart' : vm.q.statDateStart , 'statDateEnd' : vm.q.statDateEnd ,  'channelType' : vm.q.channelType ,   'channelName' : vm.q.channelName ,   'channelCode' : vm.q.channelCode ,   'registerPageUv' : vm.q.registerPageUv ,   'newRegisterUser' : vm.q.newRegisterUser ,   'feedbackRegisterNum' : vm.q.feedbackRegisterNum ,   'channelPromotionCost' : vm.q.channelPromotionCost ,   'chanelDeviceActive' : vm.q.chanelDeviceActive ,   'appLoginUser' : vm.q.appLoginUser ,   'productClick' : vm.q.productClick ,   'estimateDailyEarnings' : vm.q.estimateDailyEarnings ,   'estimateDailyRoi' : vm.q.estimateDailyRoi ,   'deviceStartNums7' : vm.q.deviceStartNums7 ,   'appLoginUserNums7' : vm.q.appLoginUserNums7 ,   'productClick7' : vm.q.productClick7 ,   'estimateEarnings7' : vm.q.estimateEarnings7 ,   'estimateRoi7' : vm.q.estimateRoi7 ,   'deviceStartNums30' : vm.q.deviceStartNums30 ,   'appLoginUserNums30' : vm.q.appLoginUserNums30 ,   'productClick30' : vm.q.productClick30 ,   'estimateEarnings30' : vm.q.estimateEarnings30 ,   'estimateRoi30' : vm.q.estimateRoi30  },
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