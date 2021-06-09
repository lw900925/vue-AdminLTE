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
                    ajax: function (method, url, object, successCallback, errorCallback) {
                        let action = object.action;
                        let data = object.data;
                        let output = { data: []};
                        let param = {};
                        method = DataTables.Editor.ajaxType(action);
                        url = "/users";

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
                            errorCallback();
                        });
                    },
                    table: '#user',
                    idSrc: 'username',
                    fields: [
                        {
                            label: "用户名",
                            name: "username",
                            validate: ["required"]
                        },
                        {
                            label: "密码",
                            name: "password",
                            type: "password"
                        },
                        {
                            label: "昵称",
                            name: "displayName",
                        },
                        {
                            label: "电子邮箱",
                            name: "email",
                        },
                        {
                            label: "手机号",
                            name: "phoneNumber"
                        },
                        {
                            label: "生日",
                            name: "birthday",
                            type: "datetime",
                            opts: {
                                minDate: new Date("1900-01-01"),
                                maxDate: new Date(),
                                showWeekNumber: true
                            }
                        },
                        {
                            label: "状态",
                            name: "enabled",
                            type: "radio",
                            def: true,
                            options: [
                                { label: "启用", value: true },
                                { label: "禁用", value: false }
                            ]
                        },
                        {
                            label: "账号已过期",
                            name: "accountNonExpired",
                            type: "radio",
                            def: true,
                            options: [
                                { label: "未过期", value: true },
                                { label: "已过期", value: false }
                            ]
                        },
                        {
                            label: "账号已锁定",
                            name: "accountNonLocked",
                            type: "radio",
                            def: true,
                            options: [
                                { label: "未锁定", value: true },
                                { label: "已锁定", value: false }
                            ]
                        },
                        {
                            label: "密码已过期",
                            name: "credentialsNonExpired",
                            type: "radio",
                            def: true,
                            options: [
                                { label: "未过期", value: true },
                                { label: "已过期", value: false }
                            ]
                        },
                        {
                            label: "角色",
                            name: "authorities",
                            className: "select2",
                            type: "select",
                            options: [],
                            validate: ["required"]
                        },
                        {
                            name: "avatarUrl",
                            type: "hidden"
                        },
                        {
                            name: "profile.theme",
                            type: "hidden"
                        },
                        {
                            name: "profile.language",
                            type: "hidden"
                        },
                        {
                            name: "profile.username",
                            type: "hidden"
                        }
                    ],
                    i18n: Constants.editor.i18n.zh_CN
                }).on("open", function (event, main, action) {
                    // $("textarea", editor.s.fields["content"].dom.container).tinymce({
                    //     theme: "modern",
                    //     skin_url: "https://cdn.bootcss.com/tinymce/4.7.13/skins/lightgray"
                    // });

                    // 渲染表单控件样式
                    DataTables.Editor.requiredFieldLabel(editor, "render");

                    let authorities = [];
                    let options = [];
                    if (action === "edit") {
                        // 拥有的角色，转换成Option对象，并设置到select2的选项集中
                        authorities = editor.s.editFields[editor.field("username").val()].data["authorities"];
                        options = $.map(authorities, function (item) {
                            return new Option(item.description, item.authority, true, true);
                        });

                        // 清除密码
                        editor.field("password").val("");

                        // 用户名不许修改
                        editor.field("username").disable();
                    } else {
                        editor.field("username").enable();
                    }

                    // 加载角色
                    $("select", editor.s.fields["authorities"].dom.container).select2({
                        placeholder: '--- 请选择 ---',
                        allowClear: true,
                        multiple: true,
                        language: "zh-CN",
                        ajax: {
                            url: Constants.api.baseURI + "/roles",
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
                                        if ($.inArray(item.authority, authorities) > 0) {
                                            return { id: item.authority, text: item.description, selected: true };
                                        } else {
                                            return { id: item.authority, text: item.description };
                                        }
                                    })
                                };
                            }
                        }
                    }).append(options).parent().find("span.select2-container").width("100%");

                }).on("preSubmit", function (event, object, action) {
                    editor.field("username").enable();

                    if (action === "create" || action === "edit") {

                        let dataKey;
                        if (action === "create") {
                            dataKey = "0";
                        } else if (action === "edit") {
                            dataKey = editor.field("username").val();
                        }

                        // 提交之前修改数据
                        object.data[dataKey].authorities = $.map($("select", editor.s.fields["authorities"].dom.container).val(), function (element) {
                            return { authority: element }
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
                    $("select", editor.s.fields["authorities"].dom.container).find("option:selected").remove();
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
                                    return this.description
                                }).get().join("，")
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
