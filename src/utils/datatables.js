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
    }
}
