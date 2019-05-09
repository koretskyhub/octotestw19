import DefaultSteps from '../default';
import page from '../../pages/letters';
const assert = require('assert');

class LettersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	clickAndCheckReadFlagChanged(subject) {
		const state = this.page.hasFirstLetterReadFlag();
		this.page.clickOnFlag();
		const new_state = this.page.hasFirstLetterReadFlag();

		assert.notStrictEqual(state, new_state, 'Flag status has not changed.');
	}
}

export default new LettersSteps();
