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
    var Map = FlickWhere.module('Map');


    var Frame = Map.Views.Frame = Backbone.View.extend({
        el : FlickWhere.getTemplate('map/frame.html'),

        states : {
            results : 'has-results'
        }
    });

    Frame.prototype.initialize = function() {
        var geocoder = new google.maps.Geocoder();
        var options = {
            'address': 'Toronto'
        };

        var callback = _(this._instantiateGoogleMap).bind(this);
        geocoder.geocode(options, callback);
    };

    Frame.prototype._instantiateGoogleMap = function (results, status) {
        var center = results[0].geometry.location;

        var options = {
            zoom: 7,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl : false
        };

        var el = this.$el.find('.map-google').get(0);

        this.map = new google.maps.Map(el, options);

        this._attachMapClick();
    };

    Frame.prototype._attachMapClick = function () {
        var event = 'click';
        var handler = _(this._handleMapClick).bind(this);

        google.maps.event.addListener(this.map, event, handler);
    };

    Frame.prototype._handleMapClick = function (response) {
        var lat_lng = response.latLng;
        var request = _(this._triggerMapRequest).bind(this, lat_lng);

        this._dropMarker(lat_lng);
        this._triggerMapReset();

        window.clearTimeout(this._debounceRequest);
        this._debounceRequest = window.setTimeout(request, 1000);
    };

    Frame.prototype._triggerMapReset = function () {
        var event = 'map:reset';
        FlickWhere.trigger(event);

        $('html, body').scrollTop(0);
    };

    Frame.prototype._dropMarker = function (lat_lng) {
        this.$el.addClass(this.states.results);

        if (!this.marker) {
            this.marker = new google.maps.Marker({
                position : lat_lng,
                map : this.map,
                draggable :true,
                animation : google.maps.Animation.DROP,
                title : 'Click to zoom'
            });

            this._attachMarkerDragEnd();
        } else {
            this.marker.setPosition(lat_lng);
        }
    };

    Frame.prototype._attachMarkerDragEnd = function () {
        var event = 'dragend';
        var handler = _(this._handleMarkerDragEnd).bind(this);

        google.maps.event.addListener(this.marker, event, handler);
    };

    Frame.prototype._handleMarkerDragEnd = function (response) {
        var lat_lng = response.latLng;
        this._triggerMapRequest(lat_lng);
    };

    Frame.prototype._triggerMapRequest = function (lat_lng) {
        var event = 'map:request';
        var latitude = lat_lng.lat();
        var longitude = lat_lng.lng();

        FlickWhere.trigger(event, latitude, longitude);
    };

    Frame.prototype.appendTo = function ($parent) {
        this.$el.appendTo($parent);
    };

}).call(this);
