import DefaultPage from '../default';

class LettersPage extends DefaultPage {
	constructor() {
		super('letters')
	}

	get locators () {
		const container = '.dataset__items';

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
	 * Проверяет есть ли письмо
	 *  с темой
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
	 * Открыть письмо по теме
	 * @param  {string} letterId
	 */
	openByLetterId (letterId) {
		this.page.click(this.locators.letterByLetterId(letterId));
	}

	markReadUnread (letterId) {
		this.page.click(this.locators.letterReadCheckbox(letterId));
	}

	isRead (letterId) {
		return $(this.locators.letterReadStatus(letterId)) === null;
	}


}

export default new LettersPage();
