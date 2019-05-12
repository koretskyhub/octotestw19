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
		
		this.open('https://octavius.mail.ru');
		this.page.waitForUrl('https://octavius.mail.ru');
	}

	logout(){
		this.open('https://r.mail.ru/cls1074201/auth.mail.ru/cgi-bin/logout?next=1&lang=ru_RU&Page=https%3A%2F%2Foctavius.mail.ru');
		this.page.waitForUrl('https://e.mail.ru/login?page=https%3A%2F%2Foctavius.mail.ru%2Finbox&allow_external=1&from=octavius');
	}
}

export default new MainPageSteps();
