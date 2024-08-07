import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {City} from '@/types';

export const getActiveSort = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].activeSort;
export const getCurrentCity = (state: Pick<State, NameSpace.App>): City => state[NameSpace.App].currentCity;
