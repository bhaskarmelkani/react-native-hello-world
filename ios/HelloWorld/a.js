"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('rarwe/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'rarwe/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _rarweConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _rarweConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _rarweConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _rarweConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('rarwe/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'rarwe/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _rarweConfigEnvironment) {

  var name = _rarweConfigEnvironment['default'].APP.name;
  var version = _rarweConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('rarwe/controllers/application', ['exports', 'ember'], function (exports, _ember) {

  //var Song = Ember.Object.extend({ title: '',
  //  rating: 0,
  //  band: ''
  //});
  //var blackDog = Song.create({ title: 'Black Dog',
  //  band: 'Led Zeppelin', rating: 3
  //});
  //var yellowLedbetter = Song.create({ title: 'Yellow Ledbetter',
  //  band: 'Pearl Jam',
  //  rating: 4
  //});
  //var pretender = Song.create({ title: 'The Pretender',
  //  band: 'Foo Fighters',
  //  rating: 2
  //});
  //var SongCollection = Ember.Object.extend({
  //  content: [],
  //  sortProperties: ['rating:desc'],
  //  sortedContent: Ember.computed.sort('content', 'sortProperties'),
  //});
  //var songs = SongCollection.create();
  //
  ////songs.get('content').pushObject(blackDog);
  ////songs.get('content').pushObject(yellowLedbetter);
  ////songs.get('content').pushObject(pretender);
  //
  //songs.get('content').pushObjects([blackDog,yellowLedbetter,pretender]);
  //
  //
  //window.songs = songs;
  //var alwaysWaiting = Song.create({ title: 'Always Waiting',
  //  band: 'Kaya Project',
  //  rating: 5
  //});
  //
  //window.newSong = alwaysWaiting;

  exports['default'] = _ember['default'].Controller.extend({
    //songs: songs
  });
});
define('rarwe/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('rarwe/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('rarwe/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'rarwe/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _rarweConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_rarweConfigEnvironment['default'].APP.name, _rarweConfigEnvironment['default'].APP.version)
  };
});
define('rarwe/initializers/export-application-global', ['exports', 'ember', 'rarwe/config/environment'], function (exports, _ember, _rarweConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_rarweConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _rarweConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_rarweConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('rarwe/router', ['exports', 'ember', 'rarwe/config/environment'], function (exports, _ember, _rarweConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _rarweConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('bands', function () {
      this.route('band', { path: ':slug' }, function () {
        this.route('songs');
      });
    });
  });

  exports['default'] = Router;
});
define('rarwe/routes/bands/band/songs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    model: function model() {
      return this.modelFor('bands.band');
    }

  });
});
define('rarwe/routes/bands/band', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    model: function model(params) {
      var bands = this.modelFor('bands');
      return bands.get('content').findBy('slug', params.slug);
    }

  });
});
define('rarwe/routes/bands', ['exports', 'ember'], function (exports, _ember) {

  var Band = _ember['default'].Object.extend({
    name: '',
    slug: _ember['default'].computed('name', function () {
      return this.get('name').dasherize();
    })
  });

  var Song = _ember['default'].Object.extend({ title: '',
    rating: 0,
    band: ''
  });

  var blackDog = Song.create({
    title: 'Black Dog',
    band: 'Led Zeppelin',
    rating: 3
  });

  var yellowLedbetter = Song.create({
    title: 'Yellow Ledbetter',
    band: 'Pearl Jam',
    rating: 4
  });

  var daughter = Song.create({
    title: 'Daughter',
    band: 'Pearl Jam',
    rating: 5
  });

  var pretender = Song.create({
    title: 'The Pretender',
    band: 'Foo Fighters',
    rating: 2
  });

  var BandsCollection = _ember['default'].Object.extend({
    content: [],
    sortProperties: ["name:desc"],
    sortedContent: _ember['default'].computed.sort('content', 'sortProperties')
  });

  var ledZeppelin = Band.create({ name: 'Led Zeppelin', songs: [blackDog] });
  var pearlJam = Band.create({ name: 'Pearl Jam', songs: [daughter, yellowLedbetter] });
  var fooFighters = Band.create({ name: 'Foo Fighters', songs: [pretender] });
  var bands = BandsCollection.create();
  bands.get('content').pushObjects([ledZeppelin, pearlJam, fooFighters]);

  exports['default'] = _ember['default'].Route.extend({

    model: function model() {
      return bands;
    }

  });
});
define("rarwe/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "rarwe/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page-header");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("Test Application");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("<nav class=\"navbar navbar-default\" role=\"navigation\">");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("<div class=\"collapse navbar-collapse\">");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("<ul class=\"nav navbar-nav\">");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("<li>{{link-to \"Bands\" \"bands\"}}</li>");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("<li>{{link-to \"Songs\" \"songs\"}}</li>");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("</ul>");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("</div>");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("</nav>");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 19, 19);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [13, 2], [13, 12]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("rarwe/templates/bands/band/songs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 6
            },
            "end": {
              "line": 8,
              "column": 6
            }
          },
          "moduleName": "rarwe/templates/bands/band/songs.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "list-group-item song");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "class", "rating pull-right");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element0, 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          return morphs;
        },
        statements: [["content", "song.title", ["loc", [null, [5, 12], [5, 26]]]], ["content", "song.rating", ["loc", [null, [6, 46], [6, 61]]]]],
        locals: ["song"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 6
          }
        },
        "moduleName": "rarwe/templates/bands/band/songs.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2, "class", "list-group songs");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model.songs", ["loc", [null, [3, 14], [3, 25]]]]], [], 0, null, ["loc", [null, [3, 6], [8, 15]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("rarwe/templates/bands/band", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "rarwe/templates/bands/band.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("rarwe/templates/bands/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "rarwe/templates/bands/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "list-group-item empty-list");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "empty-message");
        var el3 = dom.createTextNode("\n        Select a band.\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("rarwe/templates/bands", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 8
              },
              "end": {
                "line": 8,
                "column": 8
              }
            },
            "moduleName": "rarwe/templates/bands.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "pointer glyphicon glyphicon-chevron-right");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "band.name", ["loc", [null, [6, 10], [6, 23]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 6
            },
            "end": {
              "line": 9,
              "column": 6
            }
          },
          "moduleName": "rarwe/templates/bands.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["bands.band.songs", ["get", "band", ["loc", [null, [4, 38], [4, 42]]]]], ["class", "list-group-item\nband-link"], 0, null, ["loc", [null, [4, 8], [8, 20]]]]],
        locals: ["band"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 6
          }
        },
        "moduleName": "rarwe/templates/bands.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-md-4");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "list-group");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-md-8");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "list-group");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model.sortedContent", ["loc", [null, [3, 14], [3, 33]]]]], [], 0, null, ["loc", [null, [3, 6], [9, 15]]]], ["content", "outlet", ["loc", [null, [14, 6], [14, 16]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('rarwe/config/environment', ['ember'], function(Ember) {
  var prefix = 'rarwe';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("rarwe/app")["default"].create({"name":"rarwe","version":"0.0.0+7cdf9edb"});
}

/* jshint ignore:end */
//# sourceMappingURL=rarwe.map