import DefaultSteps from '../default';
import page from '../../pages/letters';
import folders from '../../steps/sidebar/folders';
import letter from '../../steps/letter';

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	openByLetterFolderAndId(folderName, letterId) {
		this.page.hasLetterByLetterId(letterId);
		this.page.openByLetterId(letterId);
		this.page.waitForUrl(letter.letterUrl(folderName, letterId));
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
		if ((0 > letterPos) || (letterPos > list.length)) throw new Error('неверный индекс') 

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
