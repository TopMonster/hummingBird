$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tblproductshelfrelation/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', index: 'Id', width: 50, key: true},
            {label: '货架编码', name: 'shelfCode', index: 'shelf_code', width: 100},
            {label: '货架名称', name: 'shelfName', index: 'shelf_name', width: 100},
            {label: '产品编码', name: 'productCode', index: 'product_code', width: 100},
            {label: '产品名称', name: 'productName', index: 'product_name', width: 100},
            {label: '排序', name: 'orderNum', index: 'order_num', width: 100},
            {label: '创建时间', name: 'createdTime', index: 'created_time', width: 100},
            {label: '更新时间', name: 'updatedTime', index: 'updated_time', width: 100}
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条

        }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            createdTime: null, updatedTime: null, productCode: null, shelfCode: null, orderNum: null
        },
        showList: true,
        title: null,
        tblProductShelfRelation: {},
        productList: []
    },
    methods: {
        query: function () {
            vm.reload();
        },
        e_export: function () {
            var url = "sys/tblproductshelfrelation/export?" + vm.foramtQueryData(vm.q);
            window.location.href = baseURL + url;

        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.tblProductShelfRelation = {};
        },
        update: function (event) {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        saveOrUpdate: function (event) {
            var url = vm.tblProductShelfRelation.id == null ? "sys/tblproductshelfrelation/save" : "sys/tblproductshelfrelation/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.tblProductShelfRelation),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/tblproductshelfrelation/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (id) {
            $.get(baseURL + "sys/tblproductshelfrelation/info/" + id, function (r) {
                vm.tblProductShelfRelation = r.tblProductShelfRelation;
            });
        },
        getAllOnlineProductList: function(){
            $.get(baseURL + "sys/tblproductconfig/listAll", function(r){
                vm.productList = r.data;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'id': vm.q.id,
                    'createdTime': vm.q.createdTime,
                    'updatedTime': vm.q.updatedTime,
                    'productCode': vm.q.productCode,
                    'shelfCode': vm.q.shelfCode,
                    'orderNum': vm.q.orderNum
                },
                page: page
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

vm.getAllOnlineProductList();