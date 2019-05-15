import DefaultSteps from '../default';
import page from '../../pages/letters';
import folders from '../sidebar/folders';
import letter from '../letter';
import getRandomInt from '../../utils';
import assert from 'assert';

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	openByLetterFolderAndId(folderName, letterId) {
		this.page.hasLetterByLetterId(letterId);
		this.page.openByLetterId(letterId);
		this.page.waitForUrl(letter.letterUrl(folderName, letterId));
	}

	getRandomLetter(){
		const list = this.list;
		assert.notEqual(list.length, 0 ,'нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 0);
		
		return [list, letterPos];
	}

	getNotLastLetter(){
		const list = this.list;
		assert.notEqual(list.length, 0 ,'нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 2, 0);
		
		return [list, letterPos];
	}

	getNotFirstLetter(){
		const list = this.list;
		assert.notEqual(list.length, 0 ,'нет писем в папке, должно быть хотя бы одно');
		const letterPos = getRandomInt(list.length - 1, 1);
		
		return [list, letterPos];
	}

	markReadUnread(letterId) {
		this.page.hasLetterByLetterId(letterId);
		this.page.markReadUnread(letterId);
	}

	isRead(letterId) {
		return this.page.isRead(letterId);
	}


	get list(){
		return this.page.list;
	}

	nextLetter(){

	}

	nextPage(letterPos, list) {
		assert.ok(!((0 > letterPos) || (letterPos > list.length)), 'неверный индекс');

		let resultUrl;

		if (letterPos !== (list.length - 1)) {
			resultUrl = browser.getUrl().replace(list[letterPos], list[letterPos + 1]);
		} else {
			resultUrl = folders.currentFolder;		
		}

		return resultUrl;
	}
}

export default new LettersSteps();
