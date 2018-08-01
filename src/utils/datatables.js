import Constants from "@/utils/constants";
import Basic from "@/utils/basic";

export default {

    options: function (option) {
        const options = {};
        $.extend(true, options, Constants.datatables, option);
        return options;
    },

    pageable: function (data, callback, setting) {
        const property = setting["aoColumns"][data.order[0].column]["mData"];
        const direction = data.order[0].dir.toUpperCase();
        return {
            page: data.start / data.length,
            size: data.length,
            sort: property + "," + direction
        };
    },

    result: function (draw, total, data) {
        return {
            draw: draw,
            recordsTotal: Basic.notNull(total) ? total : 0,
            recordsFiltered: Basic.notNull(total) ? total : 0,
            data: Basic.notNull(total) ? data : []
        }
    },

    Editor: {
        ajaxType: function (action) {
            let type;
            switch (action) {
                case "create":
                    type = "POST";
                    break;
                case "edit":
                    type = "PUT";
                    break;
                case "remove":
                    type = "DELETE";
                    break;
                default:
                    type = "GET";
                    break;
            }
            return type;
        },

        requiredFieldLabel: function (editor, render) {
            $.each(editor.s.fields, function (index, field) {
                let validates = field.s.opts.validate;
                if ($.inArray("required", validates) >= 0) {
                    if (render === "render") {
                        $(field.dom.label).prepend('<span class="text-danger">*</span>')
                    } else if (render === "clear") {
                        $(field.dom.label).find("span.text-danger").remove();
                    }
                }
            });
        },

        validate: function (editor, data) {
            $.each(editor.s.fields, function (index, field) {
                let validates = field.s.opts.validate;
                $.each(validates, function (index, validate) {
                    if (validate === "required") {
                        if (Basic.isBlank(data[field.s.name]) || ( Basic.notNull(data[field.s.name]) && data[field.s.name].length === 0)) {
                            field.error(Constants.message.validate.NOT_NULL);
                        }
                    }
                })
            });
        }
    }
}
