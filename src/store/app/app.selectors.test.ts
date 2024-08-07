import {CITIES, NameSpace, sortOptions} from '@/constants';
import {getActiveSort, getCurrentCity} from '@/store/app/selectors';
import {initAppState as initState} from '@/utils/mocks';

describe('appSlice selectors', () => {
  it('should return activeSort from state', () => {
    const activeSort = sortOptions.Popular;
    const state = initState();

    const result = getActiveSort({ [NameSpace.App]: state });

    expect(result).toBe(activeSort);
  });

  it('should return currentCity from state', () => {
    const currentCity = CITIES[0];
    const state = initState();

    const result = getCurrentCity({ [NameSpace.App]: state });

    expect(result).toBe(currentCity);
  });
});
