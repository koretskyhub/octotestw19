import DefaultPage from '../default';

class Letter extends DefaultPage {
	constructor() {
		super('toolbar');
	}

    get locators () {
        return {
            readUnreadCheckbox: '.letter-status2_unread',
            readStatus: '.letter-status2_false',
            unreadStatus:'.letter-status2_true',
            translator: '.letter__translator .translator',
            letterHead: '.letter__head',
            threadSubject: '.thread__subject',
            sender: '.letter__contact-item',
            flagStatus: '.letter-status2_flagged',
            body: '.js-readmsg-msg',
        }
    }

    getInvertedReadStatus(){
        if ($(this.locators.readUnreadCheckbox).getAttribute('class').search('true') !== -1){
            return this.locators.readStatus;
        } else return this.locators.unreadStatus;
    }

    getInvertedFlagStatus(){
        if ($(this.locators.flagStatus).getAttribute('class').search('true')){
            return this.locators.readStatus;
        } else return this.locators.unreadStatus;
    }

    getBody() {
        return $(this.locators.body).getText().replace(/\s/g, '');
    }

    getSubject() {
        return ($(this.locators.threadSubject).getText() === '<Без темы>') ?
		'Untitled' : $(this.locators.threadSubject).getText();
    }

    getSender(){
		return $(this.locators.sender).getAttribute('title');
    }
    
    getHTML(){
        browser.waitForVisible(this.locators.letterHead);
		return browser.getHTML(this.locators.letterHead);
    }
}

export default new Letter();
