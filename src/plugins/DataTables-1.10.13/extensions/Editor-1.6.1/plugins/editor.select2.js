/**
 * 这个是DataTables Editor的插件，用于提供jQuery Select2的能力。
 * DataTables Editor官方提供了一个select2的插件扩展，不过它是收费的（Editor本身也是收费的），并且没有提供评估版，
 * 所以，我按照官方文档中提供的方法实现了一个简单的select2的扩展。
 *
 * 用法:
 *
 * 1.确保在引入该插件之前引入DataTables和Editor
 * 2.代码示例：
 *  const editor = $.fn.dataTable.Editor({
 *      ....
 *
 *      fields: [
 *          {
 *              label: "My Select2",
 *              name: "my_attr",
 *              type: "select2",
 *              options: [
 *                  { label: "Option A", value: "A" },
                    { label: "Option B", value: "B" },
                    { label: "Option C", value: "C" }
 *              ],
 *              config: {
 *                  placeholder: 'This is my placeholder',
 *                  allowClear: true
 *              }
 *          }
 *      ]
 *  });
 *
 *  Reference:
 *      - DataTables Editor Custom field type plug-ins:
 *          https://editor.datatables.net/examples/plug-ins/fieldPlugin.html
 *      - Select2 Documentation:
 *          https://select2.org/
 *
 * @author liuwei (lw900925@163.com)
 */
(function ($, DataTable) {
    if (!DataTable.ext.editorFields) {
        DataTable.ext.editorFields = {};
    }

    const Editor = DataTable.Editor;
    const _fieldTypes = DataTable.ext.editorFields;

    _fieldTypes.select2 = {
        create: function (conf) {
            // 拼接dom
            const options = conf.options;
            let dom = "<div id='" + Editor.safeId(conf.id) + "'>";
            dom += "<select class='form-control select2' style='width: 100%;'>";
            if (options) {
                $.each(options, function (index, option) {
                    dom += "<option value='" + option.value + "'>" + option.label + "</option>";
                });
            }
            dom += "</select>";
            dom += "</div>";

            // 初始化
            conf._enabled = true;
            conf._input = $(dom);

            const select2Options = conf.config;
            $('select', conf._input).select2(select2Options);
            return conf._input;
        },

        get: function (conf) {
            return $(conf._input).val();
        },

        set: function (conf, value) {
            $(conf._input).val(value);
        },

        enable: function ( conf ) {
            conf._enabled = true;
            $(conf._input).removeClass( 'disabled' );
        },

        disable: function ( conf ) {
            conf._enabled = false;
            $(conf._input).addClass( 'disabled' );
        }
    };
})(jQuery, jQuery.fn.dataTable);
