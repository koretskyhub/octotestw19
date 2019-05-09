import DefaultSteps from '../default';
import page from '../../pages/letter/letter';
const assert = require('assert');

class LetterSteps extends DefaultSteps {
    constructor() {
        super(page);
    }

    getLetterId() {
        const id = this.page.getLetterId();

        assert.ok(id, `Letter URL should have unique id, found '${id}'.`);

        return id
    }

    sendToArchive(){
        this.page.sendToArchive();
    }
}

export default new LetterSteps();