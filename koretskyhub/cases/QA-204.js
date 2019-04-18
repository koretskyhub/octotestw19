import main from '../steps/main';
import layout from '../steps/layout'
import folders from '../steps/sidebar/folders';
import letters from '../steps/letters';
import letter from '../steps/letter';
import letterToolbar from '../steps/letter/toolbar';
import { testUserCredentials as credentials } from '../store';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

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

		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.search();
	
		browser.waitForVisible('.search-panel__left-col');
		browser.waitForVisible('.search-panel__layer ._1Sq-e9MVzbKWUgdGRPfVlE')
	});

	it('Ответить', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const threadSubject = ($('.thread__subject').getText() === '<Без темы>') ?
									'' : $('.thread__subject').getText()

		const body = $('.js-readmsg-msg').getText().replace(/\s/g, '');
		letterToolbar.response();

		const responseWindow = '.compose-app__compose';

		browser.waitForVisible(responseWindow);

		const responseTheme = browser.getValue('.subject__wrapper--2mk6m .inputContainer--nsqFu .container--H9L5q');
		
		const responseBody = $(responseWindow + ' blockquote .js-readmsg-msg').getText().replace(/\s/g, '');
		
		if (responseTheme !== `Re: ${threadSubject}`) throw new Error('неверная тема пересылаемого письма');
		if (responseBody !==  body) throw new Error('содержимое письма другое');
		
		browser.waitForVisible('.compose-app__buttons :nth-child(3)');
		browser.click('.compose-app__buttons :nth-child(3)');
		browser.waitUntil(() => $('.compose-app').value === null);
	});

	it('Переслать', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);

		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);

		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const threadSubject = ($('.thread__subject').getText() === '<Без темы>') ?
									'' : $('.thread__subject').getText()


		const body = $('.js-readmsg-msg').getText().replace(/\s/g, '');
		
		letterToolbar.forward();

		const forwardWindow = '.compose-app__compose';

		browser.waitForVisible(forwardWindow);

		const forwardTheme = browser.getValue('.subject__wrapper--2mk6m .inputContainer--nsqFu .container--H9L5q');
		
		const forwardBody = $(forwardWindow + ' ' + '.js-readmsg-msg').getText().replace(/\s/g, '');
		
		if (forwardTheme !== `Fwd: ${threadSubject}`) throw new Error('неверная тема пересылаемого письма');
		if (forwardBody !==  body) throw new Error('содержимое письма другое');
		
		browser.waitForVisible('.compose-app__buttons :nth-child(3)');
		browser.click('.compose-app__buttons :nth-child(3)');
		browser.waitUntil(() => $('.compose-app').value === null);
	});
	

	it('Получить служебные заголовки', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);


		const tabsBefore = browser.getTabIds();
		letterToolbar.serviceHeaders();
		const tabsAfter = browser.getTabIds();

		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);
		if (tabsDiff.length !== 1) throw new Error('открыто неверное количество вкладок');
		browser.switchTab(tabsDiff[0]);

		const shUrlRe = /^https:\/\/octavius.mail.ru\/message\/\d+\/headers\/$/;

		if (!shUrlRe.test(browser.getUrl())) throw new Error('Была открыта другая вкладка');
	
		browser.close();
	});

	it('Перенаправить письмо', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.redirect();

		const redirectWindow = '.layer-window__block .layer_letter-redirect';

		browser.waitForVisible(redirectWindow);
	});

	it('Переслать как вложение', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const threadSubject = ($('.thread__subject').getText() === '<Без темы>') ?
									'Untitled' : $('.thread__subject').getText()

		letterToolbar.redirectAsInclusion();

		const redirectWindow = '.compose-app__compose';

		browser.waitForVisible(redirectWindow);

		const redirectTheme = browser.getValue('.subject__wrapper--2mk6m .inputContainer--nsqFu .container--H9L5q');
		const redirectFileName = $('.container_header--ymfrd .text--3Ogn-').getText();
		
		if (redirectTheme !== `Fwd: ${threadSubject}.eml`) throw new Error('неверная тема пересылаемого письма');
		if (redirectFileName !== `${threadSubject}.eml`) throw new Error('неверное имя файла пересылаемого письма'); 
		browser.waitForVisible('.compose-app__buttons :nth-child(3)');
		browser.click('.compose-app__buttons :nth-child(3)');
		browser.waitUntil(() => $('.compose-app').value === null);
	});

	it('Найти все письма', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		
		const sender =  $('.letter__contact-item').getAttribute('title');
		
		letterToolbar.find();

		const senderInFilter = '._4BfiogsReGxb7H9VTcSzv'

		browser.waitForVisible(senderInFilter);

		if ($(senderInFilter).getText() !== sender) throw new Error('Осутсвует корректная форма поиска');
	});

	it('Перевести письмо', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.translate();

		const translator = '.letter__translator .translator';

		browser.waitForVisible(translator);

		browser.waitUntil(() => browser.isEnabled(translator));
	});

	it('Создать фильтр', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.filter();

		const sender =  $('.letter__contact-item').getAttribute('title');

		const senderInFilter = '.layer-window__block input.c01136'

		browser.waitForVisible(senderInFilter);

		if (browser.getValue(senderInFilter) !== sender) throw new Error('Осутсвует корректное окно фильтрации');
	});

	it('Распечатать письмо', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const tabsBefore = browser.getTabIds();

		letterToolbar.print();

		const tabsAfter = browser.getTabIds();
		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);

		if (tabsDiff.length !== 1) throw new Error('открыто неверное количество вкладок');
		browser.switchTab(tabsDiff[0]);

		browser.waitForVisible('.print-body');

		browser.close()
	});

	it('Создать событие', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		const tabsBefore = browser.getTabIds();

		letterToolbar.addEvent();

		const tabsAfter = browser.getTabIds();

		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);
		if (tabsDiff.length !== 1) throw new Error('открыто неверное количество вкладок');
		
		browser.switchTab(tabsDiff[0]);
		browser.waitForVisible('.popup-pane');
		browser.close()
	});

	it('Открыть выпадающее меню "В папку"', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);

		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.toFolderDropdown();
	});

	
	it('Открыть выпадающее меню "Ещё"', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		letterToolbar.moreDropdown();
	});

	it('Окрыть письмо в новой вкладке', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);

		browser.waitForVisible('.letter__head');
		const letterBefore = browser.getHTML('.letter__head');
		const tabsBefore = browser.getTabIds();
		letterToolbar.openInNewTab();
		const tabsAfter = browser.getTabIds();
		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);
		if (tabsDiff.length !== 1) throw new Error('открыто неверное количество вкладок');
		browser.switchTab(tabsDiff[0]);
		browser.waitForVisible('.letter__head');
		if (letterBefore !== browser.getHTML('.letter__head')) throw new Error('Была открыта другая вкладка');
		browser.close();
	});

	it('Пометить флажком/снять флажок', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');

		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.markFlagUnflag();
	});

	it('Переместить письмо в папку "Корзина"', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);

		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.deleteLetter(letters.nextPage(letterPos, [...list]));
		layout.checkLastNotifyPopup('Перемещено в папку «Корзина» Отменить');
		
	});


	it('Удалить письмо навсегда', () => {
		const folderName = 'Корзина';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		const letterId = list[letterPos];

		letters.openByLetterFolderAndId(folderName, letterId);
		letterToolbar.deleteLetter(letters.nextPage(letterPos, [...list]));
		layout.checkLastNotifyPopup('Письмо удалено');
	});

	it('Перейти к следующему письму в папке', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 2, 0);
		
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.toNextLetter(letter.letterUrl(folderName, list[letterPos + 1]));
	});

	it('Перейти к предыдующему письму в папке', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 1);
		
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.toPrevLetter(letter.letterUrl(folderName, list[letterPos - 1]));
	});


	it('Перемещение письма в архив', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.toArchive(letters.nextPage(letterPos, [...list]));
		layout.checkLastNotifyPopup('Перемещено в архив Отменить');
	});

	it('Перемещение письма в спам', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.toSpam(letters.nextPage(letterPos, [...list]));
		layout.checkLastNotifyPopup('Перемещено в спам Отменить');
	});

	it('Возвращение к папке из текущего письма', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');

		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.backToLetterFolder(list[letterPos]);
	});

	it('Смена статуса "прочитано" письма', () => {
		const folderName = 'Входящие';
		folders.clickFolderByName(folderName);
		const list = letters.list;
		if (list.length === 0) throw new Error('нет писем в папке, должно быть хотя бы одно');

		const letterPos = getRandomInt(list.length - 1, 0);
		letters.openByLetterFolderAndId(folderName, list[letterPos]);
		letterToolbar.markReadUnread();
	});

});
