import DefaultPage from '../../default';

class LetterToolbar extends DefaultPage {
	constructor() {
		super('toolbar');
	}

    get locators () {
        const container = '.portal-menu';
        const moreDropdownContainer = container + ' ' + '.dropdown__menu .list';
        const moreListContainer = '.list-nested__content' + ' ' + '.list-nested-letter-more .list';

        return {
            container,
            moreDropdownContainer,
            moreListContainer,
            back: container + ' ' + '[title="Вернуться"]',
            
            delete: container + ' ' + '[title="Удалить"]',
            archive: container + ' ' + '[title="В архив"]',
            spam: container + ' ' + '[title="Спам"]',
            toFolder: container + ' ' + '[title="В папку"]',
            more: container + ' ' + '[title="Ещё"]',
            moreDropdown: {
                readUnread: moreDropdownContainer + ' ' + '.list-item:nth-child(1)',
                flag: moreDropdownContainer + ' ' + '.list-item:nth-child(2)',
                createEvent: moreDropdownContainer + ' ' + '.list-item:nth-child(3)',
                print: moreDropdownContainer + ' ' + '.list-item:nth-child(4)',
                createFilter: moreDropdownContainer + ' ' + '.list-item:nth-child(5)',
                translateLetter: moreDropdownContainer + ' ' + '.list-item:nth-child(6)',
                findAllLetters: moreDropdownContainer + ' ' + '.list-item:nth-child(8)',
                moreButton: moreDropdownContainer + ' ' + '.list-item:nth-child(10)',
                moreList: {
                    redirect: moreListContainer+ ' ' + '.list-item:nth-child(1)',
                    redirectAsInclusion: moreListContainer + ' ' + '.list-item:nth-child(2)',
                    serviceHeaders: moreListContainer + ' ' + '.list-item:nth-child(3)',
                    download: moreListContainer + ' ' + '.list-item:nth-child(4)',
                    openInNewTab: moreListContainer + ' ' + '.list-item:nth-child(5)',
                },
            },
            response: container + ' ' + '[title="Ответить"]',
            forward: container + ' ' + '[title="Переслать"]',

            previous: container + ' ' + '[title="Предыдущее"]',
            next: container + ' ' + '[title="Следующее"]',
            search: '.search-panel-button',
        }
    }

    clickComponent(){
        
    }

    openMoreDropdown () {
        this.page.click(this.locators.more);
        this.page.waitForVisible(this.locators.moreDropdownContainer);
    }

    toFolderDropdown () {
        this.page.click(this.locators.toFolder);
    }
    
    markReadUnread () {
        //открывается дропдаун
        this.page.click(this.locators.more);
        //отмечается прочитанным/непрочитанным
		this.page.click(this.locators.moreDropdown.readUnread);
    }

    markFlagUnflag () {
        //открывается дропдаун
        this.page.click(this.locators.more);
        //отмечается прочитанным/непрочитанным
		this.page.click(this.locators.moreDropdown.flag);
    }
    
    backToLetterFolder(){
        this.page.waitForVisible(this.locators.back, 2000);
        //переход к папке письма
        this.page.click(this.locators.back);
    }

    toArchive(){
        //перенос письма в архив
        this.page.click(this.locators.archive);
    }

    openInNewTab() {
        this.page.click(this.locators.more);

        const moreButton = this.locators.moreDropdown.moreButton;
        this.page.waitForVisible(moreButton);
        this.page.click(moreButton);

        const openTab = this.locators.moreDropdown.moreList.openInNewTab;
        this.page.waitForVisible(openTab);
        this.page.click(openTab);       
    }

    addEvent() {
        this.page.click(this.locators.more);

        const addEventButton = this.locators.moreDropdown.createEvent;
        this.page.waitForVisible(addEventButton);
        this.page.click(addEventButton);
    }

    print() {
        this.page.click(this.locators.more);

        const printButton = this.locators.moreDropdown.print;
        this.page.waitForVisible(printButton);
        this.page.click(printButton);
    }

    filter() {
        this.page.click(this.locators.more);

        const filterButton = this.locators.moreDropdown.createFilter;
        this.page.waitForVisible(filterButton);
        this.page.click(filterButton);
    }

    translate() {
        this.page.click(this.locators.more);

        const translateButton = this.locators.moreDropdown.translateLetter;
        this.page.waitForVisible(translateButton);
        this.page.click(translateButton);
    }

    find() {
        this.page.click(this.locators.more);

        const findButton = this.locators.moreDropdown.findAllLetters;
        this.page.waitForVisible(findButton);
        this.page.click(findButton);
    }

    redirect() {
        this.page.click(this.locators.more);

        const moreButton = this.locators.moreDropdown.moreButton;
        this.page.waitForVisible(moreButton);
        this.page.click(moreButton);

        const redirectButton = this.locators.moreDropdown.moreList.redirect;
        this.page.waitForVisible(redirectButton);
        this.page.click(redirectButton);      
    }

    redirectAsInclusion() {
        this.page.click(this.locators.more);

        const moreButton = this.locators.moreDropdown.moreButton;
        this.page.waitForVisible(moreButton);
        this.page.click(moreButton);

        const redirectButton = this.locators.moreDropdown.moreList.redirectAsInclusion;
        this.page.waitForVisible(redirectButton);
        this.page.click(redirectButton);      
    }

    serviceHeaders() {
        this.page.click(this.locators.more);

        const moreButton = this.locators.moreDropdown.moreButton;
        this.page.waitForVisible(moreButton);
        this.page.click(moreButton);

        const getHeadersButton = this.locators.moreDropdown.moreList.serviceHeaders;
        this.page.waitForVisible(getHeadersButton);
        this.page.click(getHeadersButton);      
    }

    response(){
        this.page.click(this.locators.response);
    }

    forward(){
        this.page.click(this.locators.forward);
    }

    search() {
        this.page.click(this.locators.search);
    }

    toSpam(){
        const locator = this.locators.spam;
        this.page.waitForVisible(locator);
        this.page.click(locator);
    }
    
    toNextLetter(){
        this.page.click(this.locators.next);
    }

        
    toPrevLetter(){
        this.page.click(this.locators.previous);
    }

    deleteLetter(){
        this.page.click(this.locators.delete);
    }
}

export default new LetterToolbar();
