// 자체 로케이션 추가 버튼
import React, { useEffect, useState } from 'react';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import ModalModule from 'components/common/modal/ModalModule';
import { useStore } from 'lib/store/planStore';
import { memLocStore } from 'lib/store/memberLocStore';
import DivInput from './DivInput';
import DivAddr from './DivAddr';
import DivRadioInput from './DivRadioInput';

const CreateLocBtn = styled(MdOutlineLibraryAdd)`
  cursor: pointer;
`;

const EssenSpan = styled.span`
  color: red;
`;

const Div = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  /* padding-left: 50px; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 30vw;
`;

const Label = styled.label`
  width: 35%;
`;

const RightDiv = styled.div`
  /* margin-left: 10px; */
  width: 65%;
`;

const Select = styled.select`
  width: 100%;
  /* margin-right: 10px; */
`;

const Option = styled.option`
  width: 100%;
`;

const DivDetail = styled.div``;

const Ul = styled.span``;

const H4 = styled.h5`
  text-align: center;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: 10px;
`;

const CreateLoc = ({ size, onClick }) => {
  const { category } = useStore();
  const { createMemberLoc, typeInfo, onChangeTypeInfo, resetTypeInfo } =
    memLocStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  });
  const [form, setForm] = useState({
    name: '',
    address1: '',
    address2: '',
    share: null,
    image: '',
    summary: '',
    detail: '',
    type: '',
  });
  const [typeDefaultData, setTypeDefaultData] = useState({});
  const [errMsg, setErrMsg] = useState(null);
  const { name, share, type, address1, address2, image, summary, detail } =
    form;

  useEffect(() => {
    setTypeDefaultData(typeInfo[type]); // 타입 설정시 타입별 기본 데이터 가져오기
  }, [type]);

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setErrMsg(null);
    setForm({
      name: '',
      share: null,
      type: '',
      address1: '',
      address2: '',
      image: '',
      summary: '',
      detail: '',
    });
    setModalIsOpen(false);
  };

  const onSelect = (e) => {
    setForm({
      ...form,
      name: e.place_name,
      address1: e.address_name,
    });
    setCoords({
      lat: e.y,
      lng: e.x,
    });
  };

  const onSubmit = () => {
    // typeInfo의 타입에 따라 데이터들 모두 store에 전송해서 api요청
    let res = createMemberLoc(form, coords, typeInfo[type]);
    console.log(res);
    if (res === 'success') {
      // 다시 초기화, typeDefaultData 사용, typeInfo 덮어쓰기
      resetTypeInfo(type, typeDefaultData);
      closeModal();
      alert('여행지가 생성되었습니다!');
    } else {
      setErrMsg(res[1]);
    }
  };

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
        map="memberLoc"
        onSelect={onSelect}
        onSubmit={onSubmit}
      >
        <Container>
          <DivInput
            title="여행지 이름"
            onChange={onChange}
            val={name}
            id="name"
            placeholder="여행지 이름을 입력해주세요."
            essen={true}
          />
          <DivAddr
            title="여행지 주소"
            id="address1"
            val={address1}
            essen={true}
          />
          <DivInput
            title="여행지 세부 주소"
            onChange={onChange}
            val={address2}
            id="address2"
            placeholder="여행지 세부주소를 입력해주세요"
            essen={false}
          />
          <DivRadioInput
            title="공유 가능 여부"
            onChange={onChange}
            id="share"
            essen={true}
          />
          <DivInput
            title="이미지"
            onChange={onChange}
            val={image}
            id="image"
            placeholder="이미지 업로드해주세요"
            essen={false}
          />
          <DivInput
            title="간단한 설명"
            onChange={onChange}
            val={summary}
            id="summary"
            placeholder="여행지에 대한 간단한 설명을 작성해주세요"
            essen={true}
          />
          <DivInput
            title="자세한 설명"
            onChange={onChange}
            val={detail}
            id="detail"
            placeholder="여행지에 대한 자세한 설명을 작성해주세요."
            essen={false}
            detail
          />
          <Div>
            <Label>
              <EssenSpan>*</EssenSpan>카테고리 설정
            </Label>
            <RightDiv>
              <Select name="type" onChange={onChange} value={type}>
                <Option value="">선택</Option>
                {Object.keys(category).map((key, index) => (
                  <Option value={category[key].eng} key={index}>
                    {category[key].kor}
                  </Option>
                ))}
                <Option value="기타">기타</Option>
              </Select>
            </RightDiv>
          </Div>
          {typeDefaultData && (
            <DivDetail>
              <hr />
              <H4>카테고리별 세부정보 설정</H4>
              <hr />
              <Ul>
                {Object.keys(typeDefaultData).map((e, i) => {
                  let title = typeDefaultData[e][0];
                  let inputSample = typeDefaultData[e][1];
                  if (typeof inputSample === 'boolean')
                    return (
                      <DivRadioInput
                        title={title}
                        onChange={(el) =>
                          onChangeTypeInfo(type, e, el.target.value)
                        }
                        id={e}
                      />
                    );
                  else
                    return (
                      <DivInput
                        title={title}
                        onChange={(el) =>
                          onChangeTypeInfo(type, e, el.target.value)
                        }
                        placeholder={inputSample}
                        id={e}
                        sub
                      />
                    );
                })}
              </Ul>
            </DivDetail>
          )}
          {errMsg && (
            <div>
              {/* <hr /> */}
              <Error>{errMsg}</Error>
            </div>
          )}
        </Container>
      </ModalModule>
    </>
  );
};

export default CreateLoc;
