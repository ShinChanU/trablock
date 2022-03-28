import axios from 'axios';
import create from 'zustand';

export const useStore = create((set, get) => ({
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

  // selCateLoc: {
  //   // 담은 location => 분류
  //   Attractions: [],
  //   Culture: [],
  //   Festival: [],
  //   Leports: [],
  //   Lodge: [],
  //   Restaurant: [],
  // },

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
    console.log(item);
    let result = [];
    for (let x of item) {
      result.push(x.id);
    }
    console.log(result);
    return result;
  },

  // 압축 풀기 로직, [id, id...] => [{}, {}...]
  unzipSelLoc: (item) => {
    // item는 id값만 있는 배열, sysCateLoc를 사용해서 객체가 담긴 배열로 생성 후 selLoc 에 덮어쓰기
    // set({})
  },

  sysLoc: {},

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

  // getSysLoc: async () => {
  //   const response = await axios.get('http://localhost:4000/locations');
  //   set({ sysLoc: response.data });
  // },

  // 0328 생성, 새로운 plan 생성 (프론트에서만 관리)
  newPlan: async () => {
    set({ userPlan: {} });
    // newPlan, getPlan 과 같음
    const response = await axios.get('http://localhost:4000/locations');
    set({ sysLoc: response.data });
    console.log(get().sysLoc);
    const sort = get().sortLoc;
    const test = await sort(get().sysLoc);
    console.log(test);
    // systemLocation 받아와서 카테고리 정렬까지 완료
  },

  // 0328 생성, 이미 존재하는 plan 받아오기
  getPlan: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans/${id}`);
    set({ userPlan: response.data });
    // newPlan, getPlan 과 같음
    const locations = await axios.get('http://localhost:4000/locations');
    set({ sysLoc: locations.data });
  },

  // id값으로 판별
  postPlan: async (id) => {
    // 매개변수 id는 userPlan id
    console.log(id);
    if (id === undefined) {
      const response = await axios.post(`http://localhost:4000/travelPlans`, {
        name: 'Test',
      });
      set({ userPlan: response.data }); // 백에서 보내주는 데이터가 userPlan
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

  sortLoc: (item) => {
    const obj = Object.values(item);
    console.log(obj);
    let att = [];
    let cul = [];
    let fes = [];
    let lepo = [];
    let lod = [];
    let rest = [];
    for (let x of obj) {
      switch (x.type) {
        case '1':
          att.push(x);
          break;
        case '2':
          cul.push(x);
          break;
        case '3':
          fes.push(x);
          break;
        case '4':
          lepo.push(x);
          break;
        case '5':
          lod.push(x);
          break;
        case '6':
          rest.push(x);
          break;
        default:
      }
    }
    return {
      Attractions: att,
      Culture: cul,
      Festival: fes,
      Leports: lepo,
      Lodge: lod,
      Restaurant: rest,
    };
  },
}));

// systemLocation 받아오고, 카테고리 따라서 분류
export const sysLocStore = create((set) => ({
  // sysLoc: {},

  // sysCateLoc: {
  //   // 전체 location => 분류
  //   Attractions: [],
  //   Culture: [],
  //   Festival: [],
  //   Leports: [],
  //   Lodge: [],
  //   Restaurant: [],
  // },

  // selCateLoc: {
  //   // 담은 location => 분류
  //   Attractions: [],
  //   Culture: [],
  //   Festival: [],
  //   Leports: [],
  //   Lodge: [],
  //   Restaurant: [],
  // },

  // getSysLoc: async () => {
  //   const response = await axios.get('http://localhost:4000/locations');
  //   set({ sysLoc: response.data });
  // },

  // sortLoc: (item) => {
  //   // set({sysCateLoc: })
  //   const obj = Object.values(response.data);
  //   console.log(obj);
  //   let att = [];
  //   let cul = [];
  //   let fes = [];
  //   let lepo = [];
  //   let lod = [];
  //   let rest = [];
  //   for (let x of obj) {
  //     switch (x.type) {
  //       case '1':
  //         att.push(x);
  //         break;
  //       case '2':
  //         cul.push(x);
  //         break;
  //       case '3':
  //         fes.push(x);
  //         break;
  //       case '4':
  //         lepo.push(x);
  //         break;
  //       case '5':
  //         lod.push(x);
  //         break;
  //       case '6':
  //         rest.push(x);
  //         break;
  //       default:
  //     }
  //   }
  //   set({
  //     sysCateLoc: {
  //       Attractions: att,
  //       Culture: cul,
  //       Festival: fes,
  //       Leports: lepo,
  //       Lodge: lod,
  //       Restaurant: rest,
  //     },
  //   });
  // },

  sortSelLoc: (item) => {
    // set({selCateLoc: })
  },
}));

// 여행 보관함에서 사용
export const planStore = create((set) => ({
  travelPlans: [],

  getPlans: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans`);
    console.log(response.data);
    set({ travelPlans: response.data }); // 백에서 보내주는 데이터가 userPlan
  },
}));
