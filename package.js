Package.describe({
  name: "gadicohen:reactive-window",
  summary: "Reactive functions for window properties; width, scroll, etc",
  version: "1.0.2",
  git: "https://github.com/gadicc/meteor-reactive-window.git"
});

Package.on_use(function(api) {
  api.versionsFrom("METEOR@0.9.3.1");
  api.use(['jquery', 'underscore', 'reactive-dict', 'blaze'], 'client');
  api.use('sdecima:javascript-detect-element-resize@0.5.3', 'client');

  api.add_files('reactive-window.js', 'client');

  api.export('rwindow', 'client');
});

Package.on_test(function(api) {
  api.versionsFrom("METEOR@0.9.3.1");
  api.use(['jquery', 'underscore', 'reactive-dict', 'blaze'], 'client');
  api.use('sdecima:javascript-detect-element-resize@0.5.3', 'client');
	api.use('tinytest');
  api.use('tracker', 'client');

	api.add_files('tests/tests-prepare.js', 'client');
  api.add_files('reactive-window.js', 'client');
	api.add_files('tests/tests.js', 'client');

  api.export('rwindow', 'client');
});
