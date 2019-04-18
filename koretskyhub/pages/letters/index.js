import DefaultPage from '../default';

class LettersPage extends DefaultPage {
	constructor() {
		super('letters')
	}

	get locators () {
		const container = '.scrollable__container .dataset';

		return {
			container,
			letterByLetterId: (letterId) => `${this.locators.container} [data-id="${letterId}"]`,
			letterReadCheckbox: (letterId) => `${this.locators.letterByLetterId(letterId)}`
											 + ' ' + '.llc__read-status'
											 + ' ' + '.ll-rs',
			letterReadStatus: (letterId) => `${this.locators.letterReadCheckbox(letterId)}` 
											 + 'll-rs_is-active',
		}
	}

	/**
	 * Проверяет есть ли письмо по id
	 *
	 * @param {string} letterId
	 * @param {boolean} reverse
	 * @returns {boolean}
	 */
	hasLetterByLetterId (letterId, reverse = false) {
		try {
			this.page.waitForVisible(this.locators.letterByLetterId(letterId), null, reverse);

			return true;
		} catch (err) {
			return false;
		}
	}

	/**
	 * Открыть письмо по id
	 * @param  {string} letterId
	 */
	openByLetterId (letterId) {
		$(this.locators.letterByLetterId(letterId)).click();
	}

	markReadUnread (letterId) {
		this.page.waitForVisible(this.locators.letterReadCheckbox(letterId));
		this.page.click(this.locators.letterReadCheckbox(letterId));
	}

	isRead (letterId) {
		return $(this.locators.letterReadStatus(letterId)) === null;
	}

	get list(){
		return $(this.locators.container).$$('a').map((el) => el.getAttribute('data-id'));
	}


}

export default new LettersPage();
