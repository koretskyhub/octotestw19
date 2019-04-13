import DefaultSteps from './default';
import page from '../pages/main';

class MainPageSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	login(username, password) {
		this.page.fillLoginForm(username, password);
		this.page.submit();
		this.page.waitForUrl('https://e.mail.ru/messages/inbox/?back=1');
		this.redirectToQa();
	}
}

export default new MainPageSteps();
