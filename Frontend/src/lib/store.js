import create from 'zustand';

export const useStore = create((set) => ({
  userPlanTest: {
    id: 1, // 모르겠음
    concept: 'Love',
    depart: '20211215',
    destination: '제주도',
    name: '새 여행 캔버스(1)',
    periods: 3,
    status: '',
    travelDays: [],
    selectedLocations: [],
  },
  count: 0,

  category: [
    { eng: 'Attraction', kor: '관광지' },
    { eng: 'Culture', kor: '문화시설' },
    { eng: 'Festival', kor: '축제' },
    { eng: 'Leports', kor: '레포츠' },
    { eng: 'Lodge', kor: '숙박 시설' },
    { eng: 'Restaurant', kor: '음식점' },
  ],

  click() {
    set((state) => ({
      count: state.count + 1,
    }));
  },

  addDay() {
    // periods에 따라 day 추가
    // ...
  },
}));
