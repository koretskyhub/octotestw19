import DefaultSteps from '../default';
import page from '../../pages/letters';

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	clickAndCheckReadFlagChanged(subject) {
		const state = this.page.hasFirstLetterReadFlag();
		this.page.clickOnFlag();
		const new_state = this.page.hasFirstLetterReadFlag();
		if (state === new_state) {
			throw new Error("Flag status has not changed.");
		}
	}
}

export default new LettersSteps();
