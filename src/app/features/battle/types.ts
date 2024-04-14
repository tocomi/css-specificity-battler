import { SelectorWithSpecificity } from '../css-selector/types';

export type Stage = 'opening' | 'battle' | 'result' | 'gameover';

export type Winner = 'player' | 'enemy' | 'draw';
export type Result = 'win' | 'lose' | 'draw' | 'beforeBattle';

export type Battler = SelectorWithSpecificity;
