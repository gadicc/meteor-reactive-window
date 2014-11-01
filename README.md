# reactive-window

The start of some reactive helpers to work with screen size, etc.

## In JavaScript:

* `rwindow.get('outerWidth')` - current screen width
* `rwindow.get('outerHeight')` - current screen height
* `rwindow.get('screen')` - like Bootstrap 3: xsmall, small, medium, large
* Also: `innerWidth`, `innerHeight`
* And jQuery, `$width` = $(window).width() and `$height` = $(window).height()

## In Templates:

* All the above available as helpers, like: "Current width is {{rwindow.width}}"

In both cases, plan is to add greater than and less than helpers for numeric and
screen names.
