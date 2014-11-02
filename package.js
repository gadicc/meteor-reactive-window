Package.describe({
  summary: "Reactive functions for window properties; width, scroll, etc"
});

Package.on_use(function (api) {
  api.use(['jquery', 'underscore', 'reactive-dict', 'blaze'], 'client');
  api.add_files('reactive-window.js', 'client');
  api.export('rwindow', 'client');
});
