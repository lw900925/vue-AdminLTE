<template>
    <!-- Your Page Content Here -->
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">用户</h3>
        </div>
        <div class="box-body table-responsive">
            <table id="user" class="table table-hover">
                <thead>
                <tr>
                    <th>用户名</th>
                    <th>昵称</th>
                    <th>电子邮箱</th>
                    <th>角色</th>
                    <th>状态</th>
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
        name: "User",
        mounted: function () {
            this.$nextTick(function () {
                const editor = new $.fn.dataTable.Editor({
                    ajax: function (method, url, editor, success, error) {
                        console.log(editor);
                        let action = editor.action;
                        if (action === "create") {

                        }
                    },
                    table: '#user',
                    idSrc: 'username',
                    fields: [
                        { label: "用户名", name: "username" },
                        { label: "昵称", name: "displayName" },
                        { label: "电子邮箱", name: "email" },
                        {
                            label: "状态",
                            name: "enabled",
                            type: "radio",
                            options: [
                                { label: "启用", value: true },
                                { label: "禁用", value: false }
                            ]
                        },
                        {
                            label: "角色",
                            name: "role",
                            type: "select2",
                            options: [
                                { label: "Alaska", value: "Alaska" },
                                { label: "California", value: "California" },
                                { label: "Delaware", value: "Delaware" }
                            ],
                            config: {
                                placeholder: 'This is my placeholder',
                                allowClear: true
                            }
                        },
                        { label: "简介", name: "content", type: "textarea" }
                    ],
                    i18n: Constants.editor.i18n.zh_CN
                }).on("open", function (event, main, action) {
                    $("textarea", editor.s.fields["content"].dom.container).tinymce({
                        theme: "modern",
                        skin_url: "https://cdn.bootcss.com/tinymce/4.7.13/skins/lightgray"
                    });
                });


                $("#user").DataTable(DataTables.options({
                    ajax: function (data, callback, setting) {
                        const params = DataTables.pageable(data, callback, setting);
                        if (Basic.notNull(data.search.value) && Basic.notBlank(data.search.value)) {
                            params.search = data.search.value;
                        }

                        let result = {};
                        Vue.axios.get("/users", {
                            params: params
                        }).then(response => {
                            result = DataTables.result(data.draw, response.data.totalElements, response.data.content);
                            callback(result)
                        });
                    },
                    columns: [
                        { data: "username" },
                        { data: "displayName" },
                        { data: "email" },
                        {
                            data: "authorities",
                            orderable: false,
                            render: function (data, type, row, metadata) {
                                return $(data).map(function () {
                                    return this.authority
                                }).get().join(",")
                            }
                        },
                        {
                            data: "enabled",
                            render: function (data, type, row, metadata) {
                                return data ? "启用" : "禁用"
                            }
                        }
                    ],
                    buttons: [
                        {extend: 'create', editor: editor, text: '创建'},
                        {extend: 'edit', editor: editor, text: '编辑'},
                        {extend: 'remove', editor: editor, text: '删除'},
                        {
                            text: '刷新',
                            action: function (event, datatable, node, config) {
                                alert('你点击了这个按钮')
                            }
                        }
                    ]
                }));
            });
        }
    }
</script>

<style scoped>
    div.modal-dialog {
        left: 1em;
        right: 1em;
        margin-left: 0;
        width: auto;
    }
</style>
