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
				let folder;
				switch (folderName) {
					case 'Входящие':
						folder = ':nth-child(1).nav__item';
						break;
					case 'Социальные сети':
						folder = ':nth-child(2).nav__item';
						break;
					case 'Рассылки':
						folder = ':nth-child(3).nav__item';
						break;
					case 'Отправленные':
						folder = ':nth-child(4).nav__item';
						break;
					case 'Черновики':
						folder = ':nth-child(5).nav__item';
						break;
					case 'Архив':
						folder = ':nth-child(6).nav__item';
						break;
					case 'Спам':
						folder = ':nth-child(7).nav__item';
						break;
					case 'Корзина':
						folder = ':nth-child(8).nav__item';
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
