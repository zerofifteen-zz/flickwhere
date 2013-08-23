(function () {
    var global = this;


    // Map dependancies to local variables
    var $ = global.jQuery;
    var _ = global._;


    // Namespaces
    var FlickWhere = global.FlickWhere = global.FlickWhere || { };


    var Controller = FlickWhere.Controller = function (options) {
        var defaults = {
            flickr_api : null,
            static_url : null
        };

        this._registerVars(defaults, options);

        this._initialize();
    };

    Controller.prototype._registerVars = function (defaults, options) {
        this.config = $.extend(true, defaults, options || { });
    };

    Controller.prototype._initialize = function () {
        FlickWhere.STATIC_URL = this.config.static_url;

        this._instantiateMapFrame();
        this._instantiateFlickrResults();
    };

    Controller.prototype._instantiateMapFrame = function () {
        var Map = FlickWhere.module('Map');
        var map = new Map.Views.Frame();
        map.appendTo('body');
    };

    Controller.prototype._instantiateFlickrResults = function () {
        var Flickr = FlickWhere.module('Flickr');

        var collection = Flickr.collection = new Flickr.Collection(null, {
            flickr_api : this.config.flickr_api
        });

        var results = new Flickr.Views.Results({
            collection : collection
        });

        results.appendTo('body');
    };


    // Flickr uses JSONP

    global.parseFlickrResponse = function (response) {
        var Flickr = FlickWhere.module('Flickr');
        var photos = response.photos.photo;

        if (photos && photos.length > 0) {
            Flickr.collection.add(response.photos.photo);
        } else {
            FlickWhere.trigger('map:noresults');
        }
    };

}).call(this);
