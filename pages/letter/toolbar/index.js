import DefaultPage from '../../default';

class LetterToolbar extends DefaultPage {
	constructor() {
		super('toolbar');
	}

    get locators () {
        const container = '.portal-menu';
        const moreDropdownContainer = container + ' ' + '.dropdown__menu .list';
        const moreListContainer = moreDropdownContainer + ' ' + '.list-nested-letter-more .list';

        return {
            container,
            moreDropdownContainer,
            moreListContainer,
            back: () => this.locators.container + ' ' + '[title="Вернуться"]',
            
            delete: () => this.locators.container + ' ' + '[title="Удалить"]',
            archive: () => this.locators.container + ' ' + '[title="В архив"]',
            spam: () => this.locators.container + ' ' + '[title="Спам"]',
            toFolder: () => this.locators.container + ' ' + '[title="В папку"]',
            more: () => this.locators.container + ' ' + '[title="Ещё"]',
            moreDropdown: {
                readUnread: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(1)',
                flag: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(2)',
                createEvent: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(3)',
                print: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(4)',
                createFilter: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(5)',
                translateLetter: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(6)',
                findAllLetters: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(7)',
                moreButton: () => this.locators.moreDropdownContainer + ' ' + ':nth-child(8)',
                moreList: {
                    forward: () => this.locators.moreListContainer+ ' ' + ':nth-child(1)',
                    forwardAsInclusion: () => this.locators.moreListContainer + ' ' + ':nth-child(2)',
                    serviceHeaders: () => this.locators.moreListContainer + ' ' + ':nth-child(3)',
                    download: () => this.locators.moreListContainer + ' ' + ':nth-child(4)',
                    openInNewTab: () => this.locators.moreListContainer + ' ' + ':nth-child(5)',
                },
            },
            response: () => this.locators.container + ' ' + '[title="Ответить"]',
            forward: () => this.locators.container + ' ' + '[title="Переслать"]',

            previous: () => this.locators.container + ' ' + '[title="Предыдущее"]',
            next: () => this.locators.container + ' ' + '[title="Следующее"]',
        }
    }

	markReadUnread () {
        //открывается дропдаун
        this.page.click(this.locators.more());
        //отмечается прочитанным/непрочитанным
		this.page.click(this.locators.moreDropdown.readUnread());
	}

}

export default new LetterToolbar();
