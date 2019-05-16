import main from '../../steps/main';

import inbox  from '../../steps/inbox/inbox';
import letter from '../../steps/letter/letter';
import arhive from '../../steps/arhive/arhive';
const assert = require('assert');

describe('test id', () => {
    const message = 'Send first letter to archive.';
    it(message, () => {

        // TODO: вот это не должно быть в самом тесте. Это должно быть ДО выполнения теста.
        const login = process.env.LOGIN;
        const password = process.env.PASSWORD;

        main.open('https://mail.ru');

        main.login(login, password);

        main.open('https://octavius.mail.ru/inbox/');

        inbox.openFirstLetter();

        const id = letter.getLetterId();

        letter.sendToArchive();

        main.open('https://octavius.mail.ru/archive/');

        arhive.findLetterById(id);
    });
});
