$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblindexswitch/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 }, 			
			{ label: '修改时间', name: 'updatedTime', index: 'updated_time', width: 100 }, 			
			{ label: '渠道编号', name: 'channelCode', index: 'channel_code', width: 100 }, 			
			{ label: '展示url', name: 'showUrl', index: 'show_url', width: 100 }, 			
			{ label: '终端APP名称', name: 'terminalProductName', index: 'terminal_product_name', width: 100 }, 			
			{ label: '终端APP版本', name: 'terminalProductVersion', index: 'terminal_product_version', width: 100 }, 			
			{ label: '审核版本', name: 'auditVersion', index: 'audit_version', width: 100 }			
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
        	         	
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
	    q:{
	    	               	      	               createdTime : null , 	                	      	               updatedTime : null , 	                	      	               channelCode : null , 	                	      	               showUrl : null , 	                	      	               terminalProductName : null , 	                	      	               terminalProductVersion : null , 	                	      	               auditVersion : null 	                	    },
		showList: true,
		title: null,
		tblIndexSwitch: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblindexswitch/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblIndexSwitch = {};
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
			var url = vm.tblIndexSwitch.id == null ? "sys/tblindexswitch/save" : "sys/tblindexswitch/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblIndexSwitch),
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
				    url: baseURL + "sys/tblindexswitch/delete",
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
			$.get(baseURL + "sys/tblindexswitch/info/"+id, function(r){
                vm.tblIndexSwitch = r.tblIndexSwitch;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'channelCode' : vm.q.channelCode ,   'showUrl' : vm.q.showUrl ,   'terminalProductName' : vm.q.terminalProductName ,   'terminalProductVersion' : vm.q.terminalProductVersion ,   'auditVersion' : vm.q.auditVersion  },
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