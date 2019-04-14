import DefaultSteps from '../default';
import page from '../../pages/letters';

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	openByLetterId(letterId) {
			this.page.hasLetterByLetterId(letterId);
			this.page.openByLetterId(letterId);
    }

}

export default new LettersSteps();
