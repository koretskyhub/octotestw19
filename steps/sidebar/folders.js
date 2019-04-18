import DefaultSteps from '../default';
import page from '../../pages/sidebar/folders';

class FoldersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	folderUrl(folderName){
		let folder;
		switch (folderName) {
			case 'Входящие':
				folder = 'inbox';
				break;
			case 'Социальные сети':
				folder = 'social'
				break;
			case 'Рассылки':
				folder = 'newsletters';
				break;
			case 'Отправленные':
				folder = 'sent';
				break;
			case 'Черновики':
				folder = 'drafts';
				break;
			case 'Архив':
				folder = 'archive';
				break;
			case 'Спам':
				folder = 'spam';
				break;
			case 'Корзина':
				folder = 'trash';
				break;
		
			default:
				throw new Error('unknown folder');
		}
		return `https://octavius.mail.ru/${folder}/`;
	}

	clickFolderByName(folderName) {
		this.page.clickFolderByName(folderName);
		this.page.waitForUrl(this.folderUrl(folderName));
	}

	get currentFolder(){
		let folderUrl = browser.getUrl().slice(0, -1);
		return folderUrl.slice(0, folderUrl.lastIndexOf('/'));
	}

}

export default new FoldersSteps();
