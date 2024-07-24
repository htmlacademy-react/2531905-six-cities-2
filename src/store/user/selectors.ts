import {AuthorizationStatus, NameSpace, RequestStatus} from '@/constants';
import {State} from '@/types/state';
import {UserData} from '@/types';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getRequestStatus = (state: State): RequestStatus => state[NameSpace.User].requestStatus;
export const getLoginResponseErrors = (state: State): string[] => state[NameSpace.User].loginResponseErrors;
export const getUser = (state: State): UserData | null => state[NameSpace.User].user;
