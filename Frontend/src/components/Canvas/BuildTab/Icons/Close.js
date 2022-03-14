// 닫기 버튼
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const CloseBtn = styled(MdClose)`
  cursor: pointer;
`;

const Close = ({ size, onClick }) => {
  return <CloseBtn size={size} onClick={onClick} />;
};

export default Close;
