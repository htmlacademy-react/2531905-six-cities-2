import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {City} from '@/types';

export const getActiveSort = (state: State): string => state[NameSpace.App].activeSort;
export const getCurrentCity = (state: State): City => state[NameSpace.App].currentCity;
