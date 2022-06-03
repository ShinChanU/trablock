/*global kakao*/
import React, { useCallback, useEffect, useState } from 'react';
import SearchPlace from './SearchPlace';
import Map2 from './Map2';
import styled from 'styled-components';

const Ul = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
`;

const MapContainer = ({ onSelect }) => {
  const [inputText, setInputText] = useState('한경대학교');
  const [place, setPlace] = useState('한경대학교');
  const [forMarkerPositions, setForMarkerPositions] = useState([]);
  const [searchPlaces, setSearchPlaces] = useState([]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  // 입력된 place로 검색, marker 배열 생성
  const searchCoord = useCallback((place) => {
    let ps = new kakao.maps.services.Places(); // 장소 검색 객체

    if (!place.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          setForMarkerPositions((forMarkerPositions) => [
            ...forMarkerPositions,
            data[i],
          ]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setSearchPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    };

    if (!place) return;
    ps.keywordSearch(place, placesSearchCB); // 키워드로 장소 검색
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setForMarkerPositions([]);
    setPlace(inputText);
    setInputText('');
  };

  useEffect(() => {
    searchCoord(place);
  }, [place, searchCoord]);

  return (
    <div>
      <SearchPlace
        inputText={inputText}
        onChange={onChange}
        handleSubmit={handleSubmit}
      />
      {/* 마커 배열 변경될 때마다 넘겨줌 */}
      <Map2
        setInputText={setInputText}
        forMarkerPositions={forMarkerPositions}
        searchPlaces={searchPlaces}
        setSearchPlaces={setSearchPlaces}
        onSelect={onSelect}
      />
    </div>
  );
};

export default MapContainer;
