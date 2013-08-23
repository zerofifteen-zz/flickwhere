(function () {
    var global = this;


    // Map dependancies to local variables
    var $ = global.jQuery;
    var _ = global._;
    var Backbone = global.Backbone;
    var JST = global.JST;


    // Namespaces
    var FlickWhere = global.FlickWhere = global.FlickWhere || { };


    // Clone Backbone's events object

    FlickWhere = _.extend(FlickWhere, Backbone.Events);


    // Template helper
    // Adds STATIC_URL to template data

    FlickWhere.getTemplate = function (template_name) {
        var template = JST[template_name];

        return function (data) {
            var global = {
                STATIC_URL : FlickWhere.STATIC_URL
            };

            data = _.extend(global, data || { });

            if (_.isFunction(template)) {
                return template(data);
            }
        };
    };


    // Module definition
    // Memoize module object to prevent it from being tampered with.

    FlickWhere.module = (function () {
        var modules = { };

        return function (name) {
            if (modules[name]) {
                return modules[name];
            }

            modules[name] = {
                Views : { }
            };

            return modules[name];
        };
    }).call(this);

}).call(this);
