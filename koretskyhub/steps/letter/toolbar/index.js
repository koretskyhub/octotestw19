import DefaultSteps from '../../default';
import toolbar from '../../../pages/letter/toolbar';

class LetterToolbarSteps extends DefaultSteps {
	constructor() {
		super(toolbar);
	}

	markReadUnread () {
		let expectedClass;

		if ($('.letter-status2_unread').getAttribute('class').search('true') !== -1){
			expectedClass = '.letter-status2_false';
		} else expectedClass = '.letter-status2_true';

		this.page.markReadUnread();

		browser.waitForVisible(expectedClass);
	}

	markFlagUnflag () {
		let expectedClass;

		if ($('.letter-status2_flagged').getAttribute('class').search('true')){
			expectedClass = '.letter-status2_false';
		} else expectedClass = '.letter-status2_true';

		this.page.markFlagUnflag();

		browser.waitForVisible(expectedClass);
	}

	backToLetterFolder(){
		let folderUrl = browser.getUrl().slice(0, -1);
		folderUrl = folderUrl.slice(0, folderUrl.lastIndexOf('/'));
		
		this.page.backToLetterFolder();
		this.page.waitForUrl(folderUrl);
	}

	openInNewTab(){
		this.page.openInNewTab();
	}

	addEvent(){
		this.page.addEvent()
	}

	print() {
		this.page.print();
	}

	filter() {
		this.page.filter();
	}

	translate() {
		this.page.translate();
	}

	find() {
		this.page.find();
	}

	redirect() {
		this.page.redirect();
	}

	response() {
		this.page.response();
	}

	forward(){
		this.page.forward();
	}
	
	search() {
			this.page.search();
	}
	redirectAsInclusion() {
		this.page.redirectAsInclusion();
	}

	serviceHeaders() {
		this.page.serviceHeaders();
	}

	moreDropdown(){
		this.page.moreDropdown();
	}

	toFolderDropdown(){
		this.page.toFolderDropdown()
	};

	toArchive(expectedUrl){
		this.page.toArchive();
		this.page.waitForUrl(expectedUrl);
	}

	toSpam(expectedUrl){
		this.page.toSpam();
		this.page.waitForUrl(expectedUrl);
	}

	toNextLetter(nextLetterUrl){
		this.page.toNextLetter();
		this.page.waitForUrl(nextLetterUrl);
	}

	toPrevLetter(prevLetterUrl){
		this.page.toPrevLetter();
		this.page.waitForUrl(prevLetterUrl);
	}

	deleteLetter(expectedUrl){
		this.page.deleteLetter();
		this.page.waitForUrl(expectedUrl)
	}

}

export default new LetterToolbarSteps();

