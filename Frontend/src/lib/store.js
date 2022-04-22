import axios from 'axios';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import uuid from 'react-uuid';
import { cloneDeep } from 'lodash';

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

      setDepart: (input) => {
        const pD =
          input.getFullYear() +
          '/' +
          (input.getMonth() + 1).toString().padStart(2, '0') +
          '/' +
          input.getDate().toString().padStart(2, '0');
        return pD;
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

      autoTimeSet: (arr, i, flag) => {
        if (flag === 'add') {
          let nowLoc = arr[i + 1];
          if (i !== 0) {
            let prevLoc = arr[i - 1];
            prevLoc.movingTime = '';
            prevLoc.vehicles = [];
          }
          nowLoc.startTime = '';
          nowLoc.arriveTime = '';
        } else if (flag === 'del') {
          let prevLoc = arr[i - 1];
          let nowLoc = arr[i];
          if (i !== 0) {
            prevLoc.movingTime = '';
            prevLoc.vehicles = [];
          }
          nowLoc.startTime = '';
          nowLoc.arriveTime = '';
        } else if (flag === 'time') {
          let prevLoc = arr[i - 1];
          let startT = prevLoc.startTime;
          let movT = prevLoc.movingTime;
          let nowLoc = arr[i];
          let stayT = nowLoc.stayTime;
          if (startT !== '' && movT !== '')
            nowLoc.arriveTime = get().calcTime(startT, movT);
          else nowLoc.arriveTime = '';

          if (stayT !== '' && nowLoc.arriveTime !== '')
            nowLoc.startTime = get().calcTime(stayT, nowLoc.arriveTime);
        }
      },

      // day에서 location 제거, dnd
      dayLocDel: (dayId, idx) => {
        const dayLocArr = get().userPlan.travelDays[dayId - 1].locations;
        dayLocArr.splice(idx, 1);
        for (let i = idx; i < dayLocArr.length; i++) {
          get().autoTimeSet(dayLocArr, i, 'del');
        }
        set((state) => ({ userPlan: { ...state.userPlan } }));
      },

      // selLoc에서  day로 dnd
      pushLocToDay: (toDayId, toLocIdx, frCateId, frLocIdx) => {
        const selLoc = get().userPlan.selectedLocations;
        const loc = cloneDeep(selLoc[frCateId][frLocIdx]); // 깊은 복사
        const days = get().userPlan.travelDays;
        const dayLocArr = days[toDayId - 1];
        loc['copy_id'] = uuid(); // copy_id 지정
        loc.startTime = '';
        loc.stayTime = '';
        loc.vehicles = [];
        loc.movingTime = '';
        loc.arriveTime = '';
        if (toLocIdx !== 0) {
          const prevLoc = dayLocArr.locations[toLocIdx - 1];
          prevLoc.vehicles = [];
          prevLoc.movingTime = '';
        }
        dayLocArr.locations.splice(toLocIdx, 0, loc);
        console.log(toLocIdx, dayLocArr.locations);
        for (let i = toLocIdx; i < dayLocArr.locations.length - 1; i++) {
          get().autoTimeSet(dayLocArr.locations, i, 'add');
        }
        set((state) => ({ userPlan: { ...state.userPlan } }));
      },

      // day에서 day로 dnd
      dayLocChange: (toDayId, toLocIdx, frDayId, frLocIdx) => {
        const startDayLocArr = get().userPlan.travelDays[frDayId - 1].locations;
        const endDayLocArr = get().userPlan.travelDays[toDayId - 1].locations;
        const [loc] = startDayLocArr.splice(frLocIdx, 1);
        if (toLocIdx !== 0) {
          const prevLoc = endDayLocArr[toLocIdx - 1];
          if (prevLoc['startTime'] !== '' && prevLoc['movingTime'] !== '') {
            loc.arriveTime = get().calcTime(
              prevLoc['startTime'],
              prevLoc['movingTime'],
            );
          }
        } else {
          loc.stayTime = '';
        }
        loc.startTime = '';
        loc.movingTime = '';
        loc.vehicles = [];
        endDayLocArr.splice(toLocIdx, 0, loc);
        if (toDayId !== frDayId) {
          for (let i = frLocIdx; i < startDayLocArr.length; i++) {
            get().autoTimeSet(startDayLocArr, i, 'del');
          }
        }
        let index = toLocIdx < frLocIdx ? toLocIdx : frLocIdx;
        for (let i = index; i < endDayLocArr.length; i++) {
          get().autoTimeSet(endDayLocArr, i, 'del');
        }
        set((state) => ({ userPlan: { ...state.userPlan } }));
      },

      splitTime: (time) => {
        let [hour, min] = time.split(':');
        parseInt(hour);
        parseInt(min);
        return [hour, min];
      },

      calcTime: (timeA, timeB) => {
        // time 형태는 hh:mm
        let [aHour, aMin] = timeA.split(':');
        let [bHour, bMin] = timeB.split(':');
        let rHour = Number(aHour) + Number(bHour);
        let rMin = Number(aMin) + Number(bMin);
        if (rMin >= 60) {
          rHour++;
          rMin -= 60;
        }
        if (rHour >= 24) rHour = rHour % 24;
        if (rHour / 10 < 1) rHour = `0${rHour}`;
        if (rMin / 10 < 1) rMin = `0${rMin}`;
        return `${rHour}:${rMin}`;
      },

      // 출발, 체류시간 저장
      setTimeData: (dayId, index, time, flag, vehiclesArr) => {
        const locArr = get().userPlan.travelDays[dayId - 1].locations;
        const nowLoc = locArr[index];
        console.log(time);
        if (flag === 'time') {
          if (index === 0) {
            nowLoc['startTime'] = time;
          } else {
            let { hour, min } = time;
            if (hour === '' && min === '') {
              nowLoc['stayTime'] = '';
              nowLoc['startTime'] = '';
            } else {
              if (hour === '0' || hour === '') hour = '00';
              if (min === '0' || min === '') min = '00';
              nowLoc['stayTime'] = `${hour}:${min}`;
              if (nowLoc.arriveTime !== '') {
                nowLoc.startTime = get().calcTime(
                  nowLoc.arriveTime,
                  nowLoc.stayTime,
                );
              }
            }
          }
        } else if (flag === 'move') {
          let { hour, min } = time;
          if (hour === '' && min === '') {
            nowLoc['vehicles'] = [];
            nowLoc['movingTime'] = '';
          } else {
            if (hour === '0' || hour === '') hour = '00';
            if (min === '0' || min === '') min = '00';
            nowLoc['movingTime'] = `${hour}:${min}`;
            nowLoc['vehicles'] = vehiclesArr;
          }
        }
        for (let i = index + 1; i < locArr.length; i++) {
          get().autoTimeSet(locArr, i, 'time');
        }
        set((state) => ({ userPlan: { ...state.userPlan } }));
      },

      // 화면에서 보여주는 시간 함수
      setViewTime: (time, flag) => {
        let [hour, min] = get().splitTime(time);
        let hourStr, minStr;
        if (flag === 'start') {
          hourStr = hour === '00' ? '0시' : `${parseInt(hour)}시`;
        } else {
          hourStr = hour === '00' ? '' : `${parseInt(hour)}시간`;
        }
        if (hourStr !== '' && min === '00') minStr = '';
        else minStr = min === '00' ? `0분` : `${parseInt(min)}분`;
        return `${hourStr} ${minStr}`;
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
