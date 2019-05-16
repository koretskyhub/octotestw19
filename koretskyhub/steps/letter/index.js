import DefaultSteps from '../default';
import page from '../../pages/letters';
import folders from '../sidebar/folders';
import letter from '../../pages/letter';
import searchpanel from '../../pages/letter/toolbar/searchpanel';
import modals from '../../pages/letter/modals';
import assert from 'assert';

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	getInvertedReadStatus(){
		this.page.getInvertedReadStatus();
	}

	getInvertedFlagStatus(){
		this.page.getInvertedFlagStatus();
	}
		
	openByLetterId(letterId) {
		this.page.hasLetterByLetterId(letterId);
		this.page.openByLetterId(letterId);
	}

	letterUrl(folderName, letterId){
		return `${folders.folderUrl(folderName)}${letterId}/`
	}
	

	getInfo(){
		const threadSubject = letter.getSubject();
		const body = letter.getBody();
		return [threadSubject, body];
	}

	getSender(){
		return letter.getSender();
	}

	getHTML(){
		return letter.getHTML();
	}

	checkSearch(sender){
		assert.equal(searchpanel.getFilterSender(), sender,
		'Осутсвует корректная форма поиска')
	}

	checkFilter(){
		const sender = this.getSender();

		assert.equal(modals.getFilterSender(), sender, 
		'Осутсвует корректное окно фильтрации')
	}

	checkAsInclusion(){
		const threadSubject = letter.getSubject();

		const redirectTheme = modals.getTheme();
		const redirectFileName = modals.getInclusionFileName();
		
		assert.equal(redirectTheme, `Fwd: ${threadSubject}.eml`,
		'неверная тема пересылаемого письма')
		
		assert.equal(redirectFileName, `${threadSubject}.eml`,
		'неверное имя файла пересылаемого письма') 
	}

	checkAnswerInfo(){
		const [threadSubject, body] = this.getInfo();

		let responseTheme = modals.getTheme();
		const responseBody = modals.getBody();
		
		if (responseTheme === 'Re: ') {responseTheme = 'Re: Untitled'};
		
		assert.equal(responseTheme, `Re: ${threadSubject}`,
		'неверная тема пересылаемого письма'
		);
		assert.equal(responseBody,  body,
		'содержимое письма другое'
		);
	}
	
	checkForwardInfo(){
		const [threadSubject, body] = this.getInfo();
		
		let forwardTheme = modals.getTheme();
		const forwardBody = modals.getBody();

		if (forwardTheme === 'Fwd: ') {forwardTheme = 'Fwd: Untitled'};
		
		assert.equal(forwardTheme, `Fwd: ${threadSubject}`,
		'неверная тема пересылаемого письма'
		);
		assert.equal(forwardBody,  body,
			'содержимое письма другое'
		);
	}

	checkRedirect() {
		modals.checkRedirect();
	}

	closeModal(){
		modals.closeModal();
	}
}

export default new LettersSteps();
