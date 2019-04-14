import main from '../steps/main';
import layout from '../steps/layout'
import folders from '../steps/sidebar/folders';
import letters from '../steps/letters';
import letterToolbar from '../steps/letter/toolbar';
import { testUserCredentials as credentials} from '../store';
// import assert from 'assert';

describe('read mail. toolbar checklist', () => {
	beforeEach(() => {
		const login = process.env[credentials.loginVariableName];
		const password = process.env[credentials.passwordVariableName];

		main.open('https://mail.ru');
		main.login(login, password);
		layout.setPaneAndSize(2);
		folders.clickFolderByName('Входящие');
	});

	it('Отметить письмо прочитанным ', () => {
		const letterId = '1:fdbb95971e221c6d:0';

		letters.openByLetterId(letterId);

		letterToolbar.markReadUnread();
		
		// assert.ok(beforeStatus !== afterStatus);
	});
});
