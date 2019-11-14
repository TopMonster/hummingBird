$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblbrowsinghistory/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '用户id', name: 'userId', index: 'user_id', width: 100 }, 			
			{ label: '产品id', name: 'productCode', index: 'product_code', width: 100 }, 			
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 }, 			
			{ label: '记录日期', name: 'recordDate', index: 'record_date', width: 100 }			
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

    laydate.render({
        elem: '#statDate',
        done: function(value, date, endDate){
            vm.q.statDate=value;  
          }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
	    q:{
	    	               	      	               userId : null , 	                	      	               productCode : null , 	                	      	               createdTime : null , 	                	      	               recordDate : null 	                	    },
		showList: true,
		title: null,
		tblBrowsingHistory: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblbrowsinghistory/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblBrowsingHistory = {};
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
			var url = vm.tblBrowsingHistory.id == null ? "sys/tblbrowsinghistory/save" : "sys/tblbrowsinghistory/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblBrowsingHistory),
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
				    url: baseURL + "sys/tblbrowsinghistory/delete",
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
			$.get(baseURL + "sys/tblbrowsinghistory/info/"+id, function(r){
                vm.tblBrowsingHistory = r.tblBrowsingHistory;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'userId' : vm.q.userId ,   'productCode' : vm.q.productCode ,   'createdTime' : vm.q.createdTime ,   'recordDate' : vm.q.recordDate  },
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