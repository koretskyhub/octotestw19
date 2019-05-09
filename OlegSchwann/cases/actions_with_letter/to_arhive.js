import main from '../../steps/main';
import lettersSteps from '../../steps/letters'

import inbox  from '../../steps/inbox/inbox';
import letter from '../../steps/letter/letter';
import arhive from '../../steps/arhive/arhive';


describe('test id', () => {
    const message = 'Send first letter to archive.';
    it(message, () => {
        let login = process.env.LOGIN;
        let password = process.env.PASSWORD;
        if (!login || !password) {
            throw Error("Env must have LOGIN and PASSWORD variables.")
        }

        main.open('https://mail.ru');

        main.login('olegschwann@inbox.ru', 'Z1iOaptPA1x');

        main.open('https://octavius.mail.ru/inbox/');

        inbox.openFirstLetter();

        let id = letter.getLetterId();

        letter.sendToArhive();

        main.open('https://octavius.mail.ru/archive/');

        arhive.findLetterById(id);
    });
});
