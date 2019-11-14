$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tbloverallrevenuereport/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '统计日期', name: 'statDate', index: 'stat_date', width: 100 }, 			
			{ label: '首页UV', name: 'indexPageUv', index: 'index_page_uv', width: 100 }, 
			{ label: '用户登录数', name: 'loginNum', index: 'login_num', width: 100 },
			{ label: '新用户UV', name: 'newUserUv', index: 'new_user_uv', width: 100 }, 			
			{ label: '点击用户数', name: 'userClickNum', index: 'user_click_num', width: 100 }, 			
			{ label: '点击用户占比', name: 'clickUserRate', index: 'click_user_rate', width: 100 }, 			
			{ label: '产品总点击数', name: 'totalProductClick', index: 'total_product_click', width: 100 }, 			
			{ label: '人均产品点击数', name: 'percapitaProductClick', index: 'percapita_product_click', width: 100 }, 			
			{ label: '产品总CPA', name: 'totalProductCpa', index: 'total_product_cpa', width: 100 }, 			
			{ label: '贷超总收入', name: 'totalRevenue', index: 'total_revenue', width: 100 }, 			
			{ label: '首页UV价值', name: 'indexUvValue', index: 'index_uv_value', width: 100 }, 			
			{ label: '用户价值', name: 'userValue', index: 'user_value', width: 100 }, 			
			{ label: '产品点击价值', name: 'productClickValue', index: 'product_click_value', width: 100 }, 			
			{ label: '推广H5总UV', name: 'marktingH5PageUv', index: 'markting_h5_page_uv', width: 100 }, 			
			{ label: '推广H5总注册数', name: 'totalMarktingRegister', index: 'total_markting_register', width: 100 }, 			
			{ label: '推广H5反馈注册数', name: 'totalFeedbackRegister', index: 'total_feedback_register', width: 100 }, 			
			{ label: '推广总激活数', name: 'totalDeviceActive', index: 'total_device_active', width: 100 }, 			
			{ label: '推广H5总消耗', name: 'totalPromotionCost', index: 'total_promotion_cost', width: 100 }, 			
			{ label: '注册成本', name: 'registerCost', index: 'register_cost', width: 100 }, 			
			{ label: '激活成本', name: 'activeCost', index: 'active_cost', width: 100 }, 			
			{ label: '贷超毛利', name: 'profits', index: 'profits', width: 100 }, 			
			{ label: '单日ROI', name: 'roi', index: 'roi', width: 100 }
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
	    	statDateStart : null , 	 statDateEnd : null },
		showList: true,
		title: null,
		tblOverallRevenueReport: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tbloverallrevenuereport/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblOverallRevenueReport = {};
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
			var url = vm.tblOverallRevenueReport.id == null ? "sys/tbloverallrevenuereport/save" : "sys/tbloverallrevenuereport/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblOverallRevenueReport),
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
				    url: baseURL + "sys/tbloverallrevenuereport/delete",
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
			$.get(baseURL + "sys/tbloverallrevenuereport/info/"+id, function(r){
                vm.tblOverallRevenueReport = r.tblOverallRevenueReport;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'statDateStart' : vm.q.statDateStart , 'statDateEnd' : vm.q.statDateEnd },
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