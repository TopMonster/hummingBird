$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblshelfconfig/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 }, 			
			{ label: '修改时间', name: 'updatedTime', index: 'updated_time', width: 100 }, 			
			{ label: '货架名称', name: 'name', index: 'name', width: 100 }, 			
			{ label: '位置', name: 'postion', index: 'postion', width: 100 }, 			
			{ label: '货架编号', name: 'shelfCode', index: 'shelf_code', width: 100 }, 			
			{ label: '描述', name: 'description', index: 'description', width: 100 }			
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
	    	               	      	               createdTime : null , 	                	      	               updatedTime : null , 	                	      	               name : null , 	                	      	               postion : null , 	                	      	               shelfCode : null , 	                	      	               description : null 	                	    },
		showList: true,
		title: null,
		tblShelfConfig: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblshelfconfig/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblShelfConfig = {};
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
			var url = vm.tblShelfConfig.id == null ? "sys/tblshelfconfig/save" : "sys/tblshelfconfig/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblShelfConfig),
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
				    url: baseURL + "sys/tblshelfconfig/delete",
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
			$.get(baseURL + "sys/tblshelfconfig/info/"+id, function(r){
                vm.tblShelfConfig = r.tblShelfConfig;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'name' : vm.q.name ,   'postion' : vm.q.postion ,   'shelfCode' : vm.q.shelfCode ,   'description' : vm.q.description  },
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