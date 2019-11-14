$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblproductconfig/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			{ label: '产品类型', name: 'productType', index: 'product_type', width: 100 },
			{ label: '产品名称', name: 'productName', index: 'product_name', width: 100 }, 			
			{ label: '产品编码', name: 'productCode', index: 'product_code', width: 100 }, 			
			{ label: '产品logo', name: 'productLogo', index: 'product_logo', width: 100 }, 			
			{ label: '产品url', name: 'productUrl', index: 'product_url', width: 100 }, 			
			{ label: '产品标签', name: 'productTag', index: 'product_tag', width: 100 }, 			
			{ label: '利率文案', name: 'productRate', index: 'product_rate', width: 100 }, 			
			{ label: '额度文案', name: 'productLimit', index: 'product_limit', width: 100 }, 			
			{ label: '放款成功率', name: 'loanSucMsg', index: 'loan_suc_msg', width: 100 }, 			
			{ label: '放款人数', name: 'loanNum', index: 'loan_num', width: 100 }, 			
			{ label: '产品宣传语', name: 'slogan', index: 'slogan', width: 100 }, 			
			{ label: '支持展示客户端', name: 'showTerminal', index: 'show_terminal', width: 100 }, 			
			{ label: '机构名称', name: 'partnerName', index: 'partner_name', width: 100 }, 			
			{ label: '对接商务', name: 'business', index: 'business', width: 100 }, 			
			{ label: 'CPA单价', name: 'cpa', index: 'cpa', width: 100 }, 			
			{ label: 'CPC单价', name: 'cpc', index: 'cpc', width: 100 }, 			
			{ label: 'CPS比例', name: 'cps', index: 'cps', width: 100 }, 			
			{ label: '备注', name: 'description', index: 'description', width: 100 }, 			
			{ label: '状态', name: 'status', index: 'status', width: 100 },
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
    		  vm.tblProductConfig.productLogo = r.url;
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
	    	createdTime : null , 	                	      	               updatedTime : null , 	                	      	               productType : null , 	                	      	               productName : null , 	                	      	               productCode : null , 	                	      	               productLogo : null , 	                	      	               productUrl : null , 	                	      	               productTag : null , 	                	      	               productRate : null , 	                	      	               productLimit : null , 	                	      	               loanSucMsg : null , 	                	      	               loanNum : null , 	                	      	               slogan : null , 	                	      	               showTerminal : null , 	                	      	               partnerName : null , 	                	      	               business : "" , 	                	      	               cpa : null , 	                	      	               cpc : null , 	                	      	               cps : null , 	                	      	               description : null , 	                	      	               status : "" , 	                	      	               deptId : null 	                	    },
		showList: true,
		title: null,
		businessUserList:[],
		tblProductConfig: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		e_export: function () {
			var url = "sys/tblproductconfig/export?"+ vm.foramtQueryData(vm.q);
			window.location.href=baseURL + url;
			 
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tblProductConfig = {};
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
		getBusinessUserList: function(){
			$.get(baseURL + "sys/user/list-business", function(r){
                vm.businessUserList = r.data;
            });
		},
		saveOrUpdate: function (event) {
			var url = vm.tblProductConfig.id == null ? "sys/tblproductconfig/save" : "sys/tblproductconfig/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tblProductConfig),
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
				    url: baseURL + "sys/tblproductconfig/delete",
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
			$.get(baseURL + "sys/tblproductconfig/info/"+id, function(r){
                vm.tblProductConfig = r.tblProductConfig;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{  'id' : vm.q.id ,   'createdTime' : vm.q.createdTime ,   'updatedTime' : vm.q.updatedTime ,   'productType' : vm.q.productType ,   'productName' : vm.q.productName ,   'productCode' : vm.q.productCode ,   'productLogo' : vm.q.productLogo ,   'productUrl' : vm.q.productUrl ,   'productTag' : vm.q.productTag ,   'productRate' : vm.q.productRate ,   'productLimit' : vm.q.productLimit ,   'loanSucMsg' : vm.q.loanSucMsg ,   'loanNum' : vm.q.loanNum ,   'slogan' : vm.q.slogan ,   'showTerminal' : vm.q.showTerminal ,   'partnerName' : vm.q.partnerName ,   'business' : vm.q.business ,   'cpa' : vm.q.cpa ,   'cpc' : vm.q.cpc ,   'cps' : vm.q.cps ,   'description' : vm.q.description ,   'status' : vm.q.status ,   'deptId' : vm.q.deptId  },
                page:page
            }).trigger("reloadGrid");
		},
		foramtQueryData(json) {
			var arr = [];
			for (let i in json) {
				if (json[i]) {
					arr.push(i + '=' + json[i]);
				}
			}
			return arr.join('&');
		}
	}
});

vm.getBusinessUserList();