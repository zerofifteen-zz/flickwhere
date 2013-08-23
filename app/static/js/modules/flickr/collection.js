(function() {
    var global = this;


    // Map dependancies to local variables
    var _ = global._;
    var $ = global.jQuery;
    var Backbone = global.Backbone;


    // Namespaces
    var FlickWhere = global.FlickWhere = global.FlickWhere || {};
    var Flickr = FlickWhere.module('Flickr');


    var Collection = Flickr.Collection = Backbone.Collection.extend({
        url : "http://ycpi.api.flickr.com/services/rest/",

        model : Flickr.Model
    });

     Collection.prototype.fetch = function(latitude, longitude) {
        var options = {
            dataType: 'jsonp',
            data : {
                api_key : FlickWhere.FLICKR_API_KEY,
                method : 'flickr.photos.search',
                format: 'json',
                jsoncallback  : 'parseFlickrResponse',
                has_geo : '1',
                lat : latitude,
                lon : longitude,
                radius : 20, // miles
                per_page : 30,
                safe_search : 1,
                content_type : 1 // photos only
                //geo_context : 2 // outdoors only
            }
        };

        return this.sync('read', this, options);
    };

    Collection.prototype.initialize = function(data, options) {
        this.options = options;

        this._attachMapReset();
        this._attachMapRequest();
    };

    Collection.prototype._attachMapReset = function () {
        var event = 'map:reset';
        var handler = _(this._handleMapReset).bind(this);

        FlickWhere.on(event, handler);
    };

    Collection.prototype._handleMapReset = function () {
        this.remove(this.models);
    };

    Collection.prototype._attachMapRequest = function () {
        var event = 'map:request';
        var handler = _(this._handleMapRequest).bind(this);

        FlickWhere.on(event, handler);
    };

    Collection.prototype._handleMapRequest = function (latitude, longitude) {
        this.fetch(latitude, longitude);
    };

}).call(this);
