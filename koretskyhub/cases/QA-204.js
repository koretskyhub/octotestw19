import main from '../steps/main';
import layout from '../steps/layout'
import folders from '../steps/sidebar/folders';
import letters from '../steps/letters';
import letter from '../steps/letter';
import letterToolbar from '../steps/letter/toolbar';

import { testUserCredentials as credentials } from '../store';


describe('QA-204. Чтение письма действия с письмом через тулбар в шапке', () => {
	beforeEach(() => {
		main.open('https://mail.ru');

		const login = process.env[credentials.loginVariableName];
		const password = process.env[credentials.passwordVariableName];
		main.login(login, password);
	});

	afterEach(() => {
		main.logout();
	});

	it('Поиск', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		
		letterToolbar.search();
	});

	it('Ответить', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		
		letterToolbar.response();
		
		letter.checkAnswerInfo();
		
		letter.closeModal();
	});

	it('Переслать', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.forward();

		letter.checkForwardInfo()
		
		letter.closeModal();
	});
	

	it('Получить служебные заголовки', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);


		const tabsBefore = browser.getTabIds();
		letterToolbar.serviceHeaders();

		layout.checkHederTab(tabsBefore, browser.getTabIds());
	});

	it('Перенаправить письмо', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.redirect();

		letter.checkRedirect();
	});

	it('Переслать как вложение', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.redirectAsInclusion();

		letter.checkAsInclusion();
		
		letter.closeModal();
	});

	it('Найти все письма', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		
		const sender =  letter.getSender();
		
		letterToolbar.find();

		letter.checkSearch(sender);
	});

	it('Перевести письмо', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.translate();
	});

	it('Создать фильтр', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.filter();
	});

	it('Распечатать письмо', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const tabsBefore = browser.getTabIds();

		letterToolbar.print();

		layout.checkPrintTab(tabsBefore);
	});
	
	it('Создать событие', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const tabsBefore = browser.getTabIds();

		letterToolbar.addEvent();

		layout.checkEventTab(tabsBefore);
	});

	it('Открыть выпадающее меню "В папку"', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.toFolderDropdown();
	});

	
	it('Открыть выпадающее меню "Ещё"', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.openMoreDropdown();
	});

	it('Окрыть письмо в новой вкладке', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const html = letter.getHTML();
		const tabsBefore = browser.getTabIds();

		letterToolbar.openInNewTab();

		layout.checkLetterInNewTab(html, tabsBefore);
	});

	it('Пометить флажком/снять флажок', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.markFlagUnflag();
	});

	it('Переместить письмо в папку "Корзина"', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.deleteLetter(letters.nextPage(letterPos, [...list]));
		layout.checkLastNotifyPopup('Перемещено в папку «Корзина» Отменить');
	});

	it('Удалить письмо навсегда', () => {
		const folderName = 'Корзина';
		folders.clickFolderByName(folderName);
		
		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.deleteLetter(letters.nextPage(letterPos, [...list]));
		layout.checkLastNotifyPopup('Письмо удалено');
	});

	it('Перейти к следующему письму в папке', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getNotLastLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.toNextLetter(letter.letterUrl(folderName, list[letterPos + 1]));
	});

	it('Перейти к предыдующему письму в папке', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getNotFirstLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.toPrevLetter(letter.letterUrl(folderName, list[letterPos - 1]));
	});

	it('Перемещение письма в архив', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.toArchive(letters.nextPage(letterPos, [...list]));
		layout.checkLastNotifyPopup('Перемещено в архив Отменить');
	});

	it('Перемещение письма в спам', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.toSpam(letters.nextPage(letterPos, [...list]));

		layout.checkLastNotifyPopup('Перемещено в спам Отменить');
	});

	it('Возвращение к папке из текущего письма', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.backToLetterFolder(list[letterPos]);
	});

	it('Смена статуса "прочитано" письма', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const [list, letterPos] = letters.getRandomLetter();
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.markReadUnread();
	});

});
