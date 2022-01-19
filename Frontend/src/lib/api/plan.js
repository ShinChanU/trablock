// import client from './client';

// export const getPlan = () => {
//   client.get('http://localhost:4000/travelPlans');
// }

// export const getPlan = () => {
//   client.get('https://jsonplaceholder.typicode.com/users');
// };

import axios from 'axios';

export const getPlan = async id => {
  try {
    return await axios.get(`http://localhost:4000/travelPlans/${id}`);
  } catch (error) {
    console.error(error);
  }
};
