import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import logo from "./icon/logo.svg";
import home from "./icon/home.svg";
import search from "./icon/search.svg";
import collect from "./icon/collect.svg";
import profile from "./icon/profile.svg";
import post from "./icon/post.svg";
import arrow from "./icon/arrow.svg";
import comment from "./icon/comment.svg";
import heart from "./icon/heart.svg";
import "./PublicSetting.css";
import { fakeArticles, fakeList } from "./fakeData.js";

// import { Container } from "./StyledPublicSetting";

// 讓按鈕後方數量客製化的函數
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B+`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k+`;
  } else {
    return num;
  }
};

function App() {
  const [isListOpen, setIsListOpen] = useState(false);
  const toggleListOpen = () => {
    setIsListOpen(!isListOpen);
  };

  // 文章是否過長狀態
  const [contentOverflow, setContentOverflow] = useState({});
  const contentRefs = useRef({});

  // 文章是否展開狀態
  const [expandedArticles, setExpandedArticles] = useState({});

  useEffect(() => {
    fakeArticles.forEach((article) => {
      if (contentRefs.current[article.id]) {
        const isOverflowing =
          contentRefs.current[article.id].scrollHeight > 300;
        setContentOverflow((prev) => ({
          ...prev,
          [article.id]: isOverflowing,
        }));
      }
    });
  }, []);

  useEffect(() => {
    const newExpandableArticles = {};
    fakeArticles.forEach((article) => {
      const contentElement = document.createElement("div");
      contentElement.innerHTML = article.content;
      const contentHeight = contentElement.offsetHeight;
      newExpandableArticles[article.id] = contentHeight > 300;
    });
    setExpandedArticles(newExpandableArticles);
  }, []);

  const toggleArticleExpansion = (id) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <GlobalStyle />
      <Container className="all-center">
        {/* 左側板塊 */}
        <Left className="flex-column-vcenter">
          <SCslogo src={logo} />
          <LeftInner className="radius-30">
            <LeftH1 className="vertical-center">版面</LeftH1>
            {fakeList.map((fakeList) => (
              <LeftUl
                key={fakeList.id}
                className="radius-10 font-size-B flex-column-vcenter"
                onClick={toggleListOpen}
              >
                {fakeList.bigTitle}
                {fakeList.littleTitle &&
                  fakeList.littleTitle.map((littleTitle) => (
                    <LeftLi className="vertical-center" isListOpen={isListOpen}>
                      {littleTitle}
                    </LeftLi>
                  ))}
              </LeftUl>
            ))}
          </LeftInner>
        </Left>

        {/* 中間板塊 */}
        <Middle className="radius-30 flex-column-hcenter">
          <MiddleHeader>
            <MiddleHeaderBlock className="vertical-center">
              <MiddleHeaderFollow className="vertical-center">
                追蹤
              </MiddleHeaderFollow>
              <MiddleHeaderRecommend className="vertical-center">
                推薦
              </MiddleHeaderRecommend>
            </MiddleHeaderBlock>
          </MiddleHeader>
          {fakeArticles.map((fakeArticles) => (
            <MiddlePost key={fakeArticles.id}>
              <MiddlePostTitle>
                <MiddleH1 className="vertical-center">
                  {fakeArticles.title}
                </MiddleH1>
                <MiddlePostTileAuthor className="vertical-center">
                  <MiddlePostTileStamp>
                    {fakeArticles.time}．{fakeArticles.author}
                  </MiddlePostTileStamp>
                  <MiddlePostTitleImg
                    className="radius-full"
                    src={fakeArticles.imageUrl}
                  />
                </MiddlePostTileAuthor>
              </MiddlePostTitle>
              <MiddleP
                ref={(el) => (contentRefs.current[fakeArticles.id] = el)}
                style={{
                  maxHeight: expandedArticles[fakeArticles.id]
                    ? "none"
                    : "300px",
                  overflow: "hidden",
                }}
              >
                {fakeArticles.content}
              </MiddleP>
              <MiddlePostFooter className="vertical-center">
                <MiddlePostFooter className="vertical-center">
                  {/* 貼文開關按鈕 */}
                  <OpenButton
                    src={arrow}
                    show={contentOverflow[fakeArticles.id]}
                    onClick={() => toggleArticleExpansion(fakeArticles.id)}
                    style={{
                      transform: expandedArticles[fakeArticles.id]
                        ? "rotate(180deg)"
                        : "none",
                    }}
                  />
                  <MiddlePostFooterRight className="vertical-center">
                    {/* 愛心按鈕 */}
                    <MiddlePostHeartButton className="vertical-center">
                      <MiddlePostHeartIcon src={heart} />
                      <MiddlePostFooterP>
                        {formatNumber(fakeArticles.heartsCount || 0)}
                      </MiddlePostFooterP>
                    </MiddlePostHeartButton>
                    {/* 留言按鈕 */}
                    <MiddlePostCommentButton className="vertical-center">
                      <MiddlePostCommentIcon src={comment} />
                      <MiddlePostFooterP>
                        {formatNumber(fakeArticles.commentCount || 0)}
                      </MiddlePostFooterP>
                    </MiddlePostCommentButton>
                    {/* 收藏按鈕 */}
                    <MiddlePostCollectButton className="vertical-center">
                      <MiddlePostCollectIcon src={collect} />
                      <MiddlePostFooterP>
                        {formatNumber(fakeArticles.collectCount || 0)}
                      </MiddlePostFooterP>
                    </MiddlePostCollectButton>
                  </MiddlePostFooterRight>
                </MiddlePostFooter>
              </MiddlePostFooter>
            </MiddlePost>
          ))}
        </Middle>

        {/* 右側板塊 */}
        <Right className="flex-column-vcenter">
          <RightSreachButton className="all-center radius-10">
            <RightSearchImg src={search} />
          </RightSreachButton>

          <RightCollectButton className="all-center radius-10">
            <RightCollectImg src={collect} />
          </RightCollectButton>

          <RightPersonalButton className="all-center radius-10">
            <RightProfileImg src={profile} />
          </RightPersonalButton>
        </Right>

        {/* 額外部件 */}
        <HomeButton className="radius-full">
          <HomeImg src={home} />
        </HomeButton>

        <PostButton className="radius-full">
          <PostImg src={post} />
        </PostButton>
      </Container>
    </>
  );
}

