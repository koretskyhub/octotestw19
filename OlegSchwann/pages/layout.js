import DefaultPage from './default';

class Layout extends DefaultPage {
	constructor() {
		super('layout')
	}

	get locators() {
		const container = '[data-qa-id="application"]';
		const sideBar = container + ' [data-qa-id="main"] [data-qa-id="sidebar"]';
		const dropDown = sideBar + ' [data-qa-id="dropdown-settings"]';
		const dropDownButton = dropDown + ' [data-qa-id="dropdown-button"]';
		const dropDownList = dropDown + ' [data-qa-id="dropdown-list"]';
		const layoutSwitch = dropDownList + ' [data-qa-id="layout-toggle"]';
		const paneCheckbox = layoutSwitch + ' .b-checkbox';
		return {
			container,
			sideBar,
			dropDown,
			dropDownButton,
			dropDownList,
			layoutSwitch,
			paneCheckbox
		}
	}

	toggleDropdownButton() {
		const button = this.locators.dropDownButton;
		this.page.waitForVisible(button);
		this.page.click(button);
	}

	setPane(pane) {
		this.toggleDropdownButton();
		this.page.waitForVisible(this.locators.dropDownList);
		
		const is3pane = this.hasClass(this.locators.paneCheckbox, 'b-checkbox_checked')

		switch (pane) {
			case 2:
				if (is3pane) {
					this.page.click(this.locators.layoutSwitch);
				} else {
					// закрываем за собой меню
					this.toggleDropdownButton();
				}
				break;
			case 3:
				if (!is3pane) {
					this.page.click(this.locators.layoutSwitch);

				} else {
					// закрываем за собой меню
					this.toggleDropdownButton();
				}
				break;
		}
	}

	setLayout (width) {
		this.currentSize = width;
		const aspect_ratio = 1.3;
		let height = width / aspect_ratio;
		if (width < Layout.sizeXS) {
			height = width * aspect_ratio;
		}

		this.page.setViewportSize({width, height});
	}

}

export default new Layout();
