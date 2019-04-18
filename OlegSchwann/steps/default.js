export default class DefaultSteps {
	constructor(page) {
		this.page = page;
		this.pane = 3;
	}

	open(path) {
		browser.url(path);
	}
}
