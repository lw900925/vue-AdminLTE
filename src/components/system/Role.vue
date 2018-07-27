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
                        // {extend: 'create', editor: editor, text: '创建'},
                        // {extend: 'edit', editor: editor, text: '编辑'},
                        // {extend: 'remove', editor: editor, text: '删除'},
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
