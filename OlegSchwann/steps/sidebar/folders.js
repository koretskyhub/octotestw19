import DefaultSteps from '../default';
import page from '../../pages/sidebar/folders';

class FoldersSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	clickFolderByName(folderName) {
		this.page.clickFolderByName(folderName);
	}

}

export default new FoldersSteps();
