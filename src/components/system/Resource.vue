<template>
    <!-- Your Page Content Here -->
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">资源</h3>
        </div>
        <div class="box-body table-responsive">
            <table id="resource" class="table table-hover">
                <thead>
                <tr>
                    <th>名称</th>
                    <th>描述</th>
                    <th>URI</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Constants from '@/utils/constants';
    import DataTables from "@/utils/datatables";
    import Basic from "@/utils/basic";

    export default {
        name: "Resource",
        mounted: function () {
            this.$nextTick(function () {
                const editor = new $.fn.dataTable.Editor({
                    ajax: function (method, url, object, successCallback, errorCallback) {
                        let action = object.action;
                        let data = object.data;
                        let output = { data: []};
                        let param = {};
                        method = DataTables.Editor.ajaxType(action);
                        url = "/resources";

                        $.each(data, function (key, value) {
                            if (action === "create" || action === "edit") {
                                param = value;
                            } else if (action === "remove") {
                                url += "/" + key;
                                param = null
                            }
                        });

                        output.data.push(param);

                        Vue.axios.request({
                            method: method,
                            url: url,
                            data: param
                        }).then(response => {
                            successCallback(output);
                        }).catch(error => {
                            errorCallback(error);
                        });
                    },
                    table: '#resource',
                    idSrc: 'oid',
                    fields: [
                        {
                            label: "oid",
                            name: "oid",
                            type: "hidden"
                        },
                        {
                            label: "名称",
                            name: "resourceName",
                            validate: ["required"]
                        },
                        {
                            label: "描述",
                            name: "description",
                        },
                        {
                            label: "URI",
                            name: "uri",
                            validate: ["required"]
                        },
                        {
                            label: "创建者",
                            name: "creator",
                            type: "hidden"
                        },
                        {
                            label: "创建时间",
                            name: "creationDate",
                            type: "hidden"
                        },
                    ],
                    i18n: Constants.editor.i18n.zh_CN
                }).on("open", function (event, main, action) {
                    // 渲染表单控件样式
                    DataTables.Editor.requiredFieldLabel(editor, "render");

                }).on("preSubmit", function (event, object, action) {
                    if (action === "create" || action === "edit") {

                        let dataKey;
                        if (action === "create") {
                            dataKey = "0";
                        } else if (action === "edit") {
                            dataKey = editor.field("oid").val();
                        }

                        // 提交之前对数据校验
                        DataTables.Editor.validate(editor, object.data[dataKey]);
                    }

                    if (editor.inError()) {
                        return false;
                    }
                }).on("close", function (event) {
                    // 清除渲染
                    DataTables.Editor.requiredFieldLabel(editor, "clear");
                });

                $("#resource").DataTable(DataTables.options({
                    ajax: function (data, callback, setting) {
                        const params = DataTables.pageable(data, callback, setting);
                        if (Basic.notNull(data.search.value) && Basic.notBlank(data.search.value)) {
                            params.search = data.search.value;
                        }

                        let result = {};
                        Vue.axios.get("/resources", {
                            params: params
                        }).then(response => {
                            result = DataTables.result(data.draw, response.data.totalElements, response.data.content);
                            callback(result)
                        });
                    },
                    columns: [
                        { data: "resourceName" },
                        { data: "description" },
                        { data: "uri" }
                    ],
                    buttons: [
                        {extend: 'create', editor: editor, text: '创建'},
                        {extend: 'edit', editor: editor, text: '编辑'},
                        {extend: 'remove', editor: editor, text: '删除'},
                        {
                            text: '刷新',
                            action: function (event, datatable, node, config) {
                                datatable.draw();
                            }
                        }
                        /*
                        {
                            extend: 'selectedSingle',
                            text: '获取',
                            action: function(event, datatable, node, config) {
                                const data = datatable.rows({selected: true}).data()[0];
                                const resourceId = data.oid;
                                this.$router.push({ path: '/resource/:resourceId', params: { resourceId }});
                                
                                
                            }
                        }*/
                    ]
                }));
            });
        }
    }
</script>

<style scoped>

</style>
