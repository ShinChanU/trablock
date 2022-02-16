import React from 'react';
import AuthTemplate from 'components/Auth/AuthTemplate';
import SignupForm from 'containers/Auth/SignupForm';

const SignupPage = () => {
  return (
    <AuthTemplate>
      <SignupForm />
    </AuthTemplate>
  );
};

export default SignupPage;
