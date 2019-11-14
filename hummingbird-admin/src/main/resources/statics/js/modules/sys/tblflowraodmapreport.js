$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'sys/tblflowraodmapreport/list',
		datatype: "json",
		colModel: [
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '统计日期', name: 'statDate', index: 'stat_date', width: 100 },
			{ label: '打开appUV', name: 'openAppUv', index: 'open_app_uv', width: 100 },
			{ label: '首页UV', name: 'indexPageUv', index: 'index_page_uv', width: 100 },
			{ label: '大全页UV', name: 'daquanPageUv', index: 'daquan_page_uv', width: 100 },
			{ label: '榜单页UV', name: 'rankPageUv', index: 'rank_page_uv', width: 100 },
			{ label: '我的页UV', name: 'minePageUv', index: 'mine_page_uv', width: 100 },
			{ label: '首页点击用户数', name: 'indexPageClickUser', index: 'index_page_click_user', width: 100 },
			{ label: '首页点击用户占比', name: 'indexPageClickUserRate', index: 'index_page_click_user_rate', width: 100 },
			{ label: '首页点击产品数', name: 'indexPageProductClick', index: 'index_page_product_click', width: 100 },
			{ label: '首页人均点击产品数', name: 'indexPagePercapitaProductClick', index: 'index_page_percapita_product_click', width: 100 },
			{ label: '大全页点击用户数', name: 'daquanPageClickUser', index: 'daquan_page_click_user', width: 100 },
			{ label: '大全点击用户占比', name: 'daquanPageClickUserRate', index: 'daquan_page_click_user_rate', width: 100 },
			{ label: '大全产品点击数', name: 'daquanPageProductClick', index: 'daquan_page_product_click', width: 100 },
			{ label: '大全人均点击产品数', name: 'daquanPagePercapitaProductClick', index: 'daquan_page_percapita_product_click', width: 100 },
			{ label: '榜单点击用户数', name: 'rankPageClickUser', index: 'rank_page_click_user', width: 100 },
			{ label: '榜单点击用户占比', name: 'rankPageClickUserRate', index: 'rank_page_click_user_rate', width: 100 },
			{ label: '榜单产品点击数', name: 'rankPageProductClick', index: 'rank_page_product_click', width: 100 },
			{ label: '榜单人均点击产品数', name: 'rankPagePercapitaProductClick', index: 'rank_page_percapita_product_click', width: 100 },
			{ label: 'banner1点击率', name: 'banner1ClickRate', index: 'banner1_click_rate', width: 100 },
			{ label: 'banner2点击率', name: 'banner2ClickRate', index: 'banner2_click_rate', width: 100 },
			{ label: 'banner3点击率', name: 'banner3ClickRate', index: 'banner3_click_rate', width: 100 },
			{ label: 'ICON1点击率', name: 'icon1ClickRate', index: 'icon1_click_rate', width: 100 },
			{ label: 'ICON2点击率', name: 'icon2ClickRate', index: 'icon2_click_rate', width: 100 },
			{ label: 'ICON3点击率', name: 'icon3ClickRate', index: 'icon3_click_rate', width: 100 },
			{ label: 'ICON5点击率', name: 'icon4ClickRate', index: 'icon4_click_rate', width: 100 },
			{ label: '轮播图点击率', name: 'carouselClickRate', index: 'carousel_click_rate', width: 100 }
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
			statDateStart : null , statDateEnd : null ,	                	      	               openAppUv : null , 	                	      	               indexPageUv : null , 	                	      	               daquanPageUv : null , 	                	      	               rankPageUv : null , 	                	      	               minePageUv : null , 	                	      	               indexPageClickUser : null , 	                	      	               indexPageClickUserRate : null , 	                	      	               indexPageProductClick : null , 	                	      	               indexPagePercapitaProductClick : null , 	                	      	               daquanPageClickUser : null , 	                	      	               daquanPageClickUserRate : null , 	                	      	               daquanPageProductClick : null , 	                	      	               daquanPagePercapitaProductClick : null , 	                	      	               rankPageClickUser : null , 	                	      	               rankPageClickUserRate : null , 	                	      	               rankPageProductClick : null , 	                	      	               rankPagePercapitaProductClick : null , 	                	      	               banner1ClickRate : null , 	                	      	               banner2ClickRate : null , 	                	      	               banner3ClickRate : null , 	                	      	               icon1ClickRate : null , 	                	      	               icon2ClickRate : null , 	                	      	               icon3ClickRate : null , 	                	      	               icon4ClickRate : null 	                	    },
		showList: true,
		title: null,
		tblFlowRaodmapReport: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblflowraodmapreport/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;

		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblFlowRaodmapReport = {};
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
			var url = vm.tblFlowRaodmapReport.id == null ? "sys/tblflowraodmapreport/save" : "sys/tblflowraodmapreport/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.tblFlowRaodmapReport),
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
					url: baseURL + "sys/tblflowraodmapreport/delete",
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
			$.get(baseURL + "sys/tblflowraodmapreport/info/"+id, function(r){
				vm.tblFlowRaodmapReport = r.tblFlowRaodmapReport;
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{  'id' : vm.q.id ,   'statDateStart' : vm.q.statDateStart,'statDateEnd' : vm.q.statDateEnd ,   'openAppUv' : vm.q.openAppUv ,   'indexPageUv' : vm.q.indexPageUv ,   'daquanPageUv' : vm.q.daquanPageUv ,   'rankPageUv' : vm.q.rankPageUv ,   'minePageUv' : vm.q.minePageUv ,   'indexPageClickUser' : vm.q.indexPageClickUser ,   'indexPageClickUserRate' : vm.q.indexPageClickUserRate ,   'indexPageProductClick' : vm.q.indexPageProductClick ,   'indexPagePercapitaProductClick' : vm.q.indexPagePercapitaProductClick ,   'daquanPageClickUser' : vm.q.daquanPageClickUser ,   'daquanPageClickUserRate' : vm.q.daquanPageClickUserRate ,   'daquanPageProductClick' : vm.q.daquanPageProductClick ,   'daquanPagePercapitaProductClick' : vm.q.daquanPagePercapitaProductClick ,   'rankPageClickUser' : vm.q.rankPageClickUser ,   'rankPageClickUserRate' : vm.q.rankPageClickUserRate ,   'rankPageProductClick' : vm.q.rankPageProductClick ,   'rankPagePercapitaProductClick' : vm.q.rankPagePercapitaProductClick ,   'banner1ClickRate' : vm.q.banner1ClickRate ,   'banner2ClickRate' : vm.q.banner2ClickRate ,   'banner3ClickRate' : vm.q.banner3ClickRate ,   'icon1ClickRate' : vm.q.icon1ClickRate ,   'icon2ClickRate' : vm.q.icon2ClickRate ,   'icon3ClickRate' : vm.q.icon3ClickRate ,   'icon4ClickRate' : vm.q.icon4ClickRate  },
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