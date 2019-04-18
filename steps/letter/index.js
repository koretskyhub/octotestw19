import DefaultSteps from '../default';
import page from '../../pages/letters';
import folders from '../../steps/sidebar/folders'

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	openByLetterId(letterId) {
			this.page.hasLetterByLetterId(letterId);
			this.page.openByLetterId(letterId);
	}
	
	letterUrl(folderName, letterId){
		return `${folders.folderUrl(folderName)}${letterId}/`
	}
}

export default new LettersSteps();
