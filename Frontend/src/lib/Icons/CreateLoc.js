// 자체 로케이션 추가 버튼
import { MdOutlineLibraryAdd } from 'react-icons/md';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const CreateLocBtn = styled(MdOutlineLibraryAdd)`
  cursor: pointer;
`;

const CreateLoc = ({ size, onClick }) => {
  return (
    <>
      <CreateLocBtn
        size={size}
        onClick={onClick}
        data-tip
        data-for="createLoc"
      />
      <ReactTooltip id="createLoc" place="left" type="info" effect="solid">
        <div>자체 로케이션을 생성할 수 있습니다.</div>
      </ReactTooltip>
    </>
  );
};

export default CreateLoc;
