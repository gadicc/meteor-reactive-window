getNext = function(key, callback) {
	var current = rwindow.get(key);
	var handle = Tracker.autorun(function() {
		var value = rwindow.get(key);
		if (current != value) {
			callback(value);
			handle.stop();
		}
	});
}

$(function() {
	Tinytest.add('reactive-window - screen size', function(test) {

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

});

