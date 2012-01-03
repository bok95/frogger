var App = Ember.Application.create();

App.MyView = Ember.View.extend({
  mouseDown: function() {
    window.alert("hello world!");
  }
});
