import DefaultPage from '../default';

class ArhivePage extends DefaultPage {
    constructor() {
        super('letters')
    }

    get locators () {

        return {
            letterWithId: (id) => {
                return `a.llc[href*="${id}"]`;
            }
        }
    }

    /**
     * Проверяет, существует ли письмо на странице https://octavius.mail.ru/archive/.
     * @returns {boolean}
     */
    isLetterExistById(id) {
        this.page.waitForVisible(this.locators.letterWithId(id), 10000);
        return true
    }
}

export default new ArhivePage();
