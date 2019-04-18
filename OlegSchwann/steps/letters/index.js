import DefaultSteps from '../default';
import page from '../../pages/letters';

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	checkReadFlagChanged(subject) {
		let state = this.page.hasFirstLetterReadFlag();
		this.page.clickOnFlag();
		let new_state = this.page.hasFirstLetterReadFlag();
		if (state === new_state) {
			let message = "Flag status has not changed.";
			throw new Error(message);
		}
	}
}

export default new LettersSteps();
