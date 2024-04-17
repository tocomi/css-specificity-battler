import { SelectorWithSpecificity } from '../css-selector/types';

export type Stage = 'opening' | 'selectBuddy' | 'battle';

export type Winner = 'player' | 'enemy' | 'draw';
export type Result = 'win' | 'lose' | 'draw' | 'beforeBattle';

export type Battler = SelectorWithSpecificity;
