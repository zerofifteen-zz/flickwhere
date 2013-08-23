(function() {
    var global = this;


    // Map dependancies to local variables
    var _ = global._;
    var $ = global.jQuery;
    var Backbone = global.Backbone;


    // Namespaces
    var FlickWhere = global.FlickWhere = global.FlickWhere || {};
    var Flickr = FlickWhere.module('Flickr');


    var Model = Flickr.Model = Backbone.Model.extend({
    });

    Model.prototype.initialize = function(attributes, options) {
        var url = 'http://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>.jpg';
        var data = this.toJSON();

        this.url = _.template(url, data);

        var request_image = this._requestImage();
        var triggerLoadedEvent = _(this._triggerLoadedEvent).bind(this);

        $.when(request_image).done(triggerLoadedEvent);
    };

    Model.prototype._requestImage = function () {
        var deferred = $.Deferred();

        var image = this.image = new global.Image();
        image.onload = function () {
            deferred.resolve();
        };
        image.src = this.url;

        return deferred.promise();
    };

    Model.prototype._triggerLoadedEvent = function () {
        var event = 'image:loaded';
        FlickWhere.trigger(event, this);
    };

}).call(this);
