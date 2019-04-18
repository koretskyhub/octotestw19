import DefaultPage from './default';

class MainPage extends DefaultPage {
	constructor() {
		super('main')
	}

	get locators() {
		const container = '#mailbox-container';
		return {
			container,
			login: container + ' input[name="login"]',
			password: container + ' input[name="password"]',
			button: '[type="submit"]'
		}
	}

	fillLoginForm (username, password) {
		this.page.waitForVisible(this.locators.login);
		this.page.click(this.locators.login);
		this.page.setValue(this.locators.login, username);
		this.page.setValue(this.locators.password, password);
	}

	submit() {
		this.page.waitForVisible(this.locators.button);
		this.page.click(this.locators.button)
	}

}

export default new MainPage();
