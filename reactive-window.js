var validOps = ['lte', 'lt', 'eq', 'gt', 'gte'];

rwindow = {
	_dict: new ReactiveDict(),
	get: function(key) { return this._dict.get(key); },
	set: function(key, value) { return this._dict.set(key, value); },
	check: function(key, op, value) {
		if (!op)
			return this._dict.get(key);

		if (validOps.indexOf(op) === -1)
			throw new Error('[reactive-window] "op" must be one of: '
				+ 'lte, lt, eq, gt, gte (not "' + op + '")');

		if (key == 'screen') {
			if (screenSizes[value]) {
				// Shortut for equals (and handles stupids <=xsmall and >=large)
				if ((op[2]=='e' || op == 'eq') && this._dict.get(key) == value)
					return true;
				else
					value = screenSizes[value];
				key = 'outerWidth';
			} else
				throw new Error('[reactive-window] "screen" must be one of: xsmall, small, medium, large');
		}

		if (op[0] == 'l')
			return this._dict.get(key) < value;
		if (op[0] == 'g')
			return this._dict.get(key) > value;
	}
}

var win = (typeof testWindow === 'undefined') ? window : testWindow;
rwindow.window = win;

var rwindowHelpers = {};
Blaze.registerHelper('rwindow', rwindowHelpers);

var shortcuts = [
	'innerWidth', 'outerWidth', '$width', 'innerHeight', 'outerHeight',
	'$height', 'screen'
];
_.each(shortcuts, function(s) {
	rwindow[s] = rwindowHelpers[s] = function(op, value) {
		return rwindow.check(s, op, value);
	}
});

// http://getbootstrap.com/css/#grid
var screenSizes = {
	xsmall: 768,
	small: 992,
	medium: 1200,
	large: 9999999999
}

var update = function() {
	rwindow.set('innerWidth', win.innerWidth);
	rwindow.set('outerWidth', win.outerWidth);
	rwindow.set('$width', $(win).width());
	rwindow.set('innerHeight', win.innerHeight);
	rwindow.set('outerHeight', win.outerHeight);
	rwindow.set('$height', $(win).height());

	if (win.outerWidth < 768)
		rwindow.set('screen', 'xsmall');
	else if (win.outerWidth < 992)
		rwindow.set('screen', 'small');
	else if (win.outerWidth < 1200)
		rwindow.set('screen', 'medium');
	else
		rwindow.set('screen', 'large');
}

rwindow.forceUpdate = update;

// Set a debounce function for avoiding to fire too many events
var lazyUpdate = _.debounce(update, 100);

// Watch for resize events
var origOnResize = win.onresize;
rwindow.window.onresize = function() {
	if (origOnResize)
		origOnResize.apply(this, arguments);
	lazyUpdate();
};

$(function() {
	// Watch for mutation events (requires win.document.body)
	if (typeof MutationObserver === 'function') {
		var observer = new MutationObserver(lazyUpdate);
		observer.observe(win.document.body, {
			childList: true,
			attributes: true,
			characterData: true,
			subtree: true
		});
	} else {
		console.warn('reactive-window: no MutationObserver, won\'t notice scrollbars');
		// uh, TODO, go back to polling every 100ms
	}
});

// This only requires window, not document.body
update();
