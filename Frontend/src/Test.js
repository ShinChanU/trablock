import axios from 'axios';
import React from 'react';

const Test = () => {
  const onClick = () => {
    axios(
      {
        url: '/api/signup',
        method: 'post',
        data: {
          userId: 'chan',
          password: '123',
          passwordCheck: '123',
          username: 'ChanWoo',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }

  return (
    <div>
      <button onClick={onClick}>test</button>
    </div>
  );
};

export default Test;