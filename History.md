## vNEXT

## 1.0.0

* Released via Meteor Package Server
* Method shortcuts, `rwindow.get('screen')` is now `rwindow.screen()`
* Operations, e.g. `rwindow.screen('gte', 'medium')` (in Templates too)

* All events observer are added once the DOM is ready
* Resize events are debounced with a 100ms delay
* Meteor.setTimeout is replaced with debounced event on DOM mutations

Many thanks to @PEM-- for the last 3 changes above and for the
inspiration to do more work on this :)

## Unreleased (was available to install as local package from GitHub)

* All the initial code and features