// 자체 로케이션 추가 버튼
import React, { useState } from 'react';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import ModalModule from 'components/common/modal/ModalModule';

const CreateLocBtn = styled(MdOutlineLibraryAdd)`
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 7px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const Label = styled.label`
  width: 70px;
`;

const Input = styled.input`
  margin-left: 10px;
  margin-right: 10px;
  width: 180px;
`;

const Type = styled.div`
  margin-left: 10px;
`;

const List = [
  'attraction',
  'culture',
  'festival',
  'leports',
  'lodge',
  'Restaurant',
];
// zustand 사용?

const CreateLoc = ({ size, onClick }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  // const [time, setTime] = useState({
  //   startHour: '',
  //   startMinute: '',
  //   stayHour: '',
  //   stayMinute: '',
  // });

  const onChange = (e) => {
    // const { name, value } = e.target;
    // let tmpVal = value;
    // if (value < 0) {
    //   tmpVal = 0;
    // }
    // if (value.length > 3) {
    //   tmpVal = Math.floor(value / 10);
    // }
    // setTime({
    //   ...time,
    //   [name]: tmpVal,
    // });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };
  // const { startHour, startMinute, stayHour, stayMinute } = time;

  return (
    <>
      <CreateLocBtn
        size={size}
        onClick={openModal}
        data-tip
        data-for="createLoc"
      />
      <ReactTooltip id="createLoc" place="left" type="info" effect="solid">
        <div>자체 로케이션을 생성할 수 있습니다.</div>
      </ReactTooltip>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="자체 블록"
        map={true}
      >
        <Container>
          {/* 수정 필요 0317 */}
          <Div>
            <Label htmlFor="name">블록명</Label>
            <Input
              id="name"
              onChange={onChange}
              placeholder="블록 이름을 지정해주세요."
              // name="stayHour"
              // value={stayHour}
            />
          </Div>
          <Div>
            <Label htmlFor="coord">블록 좌표</Label>
            <Input
              id="coord"
              onChange={onChange}
              placeholder="지도에 마커를 표시해주세요"
              // name="stayHour"
              // value={stayHour}
            />
          </Div>
          <Div>
            <Label>type 설정</Label>
            <Type>
              {List.map((value, i) => (
                <div key={i}>
                  <input
                    id={value}
                    value={value}
                    name="category"
                    type="radio"
                    checked={selectValue === value}
                    onChange={handleChange}
                  />
                  {value}
                  <br />
                </div>
              ))}
            </Type>
          </Div>
        </Container>
      </ModalModule>
    </>
  );
};

export default CreateLoc;
