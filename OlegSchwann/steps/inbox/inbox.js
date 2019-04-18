import DefaultSteps from '../default';
import page from '../../pages/letters';

class LettersSteps extends DefaultSteps {
    constructor() {
        super(page);
    }

    openFirstLetter() {
        this.page.gotoFirstLetter();
    }
}

export default new LettersSteps();