// 顏色設定
const Gray1 = "#f2f2f2";
const Gray2 = "#E0E0E0";
const Gray3 = "#BDBDBD";
const Black = "#333";
const White = "#fff";

// 全域設定
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap');
  font-family: "Noto Sans TC", sans-serif;
  color: ${Black};
`;

// 整體
const Container = styled.div`
  background-color: ${Gray1};
  height: 100vh;
`;

// 左邊板塊
const Left = styled.div`
  position: fixed;
  top: 0;
  left: 100px;
  width: 250px;
  height: 100%;
`;

const SCslogo = styled.img`
  position: absolute;
  top: 50px;
  height: 50px;
  width: 50px;
  margin-top: 50px;
`;

const LeftInner = styled.div`
  display: flex column;
  background-color: ${White};
  max-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LeftH1 = styled.h1`
  font-size: 24px;
  height: 50px;
  margin: 0px 20px;
  margin-top: 15px;
  color: ${Black};
`;

const LeftUl = styled.ul`
  padding: 10px 10px;
  font-size: 20px;
  font-weight: bold;
  min-height: 30px;
  margin: 20px;
  margin-top: 0px;
  background-color: ${Gray2};
  cursor: pointer;
  color: ${Black};
`;

const LeftLi = styled.li`
  font-size: 18px;
  transition: height 0.3s;
  overflow: hidden;
  height: ${(props) => (props.isListOpen ? "40px" : "0")};
  opacity: ${(props) => (props.isListOpen ? "1" : "0")};
  font-weight: lighter;
  list-style-type: none;
  margin: 0px 10px;
  border-bottom: 1px solid ${Gray1};
  cursor: pointer;
  color: ${Black};
  &:last-child {
    border-bottom: 0px;
  }
`;

// 中間板塊
const Middle = styled.div`
  width: 1000px;
  height: 800px;
  background-color: ${White};
  overflow: hidden;
  overflow-y: auto;
  position: relative;
`;

