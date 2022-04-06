import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from 'redux/modules/auth';
import AuthForm from 'components/Auth/AuthForm';
import { check } from 'redux/modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, userState } = useSelector(
    ({ auth, user }) => ({
      // state.auth, state.user
      form: auth.login, // store이름 auth, auth.signup에(회원 정보 목록 있음)
      auth: auth.auth,
      authError: auth.authError,
      userState: user.userState,
    }),
  );

  // 인풋 변경 이벤트 핸들러
  const onChange = useCallback(
    (e) => {
      console.log(e.target.name);
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'login',
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    // console.log(e.targe.name);
    e.preventDefault();
    const { userName, password } = form;
    dispatch(login({ userName, password }));
  };

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      setError(authError.response.data.message);
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      navigate(process.env.PUBLIC_URL + '/canvas/directory');
      // dispatch(check());
    }
  }, [auth, authError, dispatch, navigate]);

  // useEffect(() => {
  //   if (userState) {
  //     console.log('check 성공');
  //     navigate(process.env.PUBLIC_URL + '/canvas/directory');
  //     try {
  //       localStorage.setItem('userState', JSON.stringify(userState));
  //     } catch (e) {
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [userState, navigate]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
