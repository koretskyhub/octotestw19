import DefaultSteps from '../default';
import page from '../../pages/arhive/arhive';
const assert = require('assert');

class ArhiveSteps extends DefaultSteps {
    constructor() {
        super(page);
    }

    /**
     * Проверяет, существует ли на странице плашка с письмом, только что отправленным в архив.
     * @returns {boolean}
     */
    findLetterById(id) {
        const exist = this.page.isLetterExistById(id);
        assert.ok(exist, 'Required letter does not exist');
    }
}

export default new ArhiveSteps();
