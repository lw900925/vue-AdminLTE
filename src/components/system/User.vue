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
                    <th>角色</th>
                    <th>账户过期状态</th>
                    <th>账户锁定状态</th>
                    <th>密码过期状态</th>
                    <th>状态</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Constants from '@/utils/constants'
    import Datatables from "@/utils/datatables";
    import Basic from "@/utils/basic";

    export default {
        name: "User",
        mounted: function () {
            this.$nextTick(function () {
                const editor = new $.fn.dataTable.Editor({
                    // ajax: '/user',
                    ajax: function (method, url, editor, success, error) {
                        console.log(editor);
                        let action = editor.action;
                        if (action === "create") {

                        }
                    },
                    table: '#user',
                    idSrc: 'username',
                    fields: [
                        {label: "用户名", name: "username"}
                    ],
                    i18n: Constants.editor.i18n.zh_CN
                }).on("initEdit", function () {
                    editor.field("username").disable();
                });


                $("#user").DataTable(Datatables.options({
                    ajax: function (data, callback, setting) {
                        const params = Datatables.pageable(data, callback, setting);
                        if (Basic.notNull(data.search.value) && Basic.notBlank(data.search.value)) {
                            params.search = data.search.value;
                        }

                        let result = {};
                        Vue.axios.get("/users", {
                            params: params
                        }).then(response => {
                            result = Datatables.result(data.draw, response.data.page.totalElements, response.data._embedded.userResourceList);
                            callback(result)
                        });
                    },
                    columns: [
                        {data: "username"},
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
                            data: "accountNonExpired",
                            render: function (data, type, row, metadata) {
                                return data === 1 ? "未过期" : "过期"
                            }
                        },
                        {
                            data: "accountNonLocked",
                            render: function (data, type, row, metadata) {
                                return data === 1 ? "未锁定" : "锁定"
                            }
                        },
                        {
                            data: "accountNonLocked",
                            render: function (data, type, row, metadata) {
                                return data === 1 ? "未过期" : "过期"
                            }
                        },
                        {
                            data: "enabled",
                            render: function (data, type, row, metadata) {
                                return data === 1 ? "启用" : "禁用"
                            }
                        },
                    ],
                    buttons: [
                        {extend: 'create', editor: editor, text: '创建'},
                        {extend: 'edit', editor: editor, text: '编辑'},
                        {extend: 'remove', editor: editor, text: '删除'}
                    ]
                }));
            });
        }
    }
</script>

<style scoped>

</style>
