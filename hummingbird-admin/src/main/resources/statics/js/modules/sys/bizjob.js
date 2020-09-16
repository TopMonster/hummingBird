$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/bizjob/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '职位名称', name: 'name', index: 'name', width: 100 }, 			
			{ label: '所在城市', name: 'city', index: 'city', width: 100 }, 			
			{ label: '职位类型', name: 'type', index: 'type', width: 100 }, 			
			{ label: '公司类型', name: 'companyType', index: 'company_type', width: 100 }, 			
			{ label: '学历', name: 'education', index: 'education', width: 100 }, 			
			{ label: '空缺数量', name: 'vacancyNum', index: 'vacancy_num', width: 100 }, 			
			{ label: '职责描述', name: 'duty', index: 'duty', width: 100 }, 			
			{ label: '状态', name: 'status', index: 'status', width: 100 }, 			
			{ label: '创建时间', name: 'createdTime', index: 'created_time', width: 100 }, 			
			{ label: '最后更新时间', name: 'updatedTime', index: 'updated_time', width: 100 }, 			
			{ label: '发布日期', name: 'publishDate', index: 'publish_date', width: 100 }			
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
});

var vm = new Vue({
	el:'#rrapp',
	data:{
	    q:{
	    	               	      	               name : null , 	                	      	               city : null , 	                	      	               type : null , 	                	      	               companyType : null , 	                	      	               education : null , 	                	      	               vacancyNum : null , 	                	      	               duty : null , 	                	      	               status : null , 	                	      	               createdTime : null , 	                	      	               updatedTime : null , 	                	      	               publishDate : null 	                	    },
		showList: true,
		title: null,
		bizJob: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/bizjob/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.bizJob = {};
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
			var url = vm.bizJob.id == null ? "sys/bizjob/save" : "sys/bizjob/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.bizJob),
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
				    url: baseURL + "sys/bizjob/delete",
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
			$.get(baseURL + "sys/bizjob/info/"+id, function(r){
                vm.bizJob = r.bizJob;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'name' : vm.q.name ,   'city' : vm.q.city ,   'type' : vm.q.type ,   'companyType' : vm.q.companyType ,   'education' : vm.q.education ,   'vacancyNum' : vm.q.vacancyNum ,   'duty' : vm.q.duty ,   'status' : vm.q.status ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'publishDate' : vm.q.publishDate  },
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