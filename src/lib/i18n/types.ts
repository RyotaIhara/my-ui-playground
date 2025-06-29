export type Locale = 'ja';

export interface TranslationKeys {
  common: {
    appTitle: string;
    navigation: {
      home: string;
      votingList: string;
      myPage: string;
    };
  };
  voting: {
    title: string;
    add: string;
    list: string;
  };
}

export type TranslationFunction = (key: string) => string; 