import DefaultPage from '../default';

class LetterPage extends DefaultPage {
    constructor() {
        super('letters')
    }

    get locators() {
        return {
            buttonToFolder: '.button2_folder',
            buttonToArhive: '.nav_expanded > a:nth-child(6)'
        }
    }

    /**
     * Получает уникальный идентификатор письма.
     * @returns {string}
     */
    getLetterId() {
        const letter_id_regex = /[0-9a-fA-F]+:([0-9a-fA-F]+):[0-9a-fA-F]+/;
        const url = browser.getUrl();
        const id = url.match(letter_id_regex)[1];
        return id;
    }

    sendToArchive() {
        this.page.waitForVisible(this.locators.buttonToFolder);
        this.page.click(this.locators.buttonToFolder);
        this.page.waitForVisible(this.locators.buttonToArhive);
        this.page.click(this.locators.buttonToArhive);
    }

}

export default new LetterPage();
