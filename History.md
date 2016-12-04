## vNEXT

* Release under MIT license (2016-12-04), refresh Meteor package metadata.

## v1.0.6

* Performance: don't invalidate comparison queries (gte, etc) if the return
  result hasn't changed (#7)
* Cleanup: Remove dep to unused sdecima:javascript-detect-element-resize (#6)
* Bugfix: debug->console to avoid crash when no mutation observers (#8)

## v1.0.5

* Debounce back to 100ms from 50ms.
* Set initial values earluer, during load instead of document.onready;
  Fixes issues in Firefox and Safari (#4)

## v1.0.4

* Fixes "Failed to execute 'observe' on 'MutationObserver'" on some Chrome
  versoins.  Big thanks to @productiveme for solving this!

## v1.0.1

* Only setup the MutationObserver if it's available (in current browser)
* window stub for phantomjs, since it doesn't do outerWidth, etc.

## v1.0.0

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
