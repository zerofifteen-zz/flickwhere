/*jshint es5:true expr:true */

suite('tech', function () {
    var app = new Tech.Controller();

    test('Instance is InstanceOf Tech', function () {
        app.should.be.instanceof(Tech.Controller);
    });
});
