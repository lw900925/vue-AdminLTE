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

    export default {
        name: "User",
        mounted: function () {
            this.$nextTick(function () {
                $("#user").DataTable({
                    processing: true,
                    serverSide: true,
                    pageLength: 20,
                    ajax: function(data, callback, setting) {
                        var sortColumn = setting["aoColumns"][data.order[0].column]["mData"]
                        var sortDir = data.order[0].dir.toUpperCase()
                        var params = "page=" + (data.start / data.length) + "&size=" + data.length + "&sort=" + sortColumn + "," + sortDir
                        if (data.search.value != null && data.search.value.length > 0) {
                            params += "&search=" + data.search.value
                        }
                        var result = {}
                        Vue.axios.get("/users?" + params).then(response => {
                            result.draw = data.draw
                            result.recordsTotal = 0
                            result.recordsFiltered = 0
                            result.data = []
                            if (typeof (response.data["_embedded"]) !== "undefined") {
                                var page = response.data.page;
                                var resources = response.data._embedded.userResourceList
                                resources = $(resources).map(function () {
                                    return this.user
                                }).get()
                                result.recordsTotal = page.totalElements
                                result.recordsFiltered = page.totalElements
                                result.data = resources
                            }
                            callback(result)
                        })
                    },
                    columns: [
                        { data: "username" },
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
                    pagingType: 'full_numbers',
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Chinese.json'
                    },
                    select: {
                        style: 'os',
                        info: false
                    }
                })
            });
        }
    }
</script>

<style scoped>

</style>
