(function() {
    var global = this;


    // Map dependancies to local variables
    var _ = global._;
    var $ = global.jQuery;
    var Backbone = global.Backbone;

    var google = global.google;
    var window = global.window;


    // Namespaces
    var FlickWhere = global.FlickWhere = global.FlickWhere || {};
    var Flickr = FlickWhere.module('Flickr');


    var Photo = Flickr.Views.Photo = Backbone.View.extend({
        template : FlickWhere.getTemplate('flickr/photo.html'),
    });

    Photo.prototype.initialize = function() {
        this.render();
        this.model.on('remove', this.tweenOut, this);
    };

    Photo.prototype.render = function () {
        var data = {
            url : this.model.url
        };

        var html = this.template(data);

        this.setElement(html);

        return this;
    };

    Photo.prototype.appendTo = function ($parent) {
        this.$el.appendTo($parent);
        return this;
    };

    Photo.prototype.tweenIn = function () {
        return this;
    };

    Photo.prototype.tweenOut = function () {
        this.destroy();
        return this;
    };

    Photo.prototype.destroy = function () {
        this.$el.remove();
    };

}).call(this);
