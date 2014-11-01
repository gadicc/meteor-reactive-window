rwindow = {
	dict: new ReactiveDict(),
	get: function(key) { return this.dict.get(key); },
	set: function(key, value) { return this.dict.set(key, value); }
}

var rwindowHelpers = {};
UI.registerHelper('rwindow', rwindowHelpers);

var shortcuts = [
	'innerWidth', 'outerWidth', '$width', 'innerHeight', 'outerHeight',
	'$height', 'screen'
];
_.each(shortcuts, function(s) {
	rwindow[s] = rwindowHelpers[s] = function() { return rwindow.dict.get(s); }
});

var update = function() {
	rwindow.set('innerWidth', window.innerWidth);
	rwindow.set('outerWidth', window.outerWidth);
	rwindow.set('$width', $(window).width());
	rwindow.set('innerHeight', window.innerHeight);
	rwindow.set('outerHeight', window.outerHeight);
	rwindow.set('$height', $(window).height());

	// http://getbootstrap.com/css/
	if (window.outerWidth < 768)
		rwindow.set('screen', 'xsmall');
	else if (window.outerWidth < 992)
		rwindow.set('screen', 'small');
	else if (window.outerWidth < 1200)
		rwindow.set('screen', 'medium');
	else
		rwindow.set('screen', 'large');
}

// Set a debounce function for avoiding to fire too many events
var lazyUpdate = _.debounce(update, 100);

// Set event only after DOM is ready
$(function() {
	// Watch for resize events
	var origOnResize = window.onresize;
	window.onresize = function() {
		if (origOnResize)
			origOnResize.apply(this, arguments);
		lazyUpdate();
	}

	// Watch for mutation events
	$(function() {
		var insertedNodes = [];
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				for (var i = 0; i < mutation.addedNodes.length; i++)
					insertedNodes.push(mutation.addedNodes[i]);
			})
			lazyUpdate();
		});
		observer.observe(document, {
			childList: true,
			attributes: true,
			characterData: true,
			subtree: true,
			attributeFilter: true
		});
	});
});
