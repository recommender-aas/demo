import { englishMessages } from 'admin-on-rest';
import frenchMessages from 'aor-language-french';

import customFrenchMessages from './uk';
import customEnglishMessages from './en';

export default {
    uk: { ...frenchMessages, ...customFrenchMessages },
    en: { ...englishMessages, ...customEnglishMessages },
};
