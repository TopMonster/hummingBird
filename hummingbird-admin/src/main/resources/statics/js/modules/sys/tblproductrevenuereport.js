$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblproductrevenuereport/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '统计日期', name: 'statDate', index: 'stat_date', width: 100 }, 			
			{ label: '产品名称', name: 'productName', index: 'product_name', width: 100 }, 			
			{ label: '产品类型', name: 'productType', index: 'product_type', width: 100 }, 			
			{ label: '产品编码', name: 'productCode', index: 'product_code', width: 100 }, 			
			{ label: '产品总点击', name: 'totalProductClick', index: 'total_product_click', width: 100 }, 			
			{ label: '首页货架页点击', name: 'indexShelfClick', index: 'index_shelf_click', width: 100 }, 			
			{ label: '首页推荐位点击', name: 'indexRecommandClick', index: 'index_recommand_click', width: 100 }, 			
			{ label: '榜单点击', name: 'rankClick', index: 'rank_click', width: 100 }, 			
			{ label: '大全点击', name: 'daquanClick', index: 'daquan_click', width: 100 }, 			
			{ label: 'banner点击数', name: 'bannerClick', index: 'banner_click', width: 100 }, 			
			{ label: 'CPA', name: 'cpa', index: 'cpa', width: 100 }, 			
			{ label: 'CPS', name: 'cps', index: 'cps', width: 100 }, 			
			{ label: 'CPC', name: 'cpc', index: 'cpc', width: 100 }, 			
			{ label: '甲方反馈注册数', name: 'feedbackRegister', index: 'feedback_register', width: 100 }, 			
			{ label: 'CPC手动录入数', name: 'cpcInput', index: 'cpc_input', width: 100 }, 			
			{ label: '甲方反馈放款额', name: 'feedbackLoanAmount', index: 'feedback_loan_amount', width: 100 }, 			
			{ label: '点击到注册转化率', name: 'clickRegisterRate', index: 'click_register_rate', width: 100 }, 			
			{ label: '收入', name: 'profits', index: 'profits', width: 100 }, 			
			{ label: '点击价值', name: 'clickValue', index: 'click_value', width: 100 }			
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
	    	statDateStart : null , 	 statDateEnd : null,  productName : null ,  productType : null ,   productCode : null },
		showList: true,
		title: null,
		tblProductRevenueReport: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblproductrevenuereport/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblProductRevenueReport = {};
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
			var url = vm.tblProductRevenueReport.id == null ? "sys/tblproductrevenuereport/save" : "sys/tblproductrevenuereport/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblProductRevenueReport),
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
				    url: baseURL + "sys/tblproductrevenuereport/delete",
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
			$.get(baseURL + "sys/tblproductrevenuereport/info/"+id, function(r){
                vm.tblProductRevenueReport = r.tblProductRevenueReport;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'statDateStart' : vm.q.statDateStart ,  'statDateEnd' : vm.q.statDateEnd ,  'productName' : vm.q.productName ,   'productType' : vm.q.productType ,   'productCode' : vm.q.productCode },
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