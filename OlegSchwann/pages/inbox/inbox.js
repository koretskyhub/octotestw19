import DefaultPage from '../default';

class InboxPage extends DefaultPage {
    constructor() {
        super()
    }

    get locators () {
        return {
            buttonToFolder: '.portal-menu-element:nth-child(6)',
            buttonToArhive: '.nav_expanded > a:nth-child(6)',
        }
    }

    moveToArhive(){
        this.page.waitForVisible(this.locators.buttonToFolder);
        this.page.click(this.locators.buttonToFolder);
        this.page.waitForVisible(this.locators.buttonToArhive);
        this.page.click(this.locators.buttonToArhive);
    }

}

export default new LettersPage();
