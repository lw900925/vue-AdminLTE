export default {
    notBlank: function (object) {
        return object !== "";
    },

    isBlank: function (object) {
        return object === "";
    },

    typeOf: function (object) {
        return typeof (object) !== "undefined";
    },

    notNull: function (object) {
        return object !== null;
    },

    isNull: function (object) {
        return object === null;
    }
}
