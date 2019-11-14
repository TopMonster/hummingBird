$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'sys/tblregisteruser/list',
		datatype: "json",
		colModel: [
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 },
			{ label: '更新时间', name: 'updatedTime', index: 'updated_time', width: 100 },
			{ label: '用户id', name: 'userId', index: 'user_id', width: 100 },
			{ label: '昵称', name: 'name', index: 'name', width: 100 },
			{ label: '电话', name: 'phone', index: 'phone', width: 100 },
			{ label: '渠道编码', name: 'channelCode', index: 'channel_code', width: 100 },
			{ label: '注册时间', name: 'registerTime', index: 'register_time', width: 100 },
			{ label: '最后登录时间', name: 'lastLoginTime', index: 'last_login_time', width: 100 },
			{ label: '是否激活', name: 'isActive', index: 'is_active', width: 100,formatter:handleActive},
			{ label: '是否反馈', name: 'isFeedback', index: 'is_feedback', width: 100},
			{ label: '最近登录设备', name: 'lastLoginDevice', index: 'last_login_device', width: 100 }
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
	function handleActive(cellvalue, options, rowdata) {
		if(cellvalue===1){
			return '<span>是</span>'
		}else if(cellvalue===0){
			return '<span>否</span>'
		}
	}
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			statDateStart : null ,
			statDateEnd:null,
			createdTime : null ,
			updatedTime : null ,
			userId : null ,
			name : null ,
			phone : null ,
			channelCode : null ,
			registerTime : null ,
			lastLoginTime : null ,
			isActive : "" ,
			lastLoginDevice : null,
			isFeedback:""
		},
		showList: true,
		title: null,
		tblRegisterUser: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblregisteruser/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;

		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblRegisterUser = {};
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
			var url = vm.tblRegisterUser.id == null ? "sys/tblregisteruser/save" : "sys/tblregisteruser/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.tblRegisterUser),
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
					url: baseURL + "sys/tblregisteruser/delete",
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
			$.get(baseURL + "sys/tblregisteruser/info/"+id, function(r){
				vm.tblRegisterUser = r.tblRegisterUser;
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{  'id' : vm.q.id , 'statDateStart' : vm.q.statDateStart ,
					'statDateEnd' : vm.q.statDateEnd ,    'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'userId' : vm.q.userId ,   'name' : vm.q.name ,   'phone' : vm.q.phone ,   'channelCode' : vm.q.channelCode ,   'registerTime' : vm.q.registerTime ,   'lastLoginTime' : vm.q.lastLoginTime ,   'isActive' : vm.q.isActive ,   'lastLoginDevice' : vm.q.lastLoginDevice,'isFeedback':vm.q.isFeedback  },
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