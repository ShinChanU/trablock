import axios from 'axios';
import create from 'zustand';

export const useStore = create((set) => ({
  // userPlanTest: {
  //   id: 1, // 모르겠음
  //   concept: 'Love',
  //   depart: '20211215',
  //   destination: '제주도',
  //   name: '새 여행 캔버스(1)',
  //   periods: 3,
  //   status: '',
  //   travelDays: [],
  //   selectedLocations: [1, 2, 3, 4, 5],
  // },

  userPlan: {
    // db 전용
    id: '',
    concept: '',
    depart: '',
    destination: '',
    name: '',
    periods: '',
    status: '',
    travelDays: '',
    dbSelectedLocations: [], // 변수 확인, id값만 담기는 배열
  },

  selLoc: [], // 객체가 담기는 배열

  sysCateLoc: {
    // 전체 location => 분류
    Attractions: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },

  selCateLoc: {
    // 담은 location => 분류
    Attractions: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },

  getSysLoc: async () => {
    const response = await axios.get('http://localhost:4000/locations');
    return response.data;
  },

  // 카테고리 분류 로직 만들기 0323
  sortSysLoc: (item) => {
    // set({sysCateLoc: })
  },

  sortSelLoc: (item) => {
    // set({selCateLoc: })
  },

  // 압축 로직, [{}, {}...] => [id, id...]
  zipSelLoc: (item) => {
    // item는 객체 배열, id값으로만 된 배열 생성후 userPlan.dbSelLoc에 덮어쓰기
    // set({})
  },

  // 압축 풀기 로직, [id, id...] => [{}, {}...]
  unzipSelLoc: (item) => {
    // item는 id값만 있는 배열, sysCateLoc를 사용해서 객체가 담긴 배열로 생성 후 selLoc 에 덮어쓰기
    // set({})
  },

  getPlan: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans/${id}`);
    set({ userPlan: response.data });
  },

  postPlan: async (id) => {
    // 매개변수 id는 userPlan id
    if (id === '') {
      const response = await axios.post(`http://localhost:4000/travelPlans/`, {
        // userPlan
      });
      set({ userPlan: response.data }); // 백에서 보내주는 데이터가 userPlan
      console.log(response);
    } else {
      const response = await axios.post(
        `http://localhost:4000/travelPlans/${id}`,
      );
      console.log(response); // 성공하면 success
    }
  },

  category: {
    1: { eng: 'Attraction', kor: '관광지' },
    2: { eng: 'Culture', kor: '문화시설' },
    3: { eng: 'Festival', kor: '축제' },
    4: { eng: 'Leports', kor: '레포츠' },
    5: { eng: 'Lodge', kor: '숙박 시설' },
    6: { eng: 'Restaurant', kor: '음식점' },
  },

  type: {
    1: '관광지',
    2: '문화 시설',
    3: '축제',
    4: '레포츠',
    5: '숙박시설',
    6: '음식점',
  },
}));

export const useStore2 = create((set) => ({
  getConcept: (concept) => {
    // set({userPlan: })
  },
}));
