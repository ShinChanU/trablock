import React, { /*useEffect,*/ useState } from 'react';
import { useStore } from 'lib/store/planStore';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import Close from 'lib/Icons/Close';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;
const ThumbnailSettingDiv = styled.div`
  margin-left: 30px;
  @media only screen and (min-width: 800px) {
    margin-left: 10%;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 180px;
  }
`;
const TooltipButton = styled.button`
  margin: 0;
  margin-left: 10px;
  border: 1px solid gray;
  cursor: pointer;
  border-radius: 100%;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;
const ThumbnailboxDiv = styled.div`
  display: flex;
  align-items: flex-end;
  height: 130px;
  margin: 20px;
`;
const PreviewboxDiv = styled.div`
  align-items: center;
  ${({ uploading }) => {
    return uploading
      ? `width: 100px;
      margin-left: 5%;`
      : `width: 173px;
    height: 130px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;`;
  }};
`;
const StyledFile = styled.label`
  border: 1px solid lightgray;
  border-radius: 5px;
  background: white;
  padding-right: 7%;
  padding-left: 7%;
  padding-top: 2%;
  padding-bottom: 2%;
  cursor: pointer;
  :hover {
    background: lightgray;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  }
`;

export const ImageSetting = () => {
  const { userPlan, setThumbnail } = useStore();
  const [imgData, setImgData] = useState(null);

  const insertImg = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgBase64 = reader.result;
      console.log(previewImgBase64);

      if (previewImgBase64) {
        const formData = new FormData();
        formData.append('file', e.target.files[0].name);
        //console.log(formData.getAll('file'));
        setThumbnail(formData);
        setImgData(previewImgBase64);
      }
    };
    console.log(userPlan.thumbnail);
  };
  /*const insertImg = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      console.log(e.target.files[0].name);

      if (previewImgUrl) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        //formData.append('file', previewImgUrl);
        setThumbnail(formData);
        setImgData(previewImgUrl);
      }
      console.log(userPlan.thumbnail);
    };
  };*/
  const deleteImg = () => {
    setImgData(null);
    setThumbnail([]);
  };

  return (
    <ThumbnailSettingDiv>
      <TitleSpan>4. 썸네일 등록 </TitleSpan>
      <TooltipButton data-tip data-for="thumbnailsetting">
        ?
      </TooltipButton>
      <ReactTooltip
        id="thumbnailsetting"
        place="right"
        type="info"
        effect="solid"
      >
        <div>플랜을 원하는 사진으로 꾸며보세요.</div>
      </ReactTooltip>
      <ThumbnailboxDiv>
        <PreviewboxDiv uploading={false}>
          <img
            src={
              imgData ? imgData : userPlan.thumbnail ? userPlan.thumbnail : null
            }
            alt="이미지 미리보기"
            height="130"
          />
        </PreviewboxDiv>
        <PreviewboxDiv uploading={true}>
          <form encType="multipart/form-data">
            <StyledFile htmlFor="input-file">파일 선택</StyledFile>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              onChange={(e) => insertImg(e)}
              style={{ display: 'none' }}
            />
          </form>
        </PreviewboxDiv>
        <Close size="20" onClick={() => deleteImg()} />
      </ThumbnailboxDiv>
    </ThumbnailSettingDiv>
  );
};
