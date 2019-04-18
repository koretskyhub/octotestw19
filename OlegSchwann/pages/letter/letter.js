import DefaultPage from '../default';

class LetterPage extends DefaultPage {
    constructor() {
        super('letters')
    }

    get locators() {
        return {
            buttonToFolder: ".button2_folder",
            buttonToArhive: ".nav_expanded > a:nth-child(6)"
        }
    }

    /**
     * Проверяет, существует ли письмо на странице https://octavius.mail.ru/archive/.
     * @returns {string}
     */
    getLetterId() {
        let letter_id_regex = /[0-9a-fA-F]+:([0-9a-fA-F]+):[0-9a-fA-F]+/;
        let url = browser.getUrl();
        let id = url.match(letter_id_regex)[1];
        return id;
    }

    sendToArhive() {
        this.page.waitForVisible(this.locators.buttonToFolder);
        this.page.click(this.locators.buttonToFolder);
        this.page.waitForVisible(this.locators.buttonToArhive);
        this.page.click(this.locators.buttonToArhive);
    }

}

export default new LetterPage();
