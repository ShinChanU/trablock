// 펜 버튼
import { MdModeEdit } from 'react-icons/md';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const PencilBtn = styled(MdModeEdit)`
  cursor: pointer;
`;

const Pencil = ({ size, onClick }) => {
  return (
    <>
      <PencilBtn size={size} onClick={onClick} data-tip data-for="planName" />
      <ReactTooltip id="planName" place="right" type="info" effect="solid">
        <div>여행 이름을 변경할 수 있습니다.</div>
      </ReactTooltip>
    </>
  );
};

export default Pencil;
