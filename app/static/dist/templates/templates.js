this["JST"] = this["JST"] || {};

this["JST"]["flickr/photo.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="flk-photo">\n    <img src="' +
((__t = ( url )) == null ? '' : __t) +
'" />\n</li>\n';

}
return __p
};

this["JST"]["flickr/results.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="flk-results">\n</ul>\n';

}
return __p
};

this["JST"]["map/form.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="MapCanvas"></div>\n';

}
return __p
};

this["JST"]["map/frame.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="map-frame">\n    <img class="map-logo" src="' +
((__t = ( STATIC_URL )) == null ? '' : __t) +
'images/logo.png" />\n\n    <div class="map-google"></div>\n</div>\n';

}
return __p
};