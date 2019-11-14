$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblphonecollectrecord/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: 'createdTime', index: 'created_time', width: 100 }, 			
			{ label: '', name: 'updatedTime', index: 'updated_time', width: 100 }, 			
			{ label: '手机号', name: 'phone', index: 'phone', width: 100 }, 			
			{ label: '渠道编码', name: 'channelCode', index: 'channel_code', width: 100 }, 			
			{ label: '操作系统', name: 'os', index: 'os', width: 100 }, 			
			{ label: '代理', name: 'userAgent', index: 'user_agent', width: 100 }, 			
			{ label: 'ip地址', name: 'ip', index: 'ip', width: 100 }, 			
			{ label: '注册结果', name: 'registerResult', index: 'register_result', width: 100 }			
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
	    	               	      	               createdTime : null , 	                	      	               updatedTime : null , 	                	      	               phone : null , 	                	      	               channelCode : null , 	                	      	               os : null , 	                	      	               userAgent : null , 	                	      	               ip : null , 	                	      	               registerResult : null 	                	    },
		showList: true,
		title: null,
		tblPhoneCollectRecord: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblphonecollectrecord/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblPhoneCollectRecord = {};
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
			var url = vm.tblPhoneCollectRecord.id == null ? "sys/tblphonecollectrecord/save" : "sys/tblphonecollectrecord/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblPhoneCollectRecord),
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
				    url: baseURL + "sys/tblphonecollectrecord/delete",
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
			$.get(baseURL + "sys/tblphonecollectrecord/info/"+id, function(r){
                vm.tblPhoneCollectRecord = r.tblPhoneCollectRecord;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'phone' : vm.q.phone ,   'channelCode' : vm.q.channelCode ,   'os' : vm.q.os ,   'userAgent' : vm.q.userAgent ,   'ip' : vm.q.ip ,   'registerResult' : vm.q.registerResult  },
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