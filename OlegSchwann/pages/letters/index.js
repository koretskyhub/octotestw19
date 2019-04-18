import DefaultPage from '../default';

class LettersPage extends DefaultPage {
	constructor() {
		super('letters');

	}

	get locators() {
		let container = '.dataset__items';
		let firstLetter = `${container} a.llc:nth-child(1)`;
		let firstLetterFlag = `${firstLetter} button.ll-rs`;
		let firstLetterClickPlace = `${firstLetter} .ll-crpt`;
		let letterBody = '.letter-body';

		return {
			container,
			firstLetter,
			firstLetterFlag,
			firstLetterClickPlace,
			letterBody
		};
	}

	/**
	 * Проверяет, является ли первое письмо прочитанным.
	 * @returns {boolean}
	 */
	hasFirstLetterReadFlag() {
		this.page.waitForVisible(this.locators.firstLetterFlag);
		let is_active = this.hasClass(this.locators.firstLetterFlag, "ll-rs_is-active");
		return is_active;
	}

	/**
	 * Переходит на первое письмо в ящике.
	 */
	gotoFirstLetter() {
		this.page.waitForVisible(this.locators.firstLetterClickPlace);
		this.page.waitUntil(() => {
			return !browser.isVisible('#app-loader')
		}, 1000);
		this.page.click(this.locators.firstLetterClickPlace);
		this.page.waitForVisible(this.locators.letterBody)
	}

	/**
	 * Нажать на кнопку "прочитано" для первого письма."
	 */
	clickOnFlag() {
		this.page.waitUntil(() => {
			return !browser.isVisible('#app-loader')
		}, 1000);
		this.page.click(this.locators.firstLetterFlag);
	}

}

export default new LettersPage();
