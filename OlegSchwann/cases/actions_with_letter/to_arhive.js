import main from '../../steps/main';

import inbox  from '../../steps/inbox/inbox';
import letter from '../../steps/letter/letter';
import arhive from '../../steps/arhive/arhive';


describe('test id', () => {
    const message = 'Send first letter to archive.';
    it(message, () => {
        const login = process.env.LOGIN;
        const password = process.env.PASSWORD;
        if (!login || !password) {
            throw Error("Env must have LOGIN and PASSWORD variables.")
        }

        main.open('https://mail.ru');

        main.login(login, password);

        main.open('https://octavius.mail.ru/inbox/');

        inbox.openFirstLetter();

        const id = letter.getLetterId();

        letter.sendToArhive();

        main.open('https://octavius.mail.ru/archive/');

        arhive.findLetterById(id);
    });
});
