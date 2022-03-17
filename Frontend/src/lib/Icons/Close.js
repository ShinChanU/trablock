// 닫기 버튼
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const CloseBtn = styled(MdClose)`
  cursor: pointer;
`;

const Close = ({ size, onClick, tooltip }) => {
  return (
    <>
      <CloseBtn size={size} onClick={onClick} data-tip data-for="close" />
      {tooltip ? (
        <ReactTooltip id="close" place="right" type="info" effect="solid">
          <div>다시 장바구니로 되돌릴 수 있습니다.</div>
        </ReactTooltip>
      ) : (
        ''
      )}
    </>
  );
};

export default Close;
