import DefaultSteps from './default';
import page from '../pages/layout';
import dimensions from '../store'

class LayoutSteps extends DefaultSteps {
	constructor() {
		super(page);
	}

	setPaneAndSize (pane, width = 1440){
		this.pane = pane;
		if (width >= dimensions.widths.sizeL) {
			this.page.setLayout(width);
			this.page.setPane(pane);
		} else {
			this.page.setLayout(Layout.sizeL);
			this.page.setPane(pane);
			this.page.setLayout(width);
		}
	}

}

export default new LayoutSteps();
