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


    var Results = Flickr.Views.Results = Backbone.View.extend({
        el : FlickWhere.getTemplate('flickr/results.html'),

        states : {
            loading : 'is-loading'
        }
    });

    Results.prototype.initialize = function() {
        this._attachMapReset();
        this._attachMapNoResults();
        this._attachImageLoaded();
    };

    Results.prototype._attachMapReset = function () {
        var event = 'map:reset';
        var handler = _(this._handleMapReset).bind(this);

        FlickWhere.on(event, handler);
    };

    Results.prototype._handleMapReset = function () {
        this.$el
            .addClass(this.states.loading)
            .empty();
    };

    Results.prototype._attachMapNoResults = function () {
        var event = 'map:noresults';
        var handler = _(this._handleMapNoResults).bind(this);

        FlickWhere.on(event, handler);
    };

    Results.prototype._handleMapNoResults = function () {
        this.$el.removeClass(this.states.loading);
    };

    Results.prototype._attachImageLoaded = function () {
        var event = 'image:loaded';
        var handler = _(this._handleImageLoaded).bind(this);

        FlickWhere.on(event, handler);
    };

    Results.prototype._handleImageLoaded = function (model) {
        var photo = new Flickr.Views.Photo({
            model : model
        });

        photo
            .appendTo(this.el)
            .tweenIn();

        this.$el.removeClass(this.states.loading);
    };

    Results.prototype.appendTo = function ($parent) {
        this.$el.appendTo($parent);
        return this;
    };

}).call(this);
