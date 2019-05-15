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

            "Вернуться": container + ' ' + '[title="Вернуться"]',
            "Удалить": container + ' ' + '[title="Удалить"]',
            "В архив": container + ' ' + '[title="В архив"]',
            "Спам": container + ' ' + '[title="Спам"]',
            "В папку": container + ' ' + '[title="В папку"]',
            "Предыдущее": container + ' ' + '[title="Предыдущее"]',
            "Следующее": container + ' ' + '[title="Следующее"]',
            "Поиск": '.search-panel-button', 

            moreDropdownButton: container + ' ' + '[title="Ещё"]',
            moreDropdown: {
                "Пометить прочитанным": moreDropdownContainer + ' ' + '.list-item:nth-child(1)',
                "Пометить непрочитанным": moreDropdownContainer + ' ' + '.list-item:nth-child(1)',
                "Пометить флажком": moreDropdownContainer + ' ' + '.list-item:nth-child(2)',
                "Снять флажок": moreDropdownContainer + ' ' + '.list-item:nth-child(2)',
                "Создать событие": moreDropdownContainer + ' ' + '.list-item:nth-child(3)',
                "Распечатать": moreDropdownContainer + ' ' + '.list-item:nth-child(4)',
                "Создать фильтр": moreDropdownContainer + ' ' + '.list-item:nth-child(5)',
                "Перевести письмо": moreDropdownContainer + ' ' + '.list-item:nth-child(6)',
                "Найти все письма": moreDropdownContainer + ' ' + '.list-item:nth-child(8)',
                
                moreListButton: moreDropdownContainer + ' ' + '.list-item:nth-child(10)',
                moreList:  {
                    "Перенаправить": moreListContainer+ ' ' + '.list-item:nth-child(1)',
                    "Переслать как вложение": moreListContainer + ' ' + '.list-item:nth-child(2)',
                    "Служебные заголовки": moreListContainer + ' ' + '.list-item:nth-child(3)',
                    "Скачать на компьютер": moreListContainer + ' ' + '.list-item:nth-child(4)',
                    "Открыть в новой вкладке": moreListContainer + ' ' + '.list-item:nth-child(5)',
                    "Ответить": container + ' ' + '[title="Ответить"]',
                    "Переслать": container + ' ' + '[title="Переслать"]',
                }
            }
        }
    }

    clickButton(buttonName){
        const locators = this.locators;
        let target;
        
        if (locators[buttonName] !== undefined) {
            target = locators[buttonName];
        } else {
            if (locators.moreDropdown[buttonName] !== undefined) {
                this.openMoreDropdown();
                target = locators.moreDropdown[buttonName];
            } else {
                if (locators.moreDropdown.moreList[buttonName] !== undefined) {
                    this.openMoreList();
                    
                    target = locators.moreDropdown.moreList[buttonName];
                } else throw new Error('кнопки не существует');
            } 
        }
        this.page.waitForVisible(target);
        this.page.click(target);
    }

    // getInvertedReadStatus(){
    //     if ($('.letter-status2_unread').getAttribute('class').search('true') !== -1){
	// 		return '.letter-status2_false';
	// 	} else return '.letter-status2_true';
    // }

    // getInvertedFlagStatus(){
    //     if ($('.letter-status2_flagged').getAttribute('class').search('true')){
	// 		return '.letter-status2_false';
	// 	} else return '.letter-status2_true';
    // }

    openMoreDropdown () {
        this.page.click(this.locators.moreDropdownButton);
        this.page.waitForVisible(this.locators.moreDropdownContainer);
    }

    openMoreList () {
        this.openMoreDropdown();

        this.page.click(this.locators.moreDropdown.moreListButton);
        this.page.waitForVisible(this.locators.moreListContainer);
    }
}

export default new LetterToolbar();