const MiddleHeader = styled.div`
  width: 900px;
  position: sticky;
  top: 0px;
  background-color: ${White};
  z-index: 1;
  border-bottom: 2px solid ${Gray2};
`;

const MiddleHeaderBlock = styled.div`
  display: flex;
  height: 80px;
`;

const MiddleHeaderFollow = styled.p`
  color: ${Black};
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
  font-weight: 700;
  border-bottom: 3px solid ${Black};
`;

const MiddleHeaderRecommend = styled.p`
  color: ${Gray3};
  font-size: 18px;
  cursor: pointer;
  font-weight: 700;
`;

const MiddlePost = styled.div`
  padding-bottom: 10px;
  width: 900px;
  border-bottom: 1px solid ${Gray2};
  &:last-child {
    border-bottom: none;
  }
`;

const MiddlePostTitle = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const MiddleH1 = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${Black};
  letter-spacing: 1px;
`;

const MiddlePostTileAuthor = styled.div``;

const MiddlePostTileStamp = styled.p`
  font-size: 14px;
  margin-right: 10px;
  font-weight: 600;
  color: ${Black};
  letter-spacing: 1px;
`;

const MiddlePostTitleImg = styled.img`
  height: 50px;
  width: 50px;
  overflow: hidden;
`;

const MiddleP = styled.p`
  font-size: 16px;
  padding: 0px 20px;
  color: ${Black};
  max-height: ${(props) => (props.isExpanded ? "none" : "300px")};
  overflow: hidden;
  letter-spacing: 1px;
  line-height: 25px;
`;

const MiddlePostFooter = styled.div`
  height: 40px;
  width: 100%;
  justify-content: space-between;
`;

const OpenButton = styled.img`
  margin-left: 10px;
  height: 15px;
  width: 15px;
  background-color: ${White};
  cursor: pointer;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

const MiddlePostFooterRight = styled.button`
  margin-right: 10px;
`;

const MiddlePostFooterP = styled.p`
  font-size: 14px;
  width: 60px;
  color: ${Gray3};
  text-align: left;
  margin: 0px 5px;
`;

const MiddlePostHeartButton = styled.button`
  cursor: pointer;
  background-color: ${White};
`;

const MiddlePostHeartIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const MiddlePostCommentButton = styled.button`
  cursor: pointer;
  background-color: ${White};
`;

const MiddlePostCommentIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const MiddlePostCollectButton = styled.button`
  cursor: pointer;
  background-color: ${White};
`;

const MiddlePostCollectIcon = styled.img`
  height: 20px;
  width: 20px;
`;

// 右邊板塊
const Right = styled.div`
  position: fixed;
  top: 0px;
  right: 100px;
  width: 50px;
  height: 100%;
`;

const RightSreachButton = styled.button`
  height: 80px;
  background-color: ${White};
  margin-bottom: 20px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const RightSearchImg = styled.img`
  height: 30px;
  width: 30px;
`;

const RightCollectButton = styled.button`
  height: 80px;
  background-color: ${White};
  margin-bottom: 20px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const RightCollectImg = styled.img`
  height: 30px;
  width: 30px;
`;

const RightPersonalButton = styled.button`
  height: 80px;
  background-color: ${White};
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const RightProfileImg = styled.img`
  height: 30px;
  width: 30px;
`;

// 額外部件
const HomeButton = styled.button`
  transition: 0.3s;
  position: fixed;
  background-color: ${Gray2};
  height: 400px;
  width: 400px;
  top: 0px;
  right: 0px;
  transform: translate(50%, -50%);
  cursor: pointer;
  &:hover {
    transform: translate(50%, -50%) scale(1.1);
  }
`;

const HomeImg = styled.img`
  position: absolute;
  height: 40px;
  width: 40px;
  bottom: 100px;
  left: 100px;
`;

const PostButton = styled.button`
  position: fixed;
  bottom: 0px;
  transform: translate(0%, 50%);
  height: 250px;
  width: 250px;
  background-color: ${Gray2};
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: translate(0%, 50%) scale(1.1);
  }
`;

const PostImg = styled.img`
  position: absolute;
  top: 70px;
  transform: translate(-50%, -50%);
  height: 70px;
  width: 70px;
`;

export default App;
