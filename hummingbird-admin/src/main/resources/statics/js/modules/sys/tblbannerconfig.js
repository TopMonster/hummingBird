$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblbannerconfig/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '类型', name: 'type', index: 'type', width: 100 },
			{ label: 'banner编码', name: 'bannerCode', index: 'banner_code', width: 100 }, 			
			{ label: '排序', name: 'orderNum', index: 'order_num', width: 100 }, 			
			{ label: '跳转url', name: 'jumpUrl', index: 'jump_url', width: 100 }, 			
			{ label: '图片地址', name: 'imgUrl', index: 'img_url', width: 100 }, 			
			{ label: '跳转到产品id', name: 'jumpProduct', index: 'jump_product', width: 100 },
            { label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 },
            { label: '修改时间', name: 'updatedTime', index: 'updated_time', width: 100 }
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
            vm.tblBannerConfig.imgUrl = r.url;
            alert(vm.tblBannerConfig.imgUrl);
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
	    	               	      	               createdTime : null , 	                	      	               updatedTime : null , 	                	      	               type : null , 	                	      	               bannerCode : null , 	                	      	               orderNum : null , 	                	      	               jumpUrl : null , 	                	      	               imgUrl : null , 	                	      	               jumpProduct : null 	                	    },
		showList: true,
		title: null,
		tblBannerConfig: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblbannerconfig/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblBannerConfig = {};
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
			var url = vm.tblBannerConfig.id == null ? "sys/tblbannerconfig/save" : "sys/tblbannerconfig/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblBannerConfig),
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
				    url: baseURL + "sys/tblbannerconfig/delete",
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
			$.get(baseURL + "sys/tblbannerconfig/info/"+id, function(r){
                vm.tblBannerConfig = r.tblBannerConfig;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'type' : vm.q.type ,   'bannerCode' : vm.q.bannerCode ,   'orderNum' : vm.q.orderNum ,   'jumpUrl' : vm.q.jumpUrl ,   'imgUrl' : vm.q.imgUrl ,   'jumpProduct' : vm.q.jumpProduct  },
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