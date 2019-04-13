import DefaultSteps from '../default';
import page from '../../pages/letters';

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	openBySubject(subject) {
		this.page.hasLetterBySubject(subject);
		this.page.openBySubject(subject);
	}
	
	markReadUnread(subject) {
		this.page.hasLetterBySubject(subject);
		this.page.markReadUnread(subject);
	}

}

export default new LettersSteps();
