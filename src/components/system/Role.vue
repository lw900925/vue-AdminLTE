<template>
    <!-- Your Page Content Here -->
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">角色</h3>
        </div>
        <div class="box-body table-responsive">
            <table id="role" class="table table-hover">
                <thead>
                <tr>
                    <th>名称</th>
                    <th>描述</th>
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
        name: "Role",
        mounted: function () {
            this.$nextTick(function () {
                const editor = new $.fn.dataTable.Editor({
                    ajax: function (method, url, object, successCallback, errorCallback) {
                        let action = object.action;
                        let data = object.data;
                        let output = { data: []};
                        let param = {};
                        method = DataTables.Editor.ajaxType(action);
                        url = "/roles";

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
                    table: '#role',
                    idSrc: 'authority',
                    fields: [
                        {
                            label: "名称",
                            name: "authority",
                            validate: ["required"]
                        },
                        {
                            label: "描述",
                            name: "description",
                        },
                        {
                            label: "资源",
                            name: "resources",
                            className: "select2",
                            type: "select",
                            options: []
                        }
                    ],
                    i18n: Constants.editor.i18n.zh_CN
                }).on("open", function (event, main, action) {
                    // 渲染表单控件样式
                    DataTables.Editor.requiredFieldLabel(editor, "render");
                    
                    let resources = [];
                    let options = [];
                    if (action === "edit") {
                        // 拥有的资源，转换成Option对象，并设置到select2的选项集中
                        resources = editor.s.editFields[editor.field("authority").val()].data["resources"];
                        options = $.map(resources, function (item) {
                            return new Option(item.resourceName, item.oid, true, true);
                        });
                    
                        // 名称不许修改
                        editor.field("authority").disable();
                    } else {
                        editor.field("authority").enable();
                    }
                    
                    // 加载资源
                    $("select", editor.s.fields["resources"].dom.container).select2({
                        placeholder: '--- 请选择 ---',
                        allowClear: true,
                        multiple: true,
                        language: "zh-CN",
                        ajax: {
                            url: Constants.api.baseURI + "/resources",
                            type: "GET",
                            data: {
                                size: Constants.api.maxRow
                            },
                            headers: {
                                Authorization: "Bearer " + window.$cookies.get(Constants.api.tokenKey)
                            },
                            dataType: "json",
                            processResults: function (response) {
                                return {
                                    results: $.map(response.content, function (item) {
                                        if ($.inArray(item.oid, resources) > 0) {
                                            return { id: item.oid, text: item.resourceName, selected: true };
                                        } else {
                                            return { id: item.oid, text: item.resourceName };
                                        }
                                    })
                                };
                            }
                        }
                    }).append(options).parent().find("span.select2-container").width("100%");
                }).on("preSubmit", function (event, object, action) {
                    editor.field("authority").enable();

                    if (action === "create" || action === "edit") {

                        let dataKey;
                        if (action === "create") {
                            dataKey = "0";
                        } else if (action === "edit") {
                            dataKey = editor.field("authority").val();
                        }
                        
                        // 填充资源
                        object.data[dataKey].resources = $.map($("select", editor.s.fields["resources"].dom.container).val(), function (element) {
                            return { oid: element }
                        });

                        // 提交之前对数据校验
                        DataTables.Editor.validate(editor, object.data[dataKey]);
                    }

                    if (editor.inError()) {
                        return false;
                    }
                }).on("close", function (event) {
                    // 清除渲染
                    DataTables.Editor.requiredFieldLabel(editor, "clear");
                    $("select", editor.s.fields["resources"].dom.container).find("option:selected").remove();
                });

                $("#role").DataTable(DataTables.options({
                    ajax: function (data, callback, setting) {
                        const params = DataTables.pageable(data, callback, setting);
                        if (Basic.notNull(data.search.value) && Basic.notBlank(data.search.value)) {
                            params.search = data.search.value;
                        }

                        let result = {};
                        Vue.axios.get("/roles", {
                            params: params
                        }).then(response => {
                            result = DataTables.result(data.draw, response.data.totalElements, response.data.content);
                            callback(result)
                        });
                    },
                    columns: [
                        { data: "authority" },
                        { data: "description" }
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
                    ]
                }));
            });
        }
    }
</script>

<style scoped>

</style>
