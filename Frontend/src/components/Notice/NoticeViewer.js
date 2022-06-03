import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import Responsive from 'components/common/Responsive';
import Button from 'components/common/NoticeButton';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};

  span + span:before {
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PageHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid ${palette.gray[5]};
`;

const NoticeViewer = () => {
  const [test, setTest] = useState('');
  const [loading, setLoading] = useState(false);
  const { numId } = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/notices');
      setTest(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <PostViewerBlock>Loading...</PostViewerBlock>;
  }

  if (!test) return null;

  const viewList = test.filter((t) => t.numId === Number(numId));
  console.log(viewList);
  if (!viewList[0]) {
    return (
      <>
        {test && console.log(test)}
        <PostViewerBlock>
          <PageHeader>
            <h1>공지사항</h1>
          </PageHeader>
          <PostHead>
            <h2>존재하지 않는 공지사항 입니다.</h2>
            <SubInfo>
              <span>
                <b>관리자</b>
              </span>
              <span>{new Date().toLocaleDateString()}</span>
              <span>null</span>
            </SubInfo>
          </PostHead>
          <PostContent
            dangerouslySetInnerHTML={{
              __html: '<p>존재하지 <b>않는</b> 공지사항입니다.</p>',
            }}
          />
          <Button>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to={process.env.PUBLIC_URL + '/notice/noticeList'}
            >
              목록으로 돌아가기
            </Link>
          </Button>
        </PostViewerBlock>
      </>
    );
  }

  if (test && viewList) {
    const { title, author, date, views, body } = viewList[0];
    return (
      <>
        <PostViewerBlock>
          <PageHeader>
            <h1>공지사항</h1>
          </PageHeader>
          <PostHead>
            <h2>{title}</h2>
            <SubInfo>
              <span>
                <b>{author}</b>
              </span>
              <span>{date}</span>
              <span>{views}</span>
            </SubInfo>
          </PostHead>
          <PostContent dangerouslySetInnerHTML={{ __html: body }} />

          <Button>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to={process.env.PUBLIC_URL + '/notice/noticeList'}
            >
              목록
            </Link>
          </Button>
        </PostViewerBlock>
      </>
    );
  }
};

export default NoticeViewer;
