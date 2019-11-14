$(function () {

	$(".alert-success").hide();
	$(".alert-danger").hide();
	$("#jqGrid").jqGrid({
		url: baseURL + 'sys/tblchannelconfig/list',
		datatype: "json",
		colModel: [
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 },
			{ label: '修改时间', name: 'updatedTime', index: 'updated_time', width: 100 },
			{ label: '渠道名称', name: 'channelName', index: 'channel_name', width: 100 },
			{ label: '渠道类型', name: 'channelType', index: 'channel_type', width: 100 },
			{ label: '渠道编码', name: 'channelCode', index: 'channel_code', width: 100 },
			{ label: '渠道推广H5风格', name: 'channelH5Style', index: 'channel_h5_style', width: 100 },
			{ label: '所属商务', name: 'business', index: 'business', width: 100 },
			{ label: 'CPC单价', name: 'cpc', index: 'cpc', width: 100 },
			{ label: '推广CPA价格', name: 'cpa', index: 'cpa', width: 100 },
			{ label: 'CPS比例', name: 'cps', index: 'cps', width: 100 },
			{ label: '扣量比例', name: 'deductRate', index: 'deduct_rate', width: 100 },
			{ label: '渠道推广链接', name: 'marktingUrl', index: 'markting_url', width: 100,formatter: alarmFormatter },
			{ label: '下载链接', name: 'appDownloadUrl', index: 'app_download_url', width: 100 },
			{ label: '状态', name: 'state', index: 'state', width: 100,formatter:handleActive }
		],
		viewrecords: true,

		height: 385,
		rowNum: 10,
		rowList : [10,30,50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth:true,
		shrinkToFit:true,
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

		},

	});
	function alarmFormatter(cellvalue, options, rowdata)
	{

		// return "return<button class='btn btn-primary' onclick='copy()'>复制</button><input id='copyVal' value="+cellvalue+" >";
		return" <a title=\"复制链接地址\" class=\"copyId\" data-clipboard-text="+cellvalue+" onclick='copy()'>"+cellvalue+"</a>"

	}
	function handleActive(cellvalue, options, rowdata) {
		if(cellvalue===0){
			return '<span>上线</span>'
		}else if(cellvalue===1){
			return '<span>下线</span>'
		}
	}
});

function copy() {
	// alert("复制成功")


	var clipboard = new ClipboardJS('.copyId');
	clipboard.on('success', function (e) {

		console.info('Action:', e.action);
		console.info('Text:', e.text);
		console.info('Trigger:', e.trigger);
		alert("复制成功")

		e.clearSelection();

	});

	clipboard.on('error', function (e) {
		console.error('Action:', e.action);
		console.error('Trigger:', e.trigger);

	});



}




var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			createdTime : null ,
			updatedTime : null ,
			channelName : null ,
			channelType : null ,
			channelCode : null ,
			channelH5Style : "" ,
			business : "" ,
			cpc : null ,
			cpa : null ,
			cps : null ,
			marktingUrl : null ,
			deptId : null,
			username:null,
			password:null,
			state:null

		},
		showList: true,
		showUser:false,
		title: null,
		tblChannelConfig: {},
		businessUserList:[]
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblchannelconfig/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;

		},
		add: function(){
			vm.showList = false;
			vm.showUser=true;
			vm.title = "新增";
			vm.tblChannelConfig = {channelH5Style:"taobaotubie",business:""};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
			vm.showUser=false;
			vm.title = "修改";

			vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.tblChannelConfig.id == null ? "sys/tblchannelconfig/save" : "sys/tblchannelconfig/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.tblChannelConfig),
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
					url: baseURL + "sys/tblchannelconfig/delete",
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
			$.get(baseURL + "sys/tblchannelconfig/info/"+id, function(r){
				vm.tblChannelConfig = r.tblChannelConfig;
			});
		},
		getBusinessUserList: function(){
			$.get(baseURL + "sys/user/list-business", function(r){
				vm.businessUserList = r.data;
			});
		},
		reload: function (event) {
			vm.showList = true;
			vm.showUser=false;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'channelName' : vm.q.channelName ,   'channelType' : vm.q.channelType ,   'channelCode' : vm.q.channelCode ,   'channelH5Style' : vm.q.channelH5Style ,   'business' : vm.q.business ,   'cpc' : vm.q.cpc ,   'cpa' : vm.q.cpa ,   'cps' : vm.q.cps ,   'marktingUrl' : vm.q.marktingUrl ,   'deptId' : vm.q.deptId ,'username':vm.q.username,'password':vm.q.password,'state':vm.q.state },
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