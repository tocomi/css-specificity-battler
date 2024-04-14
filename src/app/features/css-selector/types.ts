export type SelectorWithSpecificity = {
  selector: string;
  specificity: {
    A: number;
    B: number;
    C: number;
  };
};
