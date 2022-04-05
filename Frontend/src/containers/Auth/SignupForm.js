import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup } from 'redux/modules/auth';
import AuthForm from 'components/Auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { check } from 'redux/modules/user';

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, userState } = useSelector(
    ({ auth, user }) => ({
      // state.auth, state.user
      form: auth.signup, // store이름 auth, auth.signup에(회원 정보 목록 있음)
      auth: auth.auth,
      authError: auth.authError,
      userState: user.userState,
    }),
  );

  // 인풋 변경 이벤트 핸들러
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'signup',
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      userName,
      password,
      passwordCheck,
      realName,
      nickName,
      birthday,
      phoneNum,
      gender,
      email,
    } = form;
    // 필수항목 중 하나라도 비어 있다면
    if (
      [userName, password, passwordCheck, realName, nickName, email].includes(
        '',
      )
    ) {
      setError('필수항목을 모두 입력해 주세요.');
      return;
    }
    if (password !== passwordCheck) {
      // 패스워드 다르면 오류출력 후 초기화
      setError('비밀번호가 일치하지 않습니다.');
      changeField({ form: 'signup', key: 'password', value: '' });
      changeField({ form: 'signup', key: 'passwordCheck', value: '' });
      return;
    }
    dispatch(
      signup({
        userName,
        password,
        realName,
        nickName,
        birthday,
        phoneNum,
        gender,
        email,
      }),
    );
  };

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log(authError);
      // console.log(authError.response.data.);
      // 아이디가 이미 존재
      if (authError.response.data.status === 500) {
        setError('이미 존재하는 아이디입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    console.log(userState);
    if (userState) {
      navigate('/'); // 수정 필요
      try {
        localStorage.setItem('userState', JSON.stringify(userState));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [userState, navigate]);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default SignupForm;
