import main from '../steps/main';
import layout from '../steps/layout'
import folders from '../steps/sidebar/folders';
import letters from '../steps/letters';
import { testUserCredentials as credentials} from '../store';

describe('test id', () => {
	it('Авторизоваться, открыть первое письмо на странице, вернутся к списку писем', () => {
		main.open('https://mail.ru');
		main.login(credentials[1].login, credentials[1].password);
		layout.setPaneAndSize(2);
		folders.clickFolderByName('Входящие');
		letters.markReadUnread('Узнайте о супервозможностях Почты Mail.ru');
	});
});
