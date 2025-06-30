export type Locale = 'ja';

export interface TranslationKeys {
  common: {
    appTitle: string;
    navigation: {
      home: string;
      votingList: string;
      raceList: string;
      myPage: string;
    };
  };
  voting: {
    title: string;
    add: string;
    list: {
      title: string;
      table: {
        raceName: string;
        horseNumber: string;
        type: string;
        amount: string;
        odds: string;
        expectedPayout: string;
      };
    };
  };
}

export type TranslationFunction = (key: string) => string; 