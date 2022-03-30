import axios from 'axios';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools((set, get) => ({
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

    dayLoc: [],

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

    // day에서 location 제거, dnd
    dayLocChange: (day, loc, idx) => {
      const days = get().userPlan.travelDays;
      const selLoc = get().selLoc;
      const dayInfo = days[day.id - 1];
      const type = dayInfo.locationType[idx];
      const location = dayInfo.locationIds.splice(idx, 1);
      console.log(selLoc, type, location);
      selLoc[type].push(location[0]);
      dayInfo.locationType.splice(idx, 1);
      set((state) => ({ userPlan: { ...state.userPlan } }));
    },

    pushLocToDay: (dayId, dayIdx, cate, cateIdx) => {
      const selLoc = get().selLoc;
      const days = get().userPlan.travelDays;
      const loc = selLoc[cate].splice(cateIdx, 1);
      const locArr = days[dayId - 1].locationIds;
      const cateArr = days[dayId - 1].locationType;
      locArr.splice(dayIdx, 0, loc[0]);
      cateArr.splice(dayIdx, 0, cate);
      // set((state) => ({ userPlan: { ...state.userPlan } }));
      console.log(days);
    },

    // getSysLoc: async () => {
    //   const response = await axios.get('http://localhost:4000/locations');
    //   set({ sysLoc: response.data });
    // },

    // 0328 생성, 새로운 plan 생성 (프론트에서만 관리)
    newPlan: async () => {
      // userPlan, sysLoc, sysCateLoc 설정
      set({ userPlan: {} });
      const response = await axios.get('http://localhost:4000/locations');
      set({ sysLoc: response.data });
      const sort = get().sortLoc;
      const sortData = await sort(get().sysLoc);
      set({ sysCateLoc: sortData });
    },

    // 0328 생성, 이미 존재하는 plan 받아오기
    // userPlan, syaLoc, travelDay의 location 해체
    getPlan: async (id) => {
      // userPlan, sysLoc, sysCateLoc 설정
      const response = await axios.get(
        `http://localhost:4000/travelPlans/${id}`,
      );
      set({ userPlan: response.data });
      const locations = await axios.get('http://localhost:4000/locations2');
      set({ sysLoc: locations.data });
      // const sort = get().sortLoc;
      // const sortData = await sort(get().sysLoc);
      set({ sysCateLoc: get().sysLoc });
      // const sortSelLoc = await sort(get().userPlan.selectedLocations);
      // userPlan.travelDays 배열 속에 있는 모든 객체.locationIds 배열 속 데이터를 가지고 있는 객체
      const sysLoc = locations.data;
      const travelDays = response.data.travelDays;
      for (let day of travelDays) {
        const arr = day.locationIds.map((e, i) => {
          const type = day.locationType[i];
          return sysLoc[type][e];
        });
        day.locationIds = arr;
      }
    },
    // travelDay.locationIds를 dayLoc 으로 초기화

    // selLoc 데이터 초기화
    selLocSort: async () => {
      const selLocArr = get().userPlan.selectedLocations;
      const sysLoc = get().sysLoc;
      let obj = {};
      let arr = [];
      for (let key in selLocArr) {
        arr = [];
        selLocArr[key].map((e) => {
          arr.push(sysLoc[key][e]);
        });
        obj[key] = arr;
      }
      set({ selLoc: obj });
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
      attractions: '관광지',
      cultures: '문화시설',
      festivals: '축제',
      leports: '레포츠',
      lodges: '숙박 시설',
      restaurants: '음식점',
    },

    // test: () => {
    //   const category = get().category;
    //   console.log(category);
    // },

    sortLoc: (item) => {
      const obj = Object.values(item);
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
  })),
);

// 여행 보관함에서 사용
export const planStore = create((set) => ({
  travelPlans: [],

  getPlans: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans`);
    set({ travelPlans: response.data }); // 백에서 보내주는 데이터가 userPlan
  },
}));
