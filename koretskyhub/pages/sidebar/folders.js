import DefaultPage from '../default';

class FoldersPage extends DefaultPage {
	constructor() {
		super('letters')
	}

	get locators() {
		const container = '.nav-folders' + '>' + 'nav';
		return {
			container,
			folderByName: (folderName) => {
				const folderPosition = new Map([
					['Входящие', 1],
					['Социальные сети', 2], 
					['Рассылки', 3], 
					['Отправленные', 4], 
					['Черновики', 5], 
					['Архив', 6], 
					['Спам', 7], 
					['Корзина', 8], 
				])
				
				const pos = folderPosition.get(folderName);

				if (pos === undefined) throw new Error('unknown folder');
				
				return container + ' ' + `:nth-child(${pos}).nav__item`;
			}
		}
	}

	/**
	 * Клик по любой папке, если сайдбар не узкий
	 * @param {string} folderName
	 */
	clickFolderByName(folderName) {
		const locator = this.locators.folderByName(folderName);
		this.page.waitForVisible(locator);
		this.page.click(locator);
	}

}

export default new FoldersPage();
