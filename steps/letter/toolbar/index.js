import DefaultSteps from '../../default';
import toolbar from '../../../pages/letter/toolbar';

class LetterToolbarSteps extends DefaultSteps {
	constructor() {
		super(toolbar);
	}

    markReadUnread () {
       this.page.markReadUnread();
	}

}

export default new LetterToolbarSteps();

