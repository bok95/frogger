// Namespace
var Frogger = Ember.Application.create({
  ready: function() {
    setInterval(function() {
      Frogger.searchResults.refresh();
    }, 2000);

    this._super();
  }
});

// Model
Frogger.Tweet = Ember.Object.extend();

// Collection
Frogger.searchResults = Ember.ArrayController.create({
  content: [],
  query: null,
  _idCache: {},

  addTweet: function(tweet) {
    var id = tweet.get("id");

    if (typeof this._idCache[id] === "undefined") {
      this.pushObject(tweet);
      this._idCache[id] = tweet.id;
    }
  },

  refresh: function() {
    var query = this.get("query");

    if (Ember.empty(query)) {
      this.set("content", []);
      return;
    }

    var self = this;
    $.getJSON(
      "http://search.twitter.com/search.json?q=" + query + "&callback=?",
      function(data) {
        for (var i = 0; i < data.results.length; i++) {
          self.addTweet(Frogger.Tweet.create(data.results[i]));
        }
      }
    );
  }.observes("query")
});

// View
Frogger.changeQueryView = Ember.TextField.extend({
  insertNewline: function() {
    var value = this.get("value");

    if (value) {
      Frogger.searchResults.set("content", []);
      Frogger.searchResults.set("query", value);
    }
  }
});