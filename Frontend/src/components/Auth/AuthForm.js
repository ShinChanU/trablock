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
  login: '?????????',
  signup: '????????????',
};
/**
 * ????????? ?????? ?????????.
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
            {type === 'signup' && <SpanRed>( * ???????????? )</SpanRed>}
          </H2>
          <Form onSubmit={onSubmit}>
            <StyledDiv>
              <InputHeader>
                {type === 'signup' && <SpanRed>*</SpanRed>}
                ?????????
              </InputHeader>
              <StyledInput
                autoComplete="username"
                name="userName"
                placeholder="????????? (20??? ??????)"
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
                ????????????
              </InputHeader>
              <StyledInput
                autoComplete="new-password"
                name="password"
                placeholder="???????????? (8??? ??????, 20??? ??????)"
                type="password"
                onChange={onChange}
                value={form.password}
                onBlur={onBlur}
                maxLength="20"
                minLength="8"
              />
              {/* <SpanRed>- ?????????, ??????, ???????????? ?????? 8?????? ??????</SpanRed>
              )} */}
              {/* {detailErr.password && <div>asd</div>}} */}
            </StyledDiv>
            {type === 'signup' && (
              <SpanRed>?????????, ??????, ???????????? ?????? 8?????? ??????</SpanRed>
            )}
            {type === 'signup' && detailErr.password && (
              <SpanRed detail>{detailErr.password}</SpanRed>
            )}
            {type === 'signup' && (
              <>
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>
                    ????????????
                    <br />
                    ??????
                  </InputHeader>
                  <StyledInput
                    autoComplete="new-password"
                    name="passwordCheck"
                    placeholder="???????????? (8??? ??????, 20??? ??????)"
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
                    <SpanRed>*</SpanRed>??????
                  </InputHeader>
                  <StyledInput
                    name="realName"
                    placeholder="??????"
                    type="text"
                    onChange={onChange}
                    value={form.realName}
                    onBlur={onBlur}
                  />
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>?????????
                  </InputHeader>
                  <StyledInput
                    name="nickName"
                    placeholder="????????? (8??? ??????)"
                    type="text"
                    onChange={onChange}
                    value={form.nickName}
                    onBlur={onBlur}
                    maxLength="8"
                  />
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>????????????</InputHeader>
                  <StyledInput
                    name="birthday"
                    type="text"
                    placeholder="8?????? ?????? (ex.19970217)"
                    onChange={onChange}
                    value={form.birthday}
                    onBlur={onBlur}
                    maxLength="10"
                    minLength="8"
                  />
                </StyledDiv>
                <StyledDiv gender>
                  <InputHeader>??????</InputHeader>
                  <Select name="gender" onChange={onChange}>
                    <option value="">??????</option>
                    <option value="MALE">??????</option>
                    <option value="FEMALE">??????</option>
                  </Select>
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>????????????</InputHeader>
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
                    ?????? ??????
                    <br /> ?????????
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
                      placeholder="????????? ???????????? ??????????????????."
                    />
                    <button onClick={sendEmail}>
                      {isEmailSend ? '???????????? ?????????' : '???????????? ??????'}
                    </button>
                  </Email>
                  {/* <EmailDiv>
                    <input></input>@<input></input>
                    <select>
                      <option>?????? ??????</option>
                      <option>naver.com</option>
                      <option>daum.net</option>
                      <option>gmail.com</option>
                      <option>hanmail.net</option>
                      <option>kakao.com</option>
                    </select>
                  </EmailDiv> */}
                </StyledDiv>
                {isEmailSend && ( // ???????????? 0529
                  <StyledDiv>
                    ???????????? ???????????????
                    <input />
                    <button>??????</button>
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
                <Link to={process.env.PUBLIC_URL + '/signup'}>????????????</Link>
                <Link to={process.env.PUBLIC_URL + '/find'}>
                  ?????????/???????????? ??????
                </Link>
              </Links>
            ) : (
              <Links>
                <Link to={process.env.PUBLIC_URL + '/login'}>?????????</Link>
                <Link to={process.env.PUBLIC_URL + '/find'}>
                  ?????????/???????????? ??????
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
