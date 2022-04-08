import axios from 'axios';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create(
  devtools(
    (set, get) => ({
      userPlan: {
        // db 전용
        concept: '',
        depart: '',
        destination: '',
        name: '',
        periods: '',
        status: 'main',
        thumbnail: '',
        travelDays: [],
        selectedLocations: {}, // cate: [id, id ... ]
        userLocations: [], // [{}, {} ...]
      },

      // selLoc: [], // 객체가 담기는 배열

      // dayLoc: [],

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

      // sysCateLoc: {
      //   // 전체 location => 분류
      //   attractions: [],
      //   culture: [],
      //   festival: [],
      //   Leports: [],
      //   lodge: [],
      //   restaurant: [],
      // },

      // selCateLoc: {
      //   // 담은 location => 분류
      //   attractions: [],
      //   culture: [],
      //   festival: [],
      //   leports: [],
      //   lodge: [],
      //   restaurant: [],
      // },

      // day에서 location 제거, dnd
      dayLocDel: (day, loc, idx) => {
        const days = get().userPlan.travelDays;
        const selLoc = get().selLoc;
        const dayInfo = days[day.id - 1];
        const type = dayInfo.locationTypes[idx];
        const location = dayInfo.locationIds.splice(idx, 1);
        selLoc[type].push(location[0]);
        dayInfo.locationTypes.splice(idx, 1);
        set((state) => ({ userPlan: { ...state.userPlan } }));
      },

      // selLoc에서  day로 dnd
      pushLocToDay: (toDayId, toLocIdx, frCateId, frLocIdx) => {
        console.log(toDayId, toLocIdx, frCateId, frLocIdx);
        // const selLoc = get().selLoc;
        // const days = get().userPlan.travelDays;
        // const loc = selLoc[frCateId].splice(frLocIdx, 1);
        // const locArr = days[toDayId - 1].locationIds;
        // const cateArr = days[toDayId - 1].locationTypes;
        // locArr.splice(toLocIdx, 0, loc[0]);
        // cateArr.splice(toLocIdx, 0, frCateId);
        // set((state) => ({ userPlan: { ...state.userPlan } }));
      },

      // day에서 day로 dnd
      dayLocChange: (toDayId, toLocIdx, frDayId, frLocIdx) => {
        const toDay = parseInt(toDayId);
        const fromDay = parseInt(frDayId);
        const days = get().userPlan.travelDays;
        const loc = days[fromDay - 1].locationIds.splice(frLocIdx, 1);
        const cate = days[fromDay - 1].locationTypes.splice(frLocIdx, 1);
        days[toDay - 1].locationIds.splice(toLocIdx, 0, loc[0]);
        days[toDay - 1].locationTypes.splice(toLocIdx, 0, cate[0]);
        set((state) => ({ userPlan: { ...state.userPlan } }));
      },

      // getSysLoc: async () => {
      //   const response = await axios.get('http://localhost:4000/locations');
      //   set({ sysLoc: response.data });
      // },

      // 0328 생성, 새로운 plan 생성 (프론트에서만 관리)
      newPlan: async () => {
        // userPlan, sysLoc, sysCateLoc 설정
        set({
          userPlan: {
            concept: '',
            depart: '',
            destination: '',
            name: '',
            periods: '',
            status: 'main',
            thumbnail: '',
            travelDays: [],
            selectedLocations: {},
          },
        });
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
        const locations = await axios.get('http://localhost:4000/locations');
        set({ userPlan: response.data });
        set({ sysLoc: locations.data });
        const sort = get().sortLoc;
        // const sortData = await sort(get().sysLoc);
        const sortSelLoc = await sort(get().userPlan.selectedLocations);
        // userPlan.travelDays 배열 속에 있는 모든 객체.locationIds 배열 속 데이터를 가지고 있는 객체
        const sysLoc = locations.data;
        const travelDays = response.data.travelDays;
        // day의 location 정보 불러오기(sysLoc에서)
        // for (let day of travelDays) {
        //   const arr = day.locations.map((e, i) => {
        //     const type = day.locationTypes[i];
        //     return sysLoc[type][e];
        //   });
        //   day.locationIds = arr;
        // }
      },
      // travelDay.locationIds를 dayLoc 으로 초기화

      // selLoc 데이터 초기화
      selLocSort: async () => {
        const selLocArr = get().userPlan.selectedLocations;
        const sysLoc = get().sysLoc;
        let obj = {};
        for (let key in selLocArr) {
          let arr = [];
          selLocArr[key].map((e) => {
            if (typeof e === 'number') arr.push(sysLoc[key][e]);
            else arr.push(e);
          });
          obj[key] = arr;
        }
        console.log(obj);
        set((state) => ({
          userPlan: {
            ...state.userPlan,
            selectedLocations: obj,
            loading: true,
          },
        }));
      },

      // id값으로 판별
      postPlan: async (id) => {
        // 매개변수 id는 userPlan id
        console.log(id);
        if (id === undefined) {
          const response = await axios.post(
            `http://localhost:4000/travelPlans`,
            {
              name: 'Test',
            },
          );
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
        const obj = Object.keys(item);
        let att = [];
        let cul = [];
        let fes = [];
        let lepo = [];
        let lod = [];
        let rest = [];
        for (let x of obj) {
          switch (x) {
            case 'attractions':
              att.push(x);
              break;
            case 'cultures':
              cul.push(x);
              break;
            case 'festivals':
              fes.push(x);
              break;
            case 'leports':
              lepo.push(x);
              break;
            case 'lodges':
              lod.push(x);
              break;
            case 'restaurants':
              rest.push(x);
              break;
            default:
          }
        }
        return {
          attractions: att,
          culture: cul,
          festival: fes,
          leports: lepo,
          lodge: lod,
          restaurant: rest,
        };
      },

      // 출발, 체류시간 저장 0401
      setTimeData: (dayId, time, index) => {
        const { startH, startM, stayH, stayM } = time;
        const startArr = get().userPlan.travelDays[dayId - 1].startTime;
        const stayArr = get().userPlan.travelDays[dayId - 1].stayTime;
        const start = `${startH} : ${startM}`;
        const stay = `${stayH} : ${stayM}`;
        startArr[index + 1] = start;
        stayArr[index + 1] = stay;
        set((state) => ({ userPlan: { ...state.userPlan } }));
      },
    }),
    // {
    //   name: 'plan storage',
    //   getStorage: () => sessionStorage,
    // },
  ),
);

// 여행 보관함에서 사용
export const planStore = create((set, get) => ({
  travelPlans: [],

  getPlans: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans`);
    set({ travelPlans: response.data }); // 백에서 보내주는 데이터가 userPlan
    set((state) => ({ ...state.userPlan, test: 'test' }));
    // console.log(get().userPlan);
  },
}));
