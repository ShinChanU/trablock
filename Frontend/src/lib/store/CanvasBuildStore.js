import create from 'zustand';
import uuid from 'react-uuid';
import { cloneDeep } from 'lodash';
import { useStore } from './planStore';

// 여행 캔버스 페이지에서 사용되는 함수
export const buildStore = create((set, get) => ({
  // dnd, day에서 location 제거될 때
  dayLocDel: (dayId, idx) => {
    const storeTravelDay = useStore.getState().userTravelDay;
    const dayLocArr = storeTravelDay.travelDay[dayId];
    dayLocArr.splice(idx, 1);
    if (idx !== 0) {
      let prevLoc = dayLocArr[idx - 1].movingData;
      prevLoc['movingTime'] = '';
      prevLoc['vehicle'] = '';
    }
    for (let i = idx; i < dayLocArr.length; i++) {
      get().autoTimeSet(dayLocArr, i, 'del');
    }
    useStore.setState({ userTravelDay: storeTravelDay });
  },

  // dnd, selLoc에서  day로 추가될 때
  pushLocToDay: (toDayId, toLocIdx, frCateId, frLocIdx) => {
    const storeTravelDay = useStore.getState().userTravelDay;
    const selLoc = useStore.getState().selCateLoc;
    const cate = useStore.getState().category;
    const fromCate = `sel${cate[frCateId].eng}`;
    const loc = cloneDeep(selLoc[fromCate][frLocIdx]); // 깊은 복사
    const days = storeTravelDay.travelDay;
    const dayIdx = Number(toDayId[toDayId.length - 1]);
    const dayLocArr = days[dayIdx];
    const movingDataObj = {
      startTime: '',
      stayTime: '',
      vehicle: '',
      movingTime: '',
      arriveTime: '',
    };

    loc['movingData'] = movingDataObj;
    loc['copyLocationId'] = uuid(); // copy_id 지정
    loc['days'] = dayIdx + 1; //days 설정

    if (toLocIdx !== 0) {
      const prevLoc = dayLocArr[toLocIdx - 1];
      prevLoc['vehicle'] = '';
      prevLoc['movingTime'] = '';
    }
    dayLocArr.splice(toLocIdx, 0, loc);
    if (toLocIdx !== 0) {
      let prevLoc = dayLocArr[toLocIdx - 1].movingData;
      prevLoc['movingTime'] = '';
      prevLoc['vehicle'] = '';
    }
    for (let i = toLocIdx; i < dayLocArr.length - 1; i++) {
      get().autoTimeSet(dayLocArr, i, 'add');
    }

    useStore.setState({ userTravelDay: storeTravelDay });
  },

  // dnd, day에서 day로 이동될 때(같은 day, 서로 다른 day 공용)
  dayLocChange: (toDayId, toLocIdx, frDayId, frLocIdx) => {
    const storeTravelDay = useStore.getState().userTravelDay;
    const startDayLocArr =
      storeTravelDay.travelDay[Number(frDayId[frDayId.length - 1])];
    const endDayLocArr =
      storeTravelDay.travelDay[Number(toDayId[toDayId.length - 1])];
    const [loc] = startDayLocArr.splice(frLocIdx, 1);
    const locMoData = loc.movingData;
    if (toLocIdx !== 0) {
      const prevLoc = endDayLocArr[toLocIdx - 1].movingData;
      if (prevLoc['startTime'] !== '' && prevLoc['movingTime'] !== '')
        locMoData['arriveTime'] = get().calcTime(
          prevLoc['startTime'],
          prevLoc['movingTime'],
        );
    } else locMoData['stayTime'] = '';
    locMoData['startTime'] = '';
    locMoData['movingTime'] = '';
    locMoData['vehicle'] = '';
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
    useStore.setState({ userTravelDay: storeTravelDay });
  },

  // hour:minute 을 [hour, minute]로 분리해주는 함수
  splitTime: (time) => {
    let [hour, min] = time.split(':');
    parseInt(hour);
    parseInt(min);
    return [hour, min];
  },

  // hour:min + hour:min => hour:min 으로 계산해주는 함수
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

  // 출발시각, 체류시간, 이동수단 및 이동시간 저장 함수
  setTimeData: (dayId, index, time, flag, vehicle) => {
    const storeTravelDay = useStore.getState().userTravelDay;
    const locArr = storeTravelDay.travelDay[dayId];
    const nowLoc = locArr[index].movingData;
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
          if (nowLoc['arriveTime'] !== '') {
            nowLoc['startTime'] = get().calcTime(
              nowLoc['arriveTime'],
              nowLoc['stayTime'],
            );
          }
        }
      }
    } else if (flag === 'move') {
      let { hour, min } = time;
      if (hour === '' && min === '') {
        nowLoc['vehicle'] = '';
        nowLoc['movingTime'] = '';
      } else {
        if (hour === '0' || hour === '') hour = '00';
        if (min === '0' || min === '') min = '00';
        nowLoc['movingTime'] = `${hour}:${min}`;
        nowLoc['vehicle'] = vehicle;
      }
    }
    for (let i = index + 1; i < locArr.length; i++) {
      get().autoTimeSet(locArr, i, 'time');
    }
    useStore.setState({ userTravelDay: storeTravelDay });
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

  // location 위치 변경시 각 time 데이터 자동 변경 함수
  autoTimeSet: (arr, i, flag) => {
    if (flag === 'add') {
      let nowLoc = arr[i + 1].movingData;
      nowLoc['startTime'] = '';
      nowLoc['arriveTime'] = '';
    } else if (flag === 'del') {
      let nowLoc = arr[i].movingData;
      nowLoc['startTime'] = '';
      nowLoc['arriveTime'] = '';
    } else if (flag === 'time') {
      let prevLoc = arr[i - 1].movingData;
      let startT = prevLoc['startTime'];
      let movT = prevLoc['movingTime'];
      let nowLoc = arr[i].movingData;
      let stayT = nowLoc['stayTime'];
      if (startT !== '' && movT !== '')
        nowLoc['arriveTime'] = get().calcTime(startT, movT);
      else nowLoc['arriveTime'] = '';
      if (stayT !== '' && nowLoc['arriveTime'] !== '')
        nowLoc['startTime'] = get().calcTime(stayT, nowLoc['arriveTime']);
    }
  },
}));
