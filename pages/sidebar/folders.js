import DefaultPage from '../default';

class FoldersPage extends DefaultPage {
	constructor() {
		super('letters')
	}

	get locators() {
		const container = '.nav-folders' + ' ' + 'nav';
		return {
			container,
			folderByName: (folderName) => {
				let folder;
				switch (folderName) {
					case 'Входящие':
						folder = ':nth-child(1)';
						break;
					case 'Социальные сети':
						folder = ':nth-child(2)';
						break;
					case 'Рассылки':
						folder = ':nth-child(3)';
						break;
					case 'Отправленные':
						folder = ':nth-child(4)';
						break;
					case 'Черновики':
						folder = ':nth-child(5)';
						break;
					case 'Архив':
						folder = ':nth-child(6)';
						break;
					case 'Спам':
						folder = ':nth-child(7)';
						break;
					case 'Корзина':
						folder = ':nth-child(8)';
						break;
				
					default:
						throw new Error('unknown folder');
				}
				return container + ' ' + folder;
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
