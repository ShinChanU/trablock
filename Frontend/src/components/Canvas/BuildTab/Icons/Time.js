// 시간 추가, 변경 버튼
import { MdMoreTime } from 'react-icons/md';
import styled from 'styled-components';

const TimeBtn = styled(MdMoreTime)`
  cursor: pointer;
`;

const Time = ({ size, onClick }) => {
  return <TimeBtn size="18" onClick={onClick} />;
};

export default Time;
