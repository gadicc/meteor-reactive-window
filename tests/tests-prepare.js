if (!window._phantom) {
  // Create a test window that we can resize.
  console.log("Don't forget to make sure popups are enabled");
	testWindow = window.open("", "reactive-window-tests", "width=100, height=100");
} else {
	// Stub for phantomjs, because of https://github.com/ariya/phantomjs/issues/12010
	function fakeWindow(width, height) {
		this.document = { documentElement: {} };
		this.window = this;
		this.resizeTo(width, height, true /* firstTime */);
	}
	fakeWindow.prototype.resizeTo = function(width, height, firstTime) {
		this.innerWidth = this.outerWidth = this.document.documentElement.clientWidth = width;
		this.innerHeight = this.outerHeight = this.document.documentElement.clientHeight = height;
		if (!firstTime && this.onresize)
			this.onresize();
	}
	testWindow = new fakeWindow(100, 100);
}
