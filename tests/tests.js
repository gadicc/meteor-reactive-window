getNext = function(key, callback) {
	var handle = Tracker.autorun(function(c) {
		var value = rwindow.get(key);
		if (c.firstRun) return;
		handle.stop();
		_.defer(function() {
			callback(value);
		});
	});
}

$(function() {
	Tinytest.add('reactive-window - window size change, screen size name', function(test) {
		testWindow.resizeTo(100,100);
		rwindow.forceUpdate();
		test.equal(rwindow.get('screen'), 'xsmall');
		test.isTrue(rwindow.check('screen', 'lt', 'small'));
		test.isTrue(rwindow.check('screen', 'lt', 'medium'));
		test.isTrue(rwindow.check('screen', 'lt', 'large'));
		test.isTrue(rwindow.check('screen', 'gte', 'xsmall'));
		test.isTrue(rwindow.check('screen', 'lte', 'xsmall'));

		testWindow.resizeTo(800,100);
		rwindow.forceUpdate();		
		test.equal(rwindow.get('screen'), 'small');
		test.isTrue(rwindow.check('screen', 'gt', 'xsmall'));
		test.isTrue(rwindow.check('screen', 'gte', 'small'));
		test.isTrue(rwindow.check('screen', 'lte', 'small'));
		test.isTrue(rwindow.check('screen', 'lt', 'medium'));
		test.isTrue(rwindow.check('screen', 'lt', 'large'));

		testWindow.resizeTo(1000,100);
		rwindow.forceUpdate();		
		test.equal(rwindow.get('screen'), 'medium');
		test.isTrue(rwindow.check('screen', 'gt', 'xsmall'));
		test.isTrue(rwindow.check('screen', 'gt', 'small'));
		test.isTrue(rwindow.check('screen', 'gte', 'medium'));
		test.isTrue(rwindow.check('screen', 'lte', 'medium'));
		test.isTrue(rwindow.check('screen', 'lt', 'large'));

		testWindow.resizeTo(1300,100);
		rwindow.forceUpdate();		
		test.equal(rwindow.get('screen'), 'large');
		test.isTrue(rwindow.check('screen', 'gt', 'xsmall'));
		test.isTrue(rwindow.check('screen', 'gt', 'small'));
		test.isTrue(rwindow.check('screen', 'gte', 'large'));
		test.isTrue(rwindow.check('screen', 'lte', 'large'));
	});

	Tinytest.addAsync('reactive-window - gte/etc only invalidates on boolean change', function(test, complete) {
		testWindow.resizeTo(100,100);
		rwindow.forceUpdate();

		var changeCount = 0;
		var handle = Tracker.autorun(function() {
			rwindow.check('screen', 'gt', 'xsmall');
			changeCount++;
		});

		// consecutively larger widths that are all still considered "xsmall"
		window.setTimeout(function() {
			testWindow.resizeTo(200,100);
			rwindow.forceUpdate();

			window.setTimeout(function() {
				testWindow.resizeTo(300,100);
				rwindow.forceUpdate();

				window.setTimeout(function() {
					testWindow.resizeTo(400,100);
					rwindow.forceUpdate();
				}, 10);

			}, 10);

		}, 10);

		window.setTimeout(function() {
			test.equal(changeCount, 1, 'gte rendered ' + changeCount + ' times');
			complete();
		}, 500);

	});


	/*
	 * If the content of the window exceeds it's height, by default (overflow: auto), the
	 * browser will add a vertical scrollbar, which decreases the window's width.  We
	 * should pick this up and trigger appropriate changes.
	 */
	if (typeof MutationObserver === 'function') // remove if we move back to polling + stub phantomjs fakeWindow
	Tinytest.addAsync('reactive-window - vertical scrollbar test', function(test, complete) {
		var doc = rwindow.window.document;
		var div = doc.createElement('div');

		getNext('$width', function(oldWidth) {
			getNext('$width', function(newWidth) {
				test.isTrue(newWidth < oldWidth);
				complete();
			});

			doc.body.appendChild(div);
			$(div).height(500);
		});

		testWindow.resizeTo(185,185);
	});
});

