import DefaultSteps from '../default';
import page from '../../pages/letter/letter';

class LetterSteps extends DefaultSteps {
    constructor() {
        super(page);
    }

    getLetterId(subject) {
        let id = this.page.getLetterId();
        if (!id) {
            let message = `letter URL shod have unic id, found '${id}'.`;
            throw new Error(message);
        }
        return id
    }

    sendToArhive(){
        this.page.sendToArhive();
    }
}

export default new LetterSteps();