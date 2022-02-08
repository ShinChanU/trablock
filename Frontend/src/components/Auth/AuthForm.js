import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from 'lib/styles/palette';
import Button from 'components/common/Button';
import AccountCircle from './icons/AccountCircle';

const AuthFormBlock = styled.div`
  padding-top: 30px;
`;

const Div = styled.div`
  margin: 30px 60px;
`;

const H2 = styled.h2`
  margin-top: 0;
  margin-bottom: 30px;
`;

// const Form = styled.form`
//   margin: 30px;
// `;

const H4 = styled.h4`
  margin-top: 10px;
  font-weight: lighter; 
  text-align: center;
`;

const SpanRed = styled.span`
  color: rgb(255, 77, 77);
`;

const StyledDiv = styled.div`
  position: relative;
  /* text-align: center; */
  /* display: flex; */
  /* justify-content: space-between; */
  padding-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
`;

const StyledInput = styled.input`
  padding-left: 30px;
  /* margin-right: 30px; */
  font-size:1rem;
  /* border: none; */
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  /* padding-bottom: 0.5rem; */
  outline: none;
  width: 100%;
  height: 45px;
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top:1rem;
  }
;`

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }  
  }
`;

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: 'Login',
  signup: 'Sign Up'
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

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <>
      <AuthFormBlock>
        <Div>
        <H2>{text}</H2>
        {/* {
          type === 'signup' && (
            <H4>
              아래 ' <SpanRed>*</SpanRed> '항목은 필수입력 사항입니다.
            </H4>
          )
        } */}
          <form onSubmit={onSubmit}>
            <StyledDiv>
              {/* <StyledLabel>아이디
                {type === 'signup' && (
                  <SpanRed>*</SpanRed>
                )}
              </StyledLabel> */}
              <StyledInput
                autoComplete="username"
                name="username"
                placeholder="Username*"
                onChange={onChange}
                value={form.username}
              />
              {/* <AccountCircle /> */}
            </StyledDiv>
            <StyledDiv>
              {/* <StyledLabel>비밀번호
                {type === 'signup' && (
                  <SpanRed>*</SpanRed>
                )}
              </StyledLabel> */}
              <StyledInput
                autoComplete="new-password"
                name="password"
                placeholder="Password*"
                type="password"
                onChange={onChange}
                value={form.password}
              />
            </StyledDiv>
            {type === 'signup' && (
              <>
                <StyledDiv>
                  {/* <StyledLabel>비밀번호 확인<SpanRed>*</SpanRed></StyledLabel> */}
                  <StyledInput
                    autoComplete="new-password"
                    name="passwordCheck"
                    placeholder="Confirm Password*"
                    type="password"
                    onChange={onChange}
                    value={form.passwordCheck}
                  />
                </StyledDiv>
                <StyledDiv>
                  {/* <StyledLabel>이름<SpanRed>*</SpanRed></StyledLabel> */}
                  <StyledInput
                    name="realName"
                    placeholder="Name*"
                    type="text"
                    onChange={onChange}
                    value={form.realName}
                  />
                </StyledDiv>
                <StyledDiv>
                  {/* <StyledLabel>닉네임<SpanRed>*</SpanRed></StyledLabel> */}
                  <StyledInput
                    name="nickname"
                    placeholder="Nickname*"
                    type="text"
                    onChange={onChange}
                    value={form.nickname}
                  />
                </StyledDiv>
                <StyledDiv>
                  <StyledLabel>Birthday</StyledLabel>
                  <StyledInput
                    name="birthday"
                    type="date"
                    onChange={onChange}
                    value={form.birthday}
                  />
                </StyledDiv>
                <StyledDiv>
                  <StyledLabel>Tel</StyledLabel>
                  <StyledInput
                    name="phoneNum"
                    placeholder="( - ) 없이 적어주세요."
                    type="tel"
                    onChange={onChange}
                    value={form.phoneNum}
                  />
                </StyledDiv>
                <StyledDiv>
                  <StyledLabel>성별</StyledLabel>
                  <div
                    style={{
                      width: "270px",
                      // marginRight: "30px",
                    }}
                  >
                    <StyledInput
                      style={{
                        width: "20px",
                        margin: "0px"
                      }}
                      name="gender"
                      type="radio"
                      value="MALE"
                      onChange={onChange}
                    />남자
                    <StyledInput
                      style={{
                        width: "20px",
                        margin: "0px",
                        marginLeft: "70px"
                      }}
                      name="gender"
                      type="radio"
                      value="FEMALE"
                      onChange={onChange}
                    />여자
                  </div>
                </StyledDiv>
                <StyledDiv>
                  <StyledLabel>이메일<SpanRed>*</SpanRed></StyledLabel>
                  <StyledInput
                    name="email"
                    placeholder="Email*"
                    type="email"
                    onChange={onChange}
                    value={form.email}
                  />
                </StyledDiv>
              </>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonWidthMarginTop cyan fullWidth>
              {text}
            </ButtonWidthMarginTop>
          </form>
          <Footer>
            {type === 'login' ? (
              <Link to="/signup">회원가입</Link>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </Footer>
        </Div>
      </AuthFormBlock >
    </>
  );
};

export default AuthForm;