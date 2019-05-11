import DefaultSteps from '../default';
import page from '../../pages/sidebar/folders';

class FoldersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	folderUrl(folderName){
		const folderSlug = new Map([
			['Входящие', 'inbox'],
			['Социальные сети', 'social'], 
			['Рассылки', 'newsletters'], 
			['Отправленные', 'sent'], 
			['Черновики', 'drafts'], 
			['Архив', 'archive'], 
			['Спам', 'spam'], 
			['Корзина', 'trash'], 
		])

		const slug = folderSlug.get(folderName);
		
		if (slug == undefined) throw new Error('unknown folder');
		
		return `https://octavius.mail.ru/${slug}/`;
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
