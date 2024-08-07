import {AuthorizationStatus, NameSpace, RequestStatus} from '@/constants';
import {getAuthorizationStatus, getIsUserAuthorized, getLoginResponseErrors, getRequestStatus, getUser} from '@/store/user/selectors';
import {initUserState as initState} from '@/utils/mocks';

describe('userSlice selectors', () => {
  it('should return authorization status from state', () => {
    const authorizationStatus = AuthorizationStatus.Unknown;
    const state = initState();

    const result = getAuthorizationStatus({ [NameSpace.User]: state });

    expect(result).toBe(authorizationStatus);
  });

  it('should return isUserAuthorized from state', () => {
    const state = initState();

    const result = getIsUserAuthorized({ [NameSpace.User]: state });

    expect(result).toBe(false);
  });

  it('should return request status from state', () => {
    const requestStatus = RequestStatus.Idle;
    const state = initState();

    const result = getRequestStatus({ [NameSpace.User]: state });

    expect(result).toBe(requestStatus);
  });

  it('should return login response errors from state', () => {
    const state = initState();

    const result = getLoginResponseErrors({ [NameSpace.User]: state });

    expect(result).toEqual([]);
  });

  it('should return user data from state', () => {
    const state = initState();

    const result = getUser({ [NameSpace.User]: state });

    expect(result).toBe(null);
  });
});
