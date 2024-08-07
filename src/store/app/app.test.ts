import {CITIES, sortOptions} from '@/constants';
import {appSlice, setActiveSort, setCurrentCity} from '@/store/app/app';
import {initAppState as initState} from '@/utils/mocks';

describe('App slice', () => {
  it('should return initial state with unknown action', () => {
    const emptyAction = { type : 'unknown' };
    const expectedState = initState();

    const result = appSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default state with empty action', () => {
    const emptyAction = { type : '' };
    const expectedState = initState();

    const result = appSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set currentCity with "setCurrentCity" action', () => {
    const expectedCity = CITIES[1];
    const initialState = initState();
    const expectedState = {...initialState, currentCity: expectedCity};

    const result = appSlice.reducer(initialState, setCurrentCity(expectedCity));

    expect(result).toEqual(expectedState);
  });

  it('should set activeSort with "setActiveSort" action', () => {
    const expectedSort = sortOptions.PriceAsc;
    const initialState = initState();
    const expectedState = {...initialState, activeSort: expectedSort};

    const result = appSlice.reducer(initialState, setActiveSort(expectedSort));

    expect(result).toEqual(expectedState);
  });
});
