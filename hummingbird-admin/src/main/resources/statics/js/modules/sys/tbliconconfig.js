$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tbliconconfig/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 }, 			
			{ label: '修改时间', name: 'updatedTime', index: 'updated_time', width: 100 }, 			
			{ label: '图标url', name: 'iconUrl', index: 'icon_url', width: 100 }, 			
			{ label: '图标图片', name: 'iconMsg', index: 'icon_msg', width: 100 }, 			
			{ label: '排序', name: 'orderNum', index: 'order_num', width: 100 }, 			
			{ label: '跳转url', name: 'jumpUrl', index: 'jump_url', width: 100 }			
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
    new AjaxUpload('#upload', {
        action: baseURL + "sys/oss/upload",
        name: 'file',
        autoSubmit: true,
        responseType: "json",
        onSubmit: function (file, extension) {
          if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))) {
            alert('只支持jpg、png、gif格式的图片！');
            return false;
          }
        },
        onComplete: function (file, r) {
      	  console.log(r);
      	  console.log(file);
          if (r.code == 0) {
            alert(r.url);
            vm.tblIconConfig.iconUrl = r.url
            // vm.reload();
          } else {
            alert(r.msg);
          }
        }
      });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
	    q:{
	    	               	      	               createdTime : null , 	                	      	               updatedTime : null , 	                	      	               iconUrl : null , 	                	      	               iconMsg : null , 	                	      	               orderNum : null , 	                	      	               jumpUrl : null 	                	    },
		showList: true,
		title: null,
		tblIconConfig: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tbliconconfig/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblIconConfig = {};
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
			var url = vm.tblIconConfig.id == null ? "sys/tbliconconfig/save" : "sys/tbliconconfig/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblIconConfig),
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
				    url: baseURL + "sys/tbliconconfig/delete",
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
			$.get(baseURL + "sys/tbliconconfig/info/"+id, function(r){
                vm.tblIconConfig = r.tblIconConfig;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'iconUrl' : vm.q.iconUrl ,   'iconMsg' : vm.q.iconMsg ,   'orderNum' : vm.q.orderNum ,   'jumpUrl' : vm.q.jumpUrl  },
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