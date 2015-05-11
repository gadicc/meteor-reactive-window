# reactive-window [![Build Status](https://api.travis-ci.org/gadicc/meteor-reactive-window.svg?branch=master)](https://travis-ci.org/gadicc/meteor-reactive-window)

The start of some reactive helpers to work with screen size, etc.

To use: `meteor add gadicc:reactive-window` in your project folder.

## In JavaScript:

* `rwindow.innerWidth()` and `rwindow.outerWidth()` - window width
* `rwindow.innerHeight()` and `rwindow.outerHeight()` - window height
* `rwindow.$width()` = `$(window).width()` - browser agnostic in some cases
* `rwindow.$height()` = `$(window).height()` - browser agnostic in some cases

* `rwindow.screen()` - like bootstrap3: `xsmall`, `small`, `medium`, `large`
([more info](http://getbootstrap.com/css/#grid))

All the above functions take an optional operator, and value, e.g:

* `rwindow.innerWidth('gt', 120)` - returns *true* if width *greater than* 120
* `rwindow.screen('lte', 'small')` - *true* for `xsmall`, `small` screen sizes

If you're a stickler per performance, use `rwindow.get('screen')` etc if you
know you won't be performing an op.  `rwindow._dict.get('screen')` works too :)

## In Templates:

All the above available as helpers, with the same parameters, e.g.:

```handlebars
Current jQuery(window).width() is {{rwindow.$width}}
```

and

```handlebars
{{#if rwindow.screen 'lte' 'medium'}}
  {{> xsmallSmallMediumLayout}}
{{else}}
  {{> largeLayout}}
{{/if}}
```

## Operator reference

* `lt` - less than ("<")
* `lte` - less than or equal to ("<=")
* `eq` - equal to ("==")
* `gt` - greater than (">")
* `gte` - greater than or equal to (">=")
