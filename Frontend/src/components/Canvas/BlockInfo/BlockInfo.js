import React from 'react';
import { infoStore } from '../../../lib/store/infoStore';

const AttractionInfo = (locationId) => {
  const { attInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);
  getInfo(id, 'att');
  return (
    <div>
      관광지 정보
      <br />
      이름: {attInfo.name}
      <br />
      주소: {attInfo.address1}
      <br />
      상세주소: {attInfo.address2}
      <br />
      이미지: {attInfo.image1}
      <br />
      이미지2: {attInfo.image2}
      <br />
      전화: {attInfo.tel}
      <br />
      설명: {attInfo.summary}
      <br />
      상세설명: {attInfo.report}
      <br />
      주차여부: {attInfo.parking}
      <br />
      휴일: {attInfo.restDate}
      <br />
      소요시간: {attInfo.useTime}
      <br />
    </div>
  );
};

const CultureInfo = (locationId) => {
  const { cultInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);
  getInfo(id, 'cult');
  return (
    <div>
      문화시설 정보
      <br />
      이름: {cultInfo.name}
      <br />
      주소: {cultInfo.address1}
      <br />
      상세주소: {cultInfo.address2}
      <br />
      이미지: {cultInfo.image1}
      <br />
      이미지2: {cultInfo.image2}
      <br />
      전화: {cultInfo.tel}
      <br />
      설명: {cultInfo.summary}
      <br />
      상세설명: {cultInfo.report}
      <br />
      주차여부: {cultInfo.parking}
      <br />
      휴일: {cultInfo.restDate}
      <br />
      이용요금: {cultInfo.fee}
      <br />
      이용시간: {cultInfo.useTime}
      <br />
      소요시간: {cultInfo.spendTime}
      <br />
    </div>
  );
};

const FestivalInfo = (locationId) => {
  const { festInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);
  getInfo(id, 'fest');
  return (
    <div>
      축제 정보
      <br />
      이름: {festInfo.name}
      <br />
      주소: {festInfo.address1}
      <br />
      상세주소: {festInfo.address2}
      <br />
      이미지: {festInfo.image1}
      <br />
      이미지2: {festInfo.image2}
      <br />
      전화: {festInfo.tel}
      <br />
      설명: {festInfo.summary}
      <br />
      상세설명: {festInfo.report}
      <br />
      시작일: {festInfo.startDate}
      <br />
      종료일: {festInfo.endDate}
      <br />
      홈페이지: {festInfo.homepage}
      <br />
      장소: {festInfo.place}
      <br />
      위치안내: {festInfo.placeInfo}
      <br />
      공연시간: {festInfo.playTime}
      <br />
      프로그램: {festInfo.programe}
      <br />
      이용요금: {festInfo.fee}
      <br />
    </div>
  );
};

const LeportsInfo = (locationId) => {
  const { lepoInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);
  getInfo(id, 'lepo');
  return (
    <div>
      레포츠 정보
      <br />
      이름: {lepoInfo.name}
      <br />
      주소: {lepoInfo.address1}
      <br />
      상세주소: {lepoInfo.address2}
      <br />
      이미지: {lepoInfo.image1}
      <br />
      이미지2: {lepoInfo.image2}
      <br />
      전화: {lepoInfo.tel}
      <br />
      설명: {lepoInfo.summary}
      <br />
      상세설명: {lepoInfo.report}
      <br />
      개장기간: {lepoInfo.openPeriod}
      <br />
      주차여부: {lepoInfo.parking}
      <br />
      예약: {lepoInfo.reservation}
      <br />
      휴일: {lepoInfo.restDate}
      <br />
      이용요금: {lepoInfo.fee}
      <br />
      이용시간: {lepoInfo.useTime}
      <br />
    </div>
  );
};

const LodgeInfo = (locationId) => {
  const { lodgeInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);
  getInfo(id, 'lodge');
  return (
    <div>
      숙소 정보
      <br />
      이름: {lodgeInfo.name}
      <br />
      주소: {lodgeInfo.address1}
      <br />
      상세주소: {lodgeInfo.address2}
      <br />
      이미지: {lodgeInfo.image1}
      <br />
      이미지2: {lodgeInfo.image2}
      <br />
      전화: {lodgeInfo.tel}
      <br />
      설명: {lodgeInfo.summary}
      <br />
      상세설명: {lodgeInfo.report}
      <br />
      체크인 시간: {lodgeInfo.checkInTime}
      <br />
      체크아웃 시간: {lodgeInfo.checkOutTime}
      <br />
      취사 여부: {lodgeInfo.chkCooking}
      <br />
      주차여부: {lodgeInfo.parking}
      <br />
      예약: {lodgeInfo.reservationUrl}
      <br />
      부대시설: {lodgeInfo.subfacility}
      <br />
    </div>
  );
};

const RestaurantInfo = (locationId) => {
  const { resInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);
  getInfo(id, 'res');
  return (
    <div>
      음식점 정보
      <br />
      이름: {resInfo.name}
      <br />
      주소: {resInfo.address1}
      <br />
      상세주소: {resInfo.address2}
      <br />
      이미지: {resInfo.image1}
      <br />
      이미지2: {resInfo.image2}
      <br />
      전화: {resInfo.tel}
      <br />
      설명: {resInfo.summary}
      <br />
      상세설명: {resInfo.report}
      <br />
      인기메뉴: {resInfo.popularMenu}
      <br />
      영업시간: {resInfo.openTime}
      <br />
      포장여부: {resInfo.packing}
      <br />
      주차여부: {resInfo.parking}
      <br />
      휴일: {resInfo.restDate}
      <br />
      메뉴: {resInfo.menu}
      <br />
    </div>
  );
};

function BlockInfo(typeId) {
  console.log(typeId);
  const { type, id } = typeId;
  console.log(type);
  console.log(id);
  switch (type) {
    case '1':
      return <AttractionInfo id={id} />;
    case '2':
      return <CultureInfo id={id} />;
    case '3':
      return <FestivalInfo id={id} />;
    case '4':
      return <LeportsInfo id={id} />;
    case '5':
      return <LodgeInfo id={id} />;
    case '6':
      return <RestaurantInfo id={id} />;
    default:
      return;
  }
}

export default BlockInfo;
