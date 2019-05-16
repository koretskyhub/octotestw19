import DefaultPage from '../../default';

class Modals extends DefaultPage {
	constructor() {
		super('modals');
	}

	get locators () {
		return {
			modalWindow: '.compose-app__compose',
			closeModalButton: '.compose-app__buttons :nth-child(3)',
			senderInFilter:'.layer-window__block input.c01136',
			theme: '.subject__wrapper--2mk6m .inputContainer--nsqFu .container--H9L5q',
			inclusionFileName: '.container_header--ymfrd .text--3Ogn-',
			body: ' .js-readmsg-msg',
			redirectModal: '.layer-window__block .layer_letter-redirect',
		}
	}
	
	getFilterSender() {
		browser.waitForVisible(this.locators.senderInFilter);

		return browser.getValue(this.locators.senderInFilter);
	}

	getTheme(){
		browser.waitForVisible(this.locators.theme);

		return browser.getValue(this.locators.theme);
	}

	getInclusionFileName(){
		return $(this.locators.inclusionFileName).getText();
	}

	getBody(){
		return $(this.locators.modalWindow + ' '  + this.locators.body).getText().replace(/\s/g, '');
	}

	closeModal(){
		browser.waitForVisible(this.locators.modalWindow);
		browser.waitForVisible(this.locators.closeModalButton);
		browser.click(this.locators.closeModalButton);
		browser.waitUntil(() => $(this.locators.modalWindow).value === null);
	}

	checkRedirect(){
		browser.waitForVisible(this.locators.redirectModal);
	}
}

export default new Modals();
