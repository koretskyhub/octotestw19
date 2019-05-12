import DefaultPage from '../../../default';
import toolbar from '../../toolbar/index';

class ToolbarSearchPanel extends DefaultPage {
	constructor() {
		super(toolbar);
	}

    get locators () {
        return {
            leftCol: '.search-panel__left-col',
            dropdown: '.search-panel__layer ._1Sq-e9MVzbKWUgdGRPfVlE',
            senderInFilter: '._4BfiogsReGxb7H9VTcSzv',
        }
    }

    search() {
		toolbar.clickButton("Поиск");

		browser.waitForVisible(this.locators.leftCol);
		browser.waitForVisible(this.locators.dropdown);
    }
    
    getFilterSender() {
        const senderInFilter = this.locators.senderInFilter;

        browser.waitForVisible(senderInFilter);

		return $(senderInFilter).getText();
    }
}

export default new ToolbarSearchPanel();
