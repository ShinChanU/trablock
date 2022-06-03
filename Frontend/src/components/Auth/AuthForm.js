import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from 'lib/styles/palette';
import Button from 'components/common/Button';
// import AccountCircle from './icons/AccountCircle';

const AuthFormBlock = styled.div`
  /* width: 300px; */
  width: 100%;
`;

const Div = styled.div`
  /* margin: 30px 60px; */
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
`;

const Form = styled.form`
  margin: auto;
  width: 70%;
`;

// const H4 = styled.h4`
//   margin-top: 10px;
//   font-weight: lighter;
//   text-align: center;
// `;

const SpanRed = styled.span`
  display: block;
  text-align: center;
  font-size: 0.875rem;
  color: blue;
  ${(props) =>
    props.detail &&
    css`
      color: red;
      font-size: 0.95rem;
    `}
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  /* text-align: center; */
  /* display: flex; */
  justify-content: space-between;
  margin: 5px 0px;
  /* justify-content: space-between; */
  /* width: 360px; */
`;

const InputHeader = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  padding-left: 30px;
  font-size: 1rem;
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  outline: none;
  width: 70%;
  height: 45px;
  float: right;
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    height: 40px;
    padding-left: 10px;
    font-size: 0.9rem;
  }
`;

const Select = styled.select`
  padding-left: 30px;
  /* margin-right: 30px; */
  font-size: 1rem;
  /* border: none; */
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  /* padding-bottom: 0.5rem; */
  outline: none;
  /* width: 350px; */
  width: 70%;
  height: 45px;
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    height: 40px;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  /* text-align: right; */
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  signup: '회원가입',
};
/**
 * 에러를 보여 줍니다.
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const Email = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

const EmailDiv = styled.input`
  padding-left: 30px;
  font-size: 1rem;
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  outline: none;
  width: 70%;
  height: 45px;
  /* float: right; */
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    height: 40px;
    padding-left: 10px;
    font-size: 0.9rem;
  }
`;

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
  error,
  onBlur,
  detailErr,
  sendEmail,
  isEmailSend,
}) => {
  const text = textMap[type];

  return (
    <>
      <AuthFormBlock>
        <Div>
          <H2>
            {/* {text} */}
            {type === 'signup' && <SpanRed>( * 필수항목 )</SpanRed>}
          </H2>
          <Form onSubmit={onSubmit}>
            <StyledDiv>
              <InputHeader>
                {type === 'signup' && <SpanRed>*</SpanRed>}
                아이디
              </InputHeader>
              <StyledInput
                autoComplete="username"
                name="userName"
                placeholder="아이디 (20자 이내)"
                onChange={onChange}
                value={form.userName}
                onBlur={onBlur}
                maxLength="20"
                minLength="4"
              />
              {/* <AccountCircle /> */}
            </StyledDiv>
            <StyledDiv>
              <InputHeader>
                {type === 'signup' && <SpanRed>*</SpanRed>}
                비밀번호
              </InputHeader>
              <StyledInput
                autoComplete="new-password"
                name="password"
                placeholder="비밀번호 (8자 이상, 20자 이내)"
                type="password"
                onChange={onChange}
                value={form.password}
                onBlur={onBlur}
                maxLength="20"
                minLength="8"
              />
              {/* <SpanRed>- 영문자, 숫자, 특수문자 조합 8자리 이상</SpanRed>
              )} */}
              {/* {detailErr.password && <div>asd</div>}} */}
            </StyledDiv>
            {type === 'signup' && (
              <SpanRed>영문자, 숫자, 특수문자 조합 8자리 이상</SpanRed>
            )}
            {type === 'signup' && detailErr.password && (
              <SpanRed detail>{detailErr.password}</SpanRed>
            )}
            {type === 'signup' && (
              <>
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>
                    비밀번호
                    <br />
                    확인
                  </InputHeader>
                  <StyledInput
                    autoComplete="new-password"
                    name="passwordCheck"
                    placeholder="비밀번호 (8자 이상, 20자 이내)"
                    type="password"
                    onChange={onChange}
                    value={form.passwordCheck}
                    onBlur={onBlur}
                  />
                  {type === 'signup' && detailErr.passwordCheck && (
                    <SpanRed detail>{detailErr.passwordCheck}</SpanRed>
                  )}
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>이름
                  </InputHeader>
                  <StyledInput
                    name="realName"
                    placeholder="이름"
                    type="text"
                    onChange={onChange}
                    value={form.realName}
                    onBlur={onBlur}
                  />
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>닉네임
                  </InputHeader>
                  <StyledInput
                    name="nickName"
                    placeholder="닉네임 (8자 이내)"
                    type="text"
                    onChange={onChange}
                    value={form.nickName}
                    onBlur={onBlur}
                    maxLength="8"
                  />
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>생년월일</InputHeader>
                  <StyledInput
                    name="birthday"
                    type="text"
                    placeholder="8자리 입력 (ex.19970217)"
                    onChange={onChange}
                    value={form.birthday}
                    onBlur={onBlur}
                    maxLength="10"
                    minLength="8"
                  />
                </StyledDiv>
                <StyledDiv gender>
                  <InputHeader>성별</InputHeader>
                  <Select name="gender" onChange={onChange}>
                    <option value="">선택</option>
                    <option value="MALE">남자</option>
                    <option value="FEMALE">여자</option>
                  </Select>
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>휴대전화</InputHeader>
                  <StyledInput
                    name="phoneNum"
                    placeholder="ex.01028333904"
                    type="tel"
                    onChange={onChange}
                    value={form.phoneNum}
                    onBlur={onBlur}
                    maxLength="13"
                    minLength="11"
                  />
                </StyledDiv>

                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>
                    본인 확인
                    <br /> 이메일
                  </InputHeader>
                  {/* <StyledInput
                    name="email"
                    type="email"
                    onChange={onChange}
                    value={form.email}
                  /> */}
                  <Email>
                    <EmailDiv
                      name="email"
                      type="email"
                      onChange={onChange}
                      value={form.email}
                      placeholder="인증할 이메일을 작성해주세요."
                    />
                    <button onClick={sendEmail}>
                      {isEmailSend ? '인증번호 재전송' : '인증번호 전송'}
                    </button>
                  </Email>
                  {/* <EmailDiv>
                    <input></input>@<input></input>
                    <select>
                      <option>직접 입력</option>
                      <option>naver.com</option>
                      <option>daum.net</option>
                      <option>gmail.com</option>
                      <option>hanmail.net</option>
                      <option>kakao.com</option>
                    </select>
                  </EmailDiv> */}
                </StyledDiv>
                {isEmailSend && ( // 수정필요 0529
                  <StyledDiv>
                    인증번호 입력해주쇼
                    <input />
                    <button>확인</button>
                  </StyledDiv>
                )}
              </>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonWidthMarginTop cyan fullWidth>
              {text}
            </ButtonWidthMarginTop>
          </Form>
          <Footer>
            {type === 'login' ? (
              <Links>
                <Link to={process.env.PUBLIC_URL + '/signup'}>회원가입</Link>
                <Link to={process.env.PUBLIC_URL + '/find'}>
                  아이디/비밀번호 찾기
                </Link>
              </Links>
            ) : (
              <Links>
                <Link to={process.env.PUBLIC_URL + '/login'}>로그인</Link>
                <Link to={process.env.PUBLIC_URL + '/find'}>
                  아이디/비밀번호 찾기
                </Link>
              </Links>
            )}
          </Footer>
        </Div>
      </AuthFormBlock>
    </>
  );
};

export default AuthForm;
