$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'sys/tblchannelregisterreport/feedbacklist',
		datatype: "json",
		colModel: [
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '统计日期', name: 'statDate', index: 'stat_date', width: 100 },
			{ label: '渠道类型', name: 'channelType', index: 'channel_type', width: 100 },
			{ label: '渠道名称', name: 'channelName', index: 'channel_name', width: 100 },
			{ label: '渠道编码', name: 'channelCode', index: 'channel_code', width: 100 },
			/*{ label: 'CPA价格', name: 'channelCpa', index: 'channel_Cpa', width: 100 },
			{ label: 'CPC价格', name: 'channelCpc', index: 'channel_Cpc', width: 100 },*/
			{ label: '渠道反馈点击数', name: 'channelFeedbackClick', index: 'channel_Feedback_Click', width: 100 },
			{ label: '注册用户数', name: 'feedbackRegisterNum', index: 'feedback_register_num', width: 100 }
			/*{ label: '渠道消耗', name: 'channelPromotionCost', index: 'channel_Promotion_Cost', width: 100 }*/


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
			statDateStart : null ,
			statDateEnd : null ,
			business:"",
			channelType : null ,
			channelName : null ,
			channelCode : null ,
			registerPageUv : null ,
			channelFeedbackClick : null ,
			channelCpa : null ,
			channelCpc : null ,
			newRegisterUser : null ,
			uvRegisterRate : null ,
			feedbackRegisterNum : null ,
			feedbackRegisterRate : null ,
			channelPromotionCost : null ,
			productClickCost : null ,
			deductSwitch : null ,
			deductRate : null ,
			deductNum : null ,
			deptId : null
		},
		showList: true,
		title: null,
		businessUserList:[],

		tblChannelRegisterReport: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblchannelregisterreport/export/feedback?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;

		},
		getBusinessUserList: function(){
			$.get(baseURL + "sys/user/list-business", function(r){
				vm.businessUserList = r.data;
			});
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblChannelRegisterReport = {};
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
			var url = vm.tblChannelRegisterReport.id == null ? "sys/tblchannelregisterreport/save" : "sys/tblchannelregisterreport/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.tblChannelRegisterReport),
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
					url: baseURL + "sys/tblchannelregisterreport/delete",
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
			$.get(baseURL + "sys/tblchannelregisterreport/info/"+id, function(r){
				vm.tblChannelRegisterReport = r.tblChannelRegisterReport;
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{  'id' : vm.q.id ,   'statDateStart' : vm.q.statDateStart ,'statDateEnd' : vm.q.statDateEnd ,   'channelType' : vm.q.channelType ,   'channelName' : vm.q.channelName ,   'channelCode' : vm.q.channelCode ,   'registerPageUv' : vm.q.registerPageUv ,   'channelFeedbackClick' : vm.q.channelFeedbackClick ,   'channelCpa' : vm.q.channelCpa ,   'channelCpc' : vm.q.channelCpc ,   'newRegisterUser' : vm.q.newRegisterUser ,   'uvRegisterRate' : vm.q.uvRegisterRate ,   'feedbackRegisterNum' : vm.q.feedbackRegisterNum ,   'feedbackRegisterRate' : vm.q.feedbackRegisterRate ,   'channelPromotionCost' : vm.q.channelPromotionCost ,   'productClickCost' : vm.q.productClickCost ,   'deductSwitch' : vm.q.deductSwitch ,   'deductRate' : vm.q.deductRate ,   'deductNum' : vm.q.deductNum ,   'deptId' : vm.q.deptId ,   'business' : vm.q.business  },
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
vm.getBusinessUserList();