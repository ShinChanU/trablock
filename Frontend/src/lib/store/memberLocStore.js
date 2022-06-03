import axios from 'axios';
import create from 'zustand';

export const memLocStore = create((set, get) => ({
  // 0530 member Location 생성 store

  // 생성한 memberLocation을 모두 담는 배열(삭제 예정)
  memberLocations: [],

  // memLoc 생성 함수
  createMemberLoc: (form, coords, typeData) => {
    console.log(form);
    // 이름, 주소, 좌표, 공유여부, 간단한 설명, 카테고리
    let obj = {};
    if (typeData) {
      Object.keys(typeData).map((e) => {
        obj[e] = ''; // 디폴트값 설정
        if (typeData[e].length > 2) obj[e] = typeData[e][2];
        return obj;
      });
    }
    const { name, share, type, address1, address2, image, summary, detail } =
      form;
    if (name === '') return ['fail', '여행지 이름을 입력해주세요.'];
    else if (address1 === '') return ['fail', '여행지 주소를 선택해주세요.'];
    else if (share === null) return ['fail', '공유 가능 여부를 선택해주세요.'];
    else if (summary === '')
      // 여기 인식을 못함
      return ['fail', '여행지에 대한 간단한 설명을 작성해주세요.'];
    else if (type === '') return ['fail', '여행지 카테고리를 선택해주세요.'];
    console.log('pass');
    const { lat, lng } = coords;
    let isShare = false;
    if (share === 'true') isShare = true;
    let loc = {
      location: {
        name,
        type,
        coords: {
          lat,
          lng,
        },
        address1,
        address2,
        image,
        information: {
          summary,
          detail,
        },
        isMember: true,
      },
      member_location: {
        memberId: 1,
        isPublic: isShare,
      },
      [type]: obj,
    };
    set({
      memberLocations: [...get().memberLocations, loc],
    });
    // axios.post('http://localhost:4000/memberLocations', {
    //   data: loc,
    // });
    console.log(get().memberLocations);
    return 'success';
    // post, data: loc
  },

  // memLoc 생성 시 필드값 input에서 수정시에 typeInfo에 데이터 직접 수정 함수
  onChangeTypeInfo: (type, key, val) => {
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    console.log(type, key, val);
    set((state) => ({
      typeInfo: {
        ...state.typeInfo,
        [type]: {
          ...state.typeInfo[type],
          [key]: [
            state.typeInfo[type][key][0],
            state.typeInfo[type][key][1],
            val,
          ],
        },
      },
    }));
    console.log(get().typeInfo);
  },

  // typeInfo 데이터 초기화
  resetTypeInfo: (type, initData) => {
    console.log(type, initData);
    set((state) => ({
      typeInfo: {
        ...state.typeInfo,
        [type]: initData,
      },
    }));
  },

  // 타입별 다른 정보 입력 기본 폼
  typeInfo: {
    Attractions: {
      parking: ['주차 가능여부', false],
      restDate: ['휴무일', 'ex. 월, 화 휴무'], // null
      useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'], // 09:00 ~ 22:00 (매표마감 21:20)
    },
    Culture: {
      parking: ['주차 가능여부', false],
      restDate: ['휴무일', 'ex. 월, 화 휴무'],
      fee: ['가격', '10,000원'],
      useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'],
      spendTime: ['소요시간', 'ex. 2시간'],
    },
    Festival: {
      startDate: ['개막날', '20220930'], // 20220318
      endDate: ['폐막날', '20221009'], // 20220320
      homepage: [
        '홈페이지 주소',
        'http://www.maskdance.com/2019/sub7/sub0.asp',
      ], // null
      place: ['장소', '경상북도 안동시 육사로 239 탈춤공원'], // 제주시 애월읍 봉성리 새별오름(평화로변)
      placeInfo: ['장소 정보?', '탈춤 공원 무대'],
      playTime: ['행사 시간', '30분'],
      program: ['프로그램', '하회별신굿탈놀이'],
      fee: ['이용 가격', '무료'],
    },
    Leports: {
      parking: ['주차 가능여부', false],
      openPeriod: ['개장 시기', ''],
      reservation: ['예약', '예약 링크?'],
      restDate: ['휴무일', 'ex. 월, 화 휴무'],
      fee: ['이용 가격', '무료'],
      useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'],
    },
    Lodge: {
      checkInTime: ['체크인', '18:00'],
      checkOutTime: ['체크아웃', '12:00'],
      cooking: ['취식 가능여부', false],
      parking: ['주차 가능여부', false],
      reservationUrl: ['예약 링크', 'www.example.com'],
      subfacility: ['부대 시설', '수영장'],
    },
    Restaurant: {
      popularMenu: ['인기메뉴', '김치찌개, 된장찌개...'],
      openTime: ['오픈 시간', 'ex. 09:00 ~ 22:00'],
      packing: ['포장 가능여부', false],
      parking: ['주차 가능여부', false],
      restDate: ['휴무일', 'ex. 월, 화 휴무'],
      menu: ['메뉴', '김밥: 3000원, 우동: 4000원, ...'],
    },
  },
}));
