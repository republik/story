export type Canton = 'ZH' | 'SG' | 'BS';

export type Reason = {
  id: number;
  text: string;
  author: {
    canton: Canton;
  };
};

export type Choices = {
  total: number;
  yes: number;
  no: number;
  yesCategories: [
    {
      key: string;
      count: number;
    }
  ];
};
