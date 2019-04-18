import DefaultSteps from './default';
import page from '../pages/main';

class MainPageSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	login(username, password) {
		this.page.fillLoginForm(username, password);
		this.page.submit();
		this.page.waitForUrlStartWith('https://e.mail.ru', 10000);
	}
}

export default new MainPageSteps();
