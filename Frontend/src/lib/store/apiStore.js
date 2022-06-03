import axios from 'axios';
import create from 'zustand';
import { useStore } from './planStore';
import { buildStore } from './CanvasBuildStore';

const LOCAL_BASE_URL = 'http://localhost:4000';
const BACK_BASE_URL = 'plan-day';

// 0524 get, post api
export const apiStore = create((set, get) => ({
  // increaseCount: (x) => {
  //   let cnt = buildStore.getState().count;
  //   console.log(cnt);
  //   buildStore.setState((state) => state.count++);
  //   console.log(cnt);
  // },

  postDayForm: async (id) => {
    const response = await axios.get(`${LOCAL_BASE_URL}/users/3`);
    console.log(response.data);
  },

  getDayForm: async (id) => {
    const storeDayForm = useStore.getState().userTravelDay;
    const response = await axios.post(
      `${LOCAL_BASE_URL}/${BACK_BASE_URL}/${id}`,
      {
        dayForm: storeDayForm,
      },
    );
    console.log(response);
  },
}));
