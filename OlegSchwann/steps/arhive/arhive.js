import DefaultSteps from '../default';
import page from '../../pages/arhive/arhive';

class ArhiveSteps extends DefaultSteps {
    constructor() {
        super(page);
    }

    /**
     * Проверяет, существует ли на странице плашка с письмом, только что отправленным в архив.
     * @returns {boolean}
     */
    findLetterById(id) {
        let exist = this.page.isLetterExist(id);
        if (!exist) {
            throw Error('required letter does not exist');
        }
    }
}

export default new ArhiveSteps();