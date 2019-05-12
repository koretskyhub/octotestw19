import DefaultSteps from './default';
import page from '../pages/layout';
import letter from '../pages/letter';
import { dimensions } from '../store';
import assert from 'assert';

class LayoutSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	setPaneAndSize (pane, width = 1400){
		this.pane = pane;
		if (width >= dimensions.widths.sizeL) {
			this.page.setLayout(width);
			this.page.setPane(pane);
		} else {
			// this.page.setLayout(Layout.sizeL);
			this.page.setPane(pane);
			this.page.setLayout(width);
		}
	}

	checkLastNotifyPopup(expectedNotifyText){
		browser.waitUntil(() => {
			return ((expectedNotifyText) === this.page.getLastNotifyText()) 
		}, 1000, `попап ${expectedNotifyText} отсутсвует`);
	}

	checkHederTab(tabsBefore, tabsAfter) {
		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);
		assert.equal(tabsDiff.length, 1, 'открыто неверное количество вкладок');
		browser.switchTab(tabsDiff[0]);

		const shUrlRe = /^https:\/\/octavius.mail.ru\/message\/\d+\/headers\/$/;

		assert.ok(shUrlRe.test(browser.getUrl()), 'Была открыта другая вкладка');
	
		browser.close();
	}

	checkPrintTab(tabsBefore){
		const tabsAfter = browser.getTabIds();
		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);

		assert.equal(tabsDiff.length, 1, 'открыто неверное количество вкладок');
		browser.switchTab(tabsDiff[0]);

		browser.waitForVisible(this.locators.printBody);

		browser.close()
	}

	checkEventTab(tabsBefore){
		const tabsAfter = browser.getTabIds();

		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);
		assert.equal(tabsDiff.length, 1, 'открыто неверное количество вкладок');
		
		browser.switchTab(tabsDiff[0]);
		browser.waitForVisible(this.page.locators.popupPane);
		browser.close()
	}

	checkLetterInNewTab(letterBefore, tabsBefore){
		const tabsAfter = browser.getTabIds();
		const tabsDiff = tabsAfter.filter((e) => tabsBefore.indexOf(e) === -1);
		assert.equal(tabsDiff.length, 1, 'открыто неверное количество вкладок');
		browser.switchTab(tabsDiff[0]);
		
		browser.waitForVisible(letter.locators.letterHead);
		assert.equal(letterBefore, browser.getHTML(letter.locators.letterHead), 'Была открыта другая вкладка');
		browser.close();
	}
}

export default new LayoutSteps();
