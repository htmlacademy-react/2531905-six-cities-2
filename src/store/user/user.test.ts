import { internet } from 'faker';
import {AuthorizationStatus, RequestStatus} from '@/constants';
import {userSlice} from '@/store/user/user';
import {checkAuth, login, logout} from '@/store/user/api-actions';
import {generateUser, initUserState as initState} from '@/utils/mocks';

describe('App slice', () => {
  it('should return initial state with unknown action', () => {
    const emptyAction = { type : 'unknown' };
    const expectedState = initState();

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default state with empty action', () => {
    const emptyAction = { type : '' };
    const expectedState = initState();

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "AUTH" to authorizationStatus and "user" with "checkAuthAction.fulfilled" action', () => {
    const user = generateUser();
    const initialState = initState();
    const expectedState = {...initialState, authorizationStatus: AuthorizationStatus.Auth, user};

    const result = userSlice.reducer(initialState, checkAuth.fulfilled(user, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NO_AUTH" to authorizationStatus with "checkAuthAction.rejected" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, authorizationStatus: AuthorizationStatus.NoAuth};

    const result = userSlice.reducer(initialState, checkAuth.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "PENDING" to requestStatus with "login.pending" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, requestStatus: RequestStatus.Pending};

    const result = userSlice.reducer(initialState, login.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "AUTH" to authorizationStatus and "user" and "SUCCESS" to requestStatus with "login.fulfilled" action', () => {
    const user = generateUser();
    const initialState = initState();
    const formData = { email: internet.email(), password: internet.password() };
    const expectedState = {...initialState, authorizationStatus: AuthorizationStatus.Auth, user, requestStatus: RequestStatus.Success};

    const result = userSlice.reducer(initialState, login.fulfilled(user, '', formData));

    expect(result).toEqual(expectedState);
  });

  it('should set "AUTH" to authorizationStatus and "user" and "SUCCESS" to requestStatus with "login.rejected" action', () => {
    const formData = { email: internet.email(), password: internet.password() };
    const initialState = initState();
    const expectedState = {...initialState, authorizationStatus: AuthorizationStatus.NoAuth, requestStatus: RequestStatus.Failed};
    const result = userSlice.reducer(initialState, login.rejected(null, '', formData));

    expect(result).toEqual(expectedState);
  });

  it('should set "NO_AUTH" to authorizationStatus and reset user with "logout.fulfilled" action', () => {
    const initialState = initState();
    const expectedState = {...initialState, authorizationStatus: AuthorizationStatus.NoAuth, user: null};

    const result = userSlice.reducer(initialState, logout.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
