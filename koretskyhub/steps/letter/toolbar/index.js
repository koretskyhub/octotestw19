import DefaultSteps from '../../default';
import toolbar from '../../../pages/letter/toolbar';
import modals from '../../../pages/letter/modals'; 
import searchpanel from '../../../pages/letter/toolbar/searchpanel';
import letter from '../../../pages/letter'

class LetterToolbarSteps extends DefaultSteps {
	constructor() {
		super(toolbar);
	}

	markReadUnread () {
		let expectedClass = letter.getInvertedReadStatus()

		this.page.clickButton("Пометить прочитанным");

		browser.waitForVisible(expectedClass);
	}

	translate() {
		this.page.clickButton("Перевести письмо");
		const translator = letter.locators.translator;

		browser.waitForVisible(translator);

		browser.waitUntil(() => browser.isEnabled(translator));
	}

	markFlagUnflag () {
		let expectedClass = letter.getInvertedFlagStatus();

		this.page.clickButton("Пометить флажком");

		browser.waitForVisible(expectedClass);
	}

	backToLetterFolder(){
		let folderUrl = browser.getUrl().slice(0, -1);
		folderUrl = folderUrl.slice(0, folderUrl.lastIndexOf('/'));
		
		this.page.clickButton("Вернуться");
		this.page.waitForUrl(folderUrl);
	}

	openInNewTab(){
		this.page.clickButton("Открыть в новой вкладке");
	}

	addEvent(){
		this.page.clickButton("Создать событие");
	}

	print() {
		this.page.clickButton("Распечатать");
	}

	filter() {
		this.page.clickButton("Создать фильтр");
	}

	find() {
		this.page.clickButton("Найти все письма");
	}

	redirect() {
		this.page.clickButton("Перенаправить");
	}
	
	serviceHeaders() {
		this.page.clickButton("Служебные заголовки");
	}

	openMoreDropdown(){
		this.page.openMoreDropdown();
	}

	toFolderDropdown(){
		this.page.clickButton("В папку");
	}

	toArchive(expectedUrl){
		this.page.clickButton("В архив");
		this.page.waitForUrl(expectedUrl);
	}

	toSpam(expectedUrl){
		this.page.clickButton("Спам");
		this.page.waitForUrl(expectedUrl);
	}

	toNextLetter(nextLetterUrl){
		this.page.clickButton("Следующее");
		this.page.waitForUrl(nextLetterUrl);
	}

	toPrevLetter(prevLetterUrl){
		this.page.clickButton("Предыдущее");
		this.page.waitForUrl(prevLetterUrl);
	}

	deleteLetter(expectedUrl){
		this.page.clickButton("Удалить");
		this.page.waitForUrl(expectedUrl)
	}

	response() {
		this.page.clickButton("Ответить");
	}

	forward(){
		this.page.clickButton("Переслать");
	}

	redirectAsInclusion() {
		this.page.clickButton("Переслать как вложение");
	}

	search(){
		searchpanel.search();
	}

}

export default new LetterToolbarSteps();
