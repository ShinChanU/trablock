import axios from 'axios';
import create from 'zustand';

export const useStore = create((set, get) => ({
  userPlan: {
    // planForm
    // db 전용
    id: '',
    depart: '',
    destination: '',
    name: '',
    periods: 1,
    planStatus: 'MAIN',
    thumbnail: [], // FormData, 이름
    //concept: [],
    //travelDay: [],
    //dbSelectedLocations: [], // 변수 확인, id값만 담기는 배열
  },
  userPlanConcept: {
    concept: [],
  },
  Concepts: [
    { id: 1, name: '우정', eword: 'Friendship' },
    { id: 2, name: '연인', eword: 'Love' },
    { id: 3, name: '가족', eword: 'Family' },
    { id: 4, name: '혼자', eword: 'Alone' },
  ],
  userTravelDay: {
    travelDay: [],
  },
  setName: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, name: input } }));
  },
  setPeriods: (input) => {
    const userTravelDay = get().userTravelDay;
    let arr = [];
    arr = Array.from({ length: input }, (_, i) => []);

    // travelDay 이미 있는 경우
    if (userTravelDay.travelDay === []) {
      arr = userTravelDay.travelDay;
    }

    set((state) => ({
      userPlan: { ...state.userPlan, periods: input },
      userTravelDay: { ...state.userTravelDay, travelDay: arr },
    }));
  },
  setConcept: (input) => {
    set((state) => ({
      userPlanConcept: { ...state.userPlanConcept, concept: input },
    }));
  },
  setDepart: (input) => {
    const pD =
      input.getFullYear() +
      '/' +
      (input.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      input.getDate().toString().padStart(2, '0');
    set((state) => ({ userPlan: { ...state.userPlan, depart: pD } }));
    // return pD; // ?
  },
  setDestination: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, destination: input } }));
  },
  setThumbnail: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, thumbnail: input } }));
  },

  // 압축 로직, [{}, {}...] => [id, id...]
  zipSelLoc: (item) => {
    // item는 객체 배열, id값으로만 된 배열 생성후 userPlan.dbSelLoc에 덮어쓰기
    // set({})
    let result = [];
    for (let x of item) {
      result.push(x['id']);
    }
    return result;
  },

  // GET userPlan
  getPlan: async (id) => {
    //const userPlan = get().userPlan;
    const response = await axios.get(`http://localhost:4000/travelPlans/${id}`);
    //const response = await axios.get(`http://localhost:4000/travelPlans/1`);
    set({ userPlan: response.data.planForm });
    set({ userPlanConcept: response.data.conceptForm });
    set({ userTravelDay: response.data.dayForm });
  },

  // POST userPlan
  postPlan: async (id) => {
    // 매개변수 id는 userPlan id
    const userPlan = get().userPlan;
    const userPlanConcept = get().userPlanConcept;
    const userTravelDay = get().userTravelDay;
    if (id === '') {
      const response = await axios.post(`http://localhost:4000/travelPlans/`, {
        /*...userPlan,*/
        planForm: userPlan,
        conceptForm: userPlanConcept,
        dayForm: userTravelDay,
      });
      //set({ userPlan: response.data }); // 백에서 보내주는 데이터가 userPlan
    } else {
      //const response = await axios.post(`/members/1/plan`, {
      //test용 patch..
      const response = await axios.patch(
        `http://localhost:4000/travelPlans/${id}`,
        {
          planForm: userPlan,
          conceptForm: userPlanConcept,
          dayForm: userTravelDay,
        },
      );
      console.log(response); // 성공하면 success
    }
  },

  selCateLoc: {
    // 객체가 담기는 배열을 담는 객체
    // 담은 location => 분류
    selAttractions: [],
    selCulture: [],
    selFestival: [],
    selLeports: [],
    selLodge: [],
    selRestaurant: [],
  },

  category: {
    1: { eng: 'Attractions', kor: '관광지' },
    2: { eng: 'Culture', kor: '문화시설' },
    3: { eng: 'Festival', kor: '축제' },
    4: { eng: 'Leports', kor: '레포츠' },
    5: { eng: 'Lodge', kor: '숙박 시설' },
    6: { eng: 'Restaurant', kor: '음식점' },
  },

  //onAdd: (loc, type) => set(state => ({ selLoc: [...state.selLoc, loc] })),
  onAdd: (loc, type) => {
    switch (type) {
      case '1':
        //  set(state => ({ selAttractions: [...state.selAttractions, loc] }));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selAttractions: [...state.selCateLoc.selAttractions, loc],
          },
        }));
        break;
      case '2':
        // set(state => ({ selCulture: [...state.selCulture, loc] }));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selCulture: [...state.selCateLoc.selCulture, loc],
          },
        }));
        break;
      case '3':
        // set(state => ({ selFestival: [...state.selFestival, loc] }));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selFestival: [...state.selCateLoc.selFestival, loc],
          },
        }));
        break;
      case '4':
        // set(state => ({ selLeports: [...state.selLeports, loc] }));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selLeports: [...state.selCateLoc.selLeports, loc],
          },
        }));
        break;
      case '5':
        // set(state => ({ selLodge: [...state.selLodge, loc] }));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selLodge: [...state.selCateLoc.selLodge, loc],
          },
        }));
        break;
      case '6':
        // set(state => ({ selRestaurant: [...state.selRestaurant, loc] }));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selRestaurant: [...state.selCateLoc.selRestaurant, loc],
          },
        }));
        break;
      default:
    }
  },

  //remove: (locId) => set(state => ({ selLoc: state.selLoc.filter(loc => loc.id !== locId)})),
  remove: (locId, type) => {
    switch (type) {
      case '1':
        // set(state => ({ selAttractions: state.selAttractions.filter(loc => loc.id !== locId)}));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selAttractions: state.selCateLoc.selAttractions.filter(
              (loc) => loc.id !== locId,
            ),
          },
        }));
        break;
      case '2':
        // set(state => ({ selCulture: state.selCulture.filter(loc => loc.id !== locId)}));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selCulture: state.selCateLoc.selCulture.filter(
              (loc) => loc.id !== locId,
            ),
          },
        }));
        break;
      case '3':
        // set(state => ({ selFestival: state.selFestival.filter(loc => loc.id !== locId)}));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selFestival: state.selCateLoc.selFestival.filter(
              (loc) => loc.id !== locId,
            ),
          },
        }));
        break;
      case '4':
        // set(state => ({ selLeports: state.selLeports.filter(loc => loc.id !== locId)}));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selLeports: state.selCateLoc.selLeports.filter(
              (loc) => loc.id !== locId,
            ),
          },
        }));
        break;
      case '5':
        // set(state => ({ selLodge: state.selLodge.filter(loc => loc.id !== locId)}));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selLodge: state.selCateLoc.selLodge.filter(
              (loc) => loc.id !== locId,
            ),
          },
        }));
        break;
      case '6':
        // set(state => ({ selRestaurant: state.selRestaurant.filter(loc => loc.id !== locId)}));
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            selRestaurant: state.selCateLoc.selRestaurant.filter(
              (loc) => loc.id !== locId,
            ),
          },
        }));
        break;
      default:
    }
  },

  // 다음으로 누를 때 백으로 전송(Canvas 페이지에서)
  // canvasPost: async () => {
  //   let { selectedLocations } = get().userPlan;
  //   let tmp = [];
  //   for (let key of Object.keys(selectedLocations))
  //     tmp = [...tmp, ...get().zipSelLoc(selectedLocations[key])];
  //   console.log(selectedLocations);
  //   const response = await axios.post(`http://localhost:4000/travelPlans`, {
  //     travelDays: get().userPlan.travelDays,
  //     selectedLocations: tmp,
  //   });
  //   console.log(response); // 성공하면 success
  //   // set((state) => ({ userPlan: { ...state.userPlan } }));
  //   // console.log(get().userPlan);
  // },
}));

// 여행 보관함에서 사용
export const planStore = create((set, get) => ({
  travelPlans: [],

  getPlans: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans`);
    set({ travelPlans: response.data }); // 백에서 보내주는 데이터가 userPlan
    set((state) => ({ ...state.userPlan, test: 'test' }));
  },
}));

// systemLocation 받아오고, 카테고리 따라서 분류
export const sysLocStore = create((set) => ({
  sysCateLoc: {
    // 전체 location => 분류
    Attractions: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },

  getSysLoc: async () => {
    const response = await axios.get('http://localhost:4000/locations');
    const obj = Object.values(response.data);
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
    set({
      sysCateLoc: {
        Attractions: att,
        Culture: cul,
        Festival: fes,
        Leports: lepo,
        Lodge: lod,
        Restaurant: rest,
      },
    });
  },
}));
