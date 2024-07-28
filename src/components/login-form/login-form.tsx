import {ChangeEvent, FormEvent, useState} from 'react';
import clsx from 'clsx';

import {login} from '@/store/user/api-actions';
import {RequestStatus} from '@/constants';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getLoginResponseErrors, getRequestStatus} from '@/store/user/selectors';
import {validateEmail, validatePassword} from '@/utils';

import classes from './login-form.module.css';

type LoginFormData = {
  email: string;
  password: string;
}

function LoginForm() {
  const dispatch = useAppDispatch();
  const responseErrors = useAppSelector(getLoginResponseErrors);
  const status = useAppSelector(getRequestStatus);
  const isLoading = status === RequestStatus.Pending;
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const isBtnDisabled = isLoading || Object.values(formErrors).some((field) => field.length > 0);

  const validateForm = () => {
    let formValid = true;
    if (!validateEmail(formData.email)) {
      setFormErrors((prevState) => ({ ...prevState, email: 'Wrong Email format' }));
      formValid = false;
    }
    if (!validatePassword(formData.password)) {
      setFormErrors((prevState) => ({ ...prevState, password: 'Password should have both letter and number' }));
      formValid = false;
    }

    return formValid;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(login(formData));
    }
  };

  const handleFormDataChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = evt.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevState) => ({ ...prevState, [name]: '' }));
  };

  return (
    <form className="login__form form" onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className={`login__input form__input ${clsx(formErrors.email.length && classes.inputError)}`}
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={isLoading}
          onChange={handleFormDataChange}
        />
        <p className={classes.formErrorMessage}>
          {formErrors.email}
        </p>
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className={`login__input form__input ${clsx(formErrors.password.length && classes.inputError)}`}
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={isLoading}
          onChange={handleFormDataChange}
        />
        <p className={classes.formErrorMessage}>
          {formErrors.password}
        </p>
      </div>
      <ul className={classes.errors}>
        {
          responseErrors.map((error) => (
            <li key={error}>{error}</li>
          ))
        }
      </ul>
      <button className="login__submit form__submit button" type="submit" disabled={isBtnDisabled}>
        {isLoading ? 'Loading ...' : 'Sign in'}
      </button>
    </form>
  );
}

export default LoginForm;
