<template>
    <!-- Your Page Content Here -->
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">企业奖品</h3>
        </div>
        <div class="box-body table-responsive">
            <table id="prize" class="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>奖品名称</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>过期时间</th>
                    <th>最大面值</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>iPhone 6S Plus</td>
                    <td>实物</td>
                    <td>有效</td>
                    <td>2017-12-12</td>
                    <td>6,888</td>
                    <td></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>iPhone 7 Plus</td>
                    <td>实物</td>
                    <td>有效</td>
                    <td>2017-12-12</td>
                    <td>7,188</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Constants from '@/utils/constants';

    export default {
        name: 'prize',
        mounted: function () {
            this.$nextTick(function () {
                var editor = new $.fn.dataTable.Editor({
                    ajax: '/prize',
                    table: '#prize',
                    idSrc: 'oid',
                    fields: [
                        {label: "ID", name: 'oid'},
                        {label: "奖品名称", name: 'name'},
                        {label: "类型", name: 'type'},
                        {label: "过期时间", name: 'date'},
                        {label: "最大面值", name: 'amount'}
                    ],
                    i18n: Constants.datatables.editor.i18n.zh_CN

                }).on('open', function (event, main, action) {

                });

                $('#prize').DataTable({
                    dom: Constants.datatables.dom,
                    pagingType: 'full_numbers',
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Chinese.json'
                    },
                    select: {
                        style: 'os',
                        info: false
                    },
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
                });
            });
        }
    }
</script>

