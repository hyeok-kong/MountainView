import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file
import icon from './mountainviewlogo.PNG'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import axios from 'axios';
import mountainImage from './mountain.jpg'; // 산 이미지를 import 합니다.
import { Card, Button, Modal, Form, Container } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.css';


function Kakao() {
  const [markerIndex, setMarkerIndex] = useState(-1); // -1은 마커가 선택되지 않은 상태
  const markers = [    {title: '한라산', position: {lat: 33.36137552429086,lng: 126.52942544970011} },    {title: '성산일출봉', position: {lat: 33.45880720408999,lng: 126.56213211127411}}  ];
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    /*헤더 구성*/ 
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="logo" style={{ textAlign: 'center' }}>
        <img className="logo-img" src={icon} alt="Logo Image" style={{ width: isMobile ? '100px' : '150px' }} />
      </div>
      {isMobile ? (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <i className="fa fa-bars" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleMenuClick}></i>
          {isMenuOpen && (
            <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/MyMountain" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
            </ul>
          )}
        </div>
      ) : (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
            <li style={{ display: 'inline-block' }}><a href="/MyMountain" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
          </ul>
        </div>
      )}
      <Map
        center={{
          lat: 33.36137552429086,
          lng: 126.52942544970011,
        }}
        style={{
          marginTop: '280px',
          width: '100%',
          height: '40em',
        }}
        level={3}
      >
        {markers.map((marker, index) => ( /*여러 개의 마커 사용*/ 
          <MapMarker
            key={index}
            position={marker.position}
            clickable={true}
            onClick={() => setMarkerIndex(index)}
            title={marker.title}
          >
            {markerIndex === index && (
              <div style={{ minWidth: "150px" }}>
                <img
                  alt="close"
                  width="14"
                  height="13"
                  src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setMarkerIndex(-1)}
                />
                {/* 인포윈도우 리스트 */}
                <div style={{ padding: "5px", color: "#000" }}>
                  {marker.title} <br />
                  <a
                    href="/Mountain_info"
                    style={{ color: "blue" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    산 정보
                  </a>{" "}
                  <a
                    href="/BoardList"
                    style={{ color: "blue" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    게시판
                  </a>
                </div>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    /*헤더 구성*/ 
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="logo" style={{ textAlign: 'center' }}>
        <img className="logo-img" src={icon} alt="Logo Image" style={{ width: isMobile ? '100px' : '150px' }} />
      </div>
      {isMobile ? (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <i className="fa fa-bars" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleMenuClick}></i>
          {isMenuOpen && (
            <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/MyMountain" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
            </ul>
          )}
        </div>
      ) : (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
            <li style={{ display: 'inline-block' }}><a href="/MyMountain" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
          </ul>
        </div>
      )}
      <div className="main-text" style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '0' }}>Let's Go</h1>
        <h1 style={{ fontSize: '5rem', marginTop: '0' }}><span>Mountain</span></h1>
      </div>
    </div>
  );
}


function LoginContainer() {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  return <Login isLoginSuccess={isLoginSuccess} setIsLoginSuccess={setIsLoginSuccess} />;
}

const Login = ({ isLoginSuccess, setIsLoginSuccess }) => {
  const REST_API_KEY = '65d7d41f6c724b09645939d238c0b75f'; // 카카오 개발자 사이트에서 발급받은 REST API KEY
  const REDIRECT_URI = 'http://localhost:3000/login'; // 카카오 개발자 사이트에서 등록한 Redirect URI
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    axios.get('/auth/kakao')
      .then(res => {
        console.log(res.data);
        setIsLoginSuccess(true); // 로그인 성공 시 상태 변수를 true로 변경
      })
      .catch(err => {
        console.log(err);
        setIsLoginSuccess(false); // 로그인 실패 시 상태 변수를 false로 변경
      })
  }

  return (
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="logo" style={{ textAlign: 'center' }}>
        <img className="logo-img" src={icon} alt="Logo Image" style={{ width: '150px' }} />
      </div>
      <div className="menu" style={{ textAlign: 'center', marginTop: '50px' }}>
        <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
          <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
          <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
          <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
          <li style={{ display: 'inline-block' }}><a href="/MyMountain" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
        </ul>
      </div>
      <div>
        {isLoginSuccess ? ( // 로그인 성공 시 나타날 화면
          <h1 style={{ marginTop: '150px', flex: 1, textAlign: 'center' }}>
            로그인이 완료되었습니다.
          </h1>
        ) : ( // 로그인 실패 시 나타날 화면
          <h1 center={{ lat: 37.5665, lng: 126.9780 }} style={{ marginTop: '150px', flex: 1, textAlign: 'center' }}>
            <a href={KAKAO_AUTH_URL} onClick={handleLogin}>Kakao Login</a>
          </h1>
        )}
      </div>
    </div>
  )
};




function Mountain_info() {
  // 백엔드로부터 산 정보를 받아온다고 가정
  const mountainData = {
    name: "한라산",
    difficulty: "상",
    height: "1,950m",
    trails: [
      {
        name: "성산일출봉 코스",
        distance: "9.6km",
        estimatedTime: "5시간 30분",
        difficulty: "상",
      },
      {
        name: "연화봉 코스",
        distance: "7.4km",
        estimatedTime: "4시간",
        difficulty: "중",
      },
      // 추가적인 등산로 정보
    ],
    features:
      "한라산은 한국에서 가장 높은 산으로, 제주도에 위치해 있습니다. 제주도의 대표적인 관광지 중 하나이며, 산 정상에서는 아름다운 경치를 감상할 수 있습니다.",
    description:
      "한라산은 대한민국에서 가장 높은 산으로, 해발 고도 1950m에 위치해 있습니다. 자연보호구역이 지정되어 있으며, 국가지정자연재해위험지역으로 지정되어 있습니다. 등산로는 여러 코스가 있으며, 산 정상에서는 아름다운 경치를 감상할 수 있습니다.",
    transportation:
      "한라산 국립공원 본부에서 운영하는 산악버스와 택시를 이용할 수 있습니다.",
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const favoriteButtonStyle = {
    backgroundColor: isFavorite ? "yellow" : "white",
    color: isFavorite ? "black" : "gray",
    borderRadius: "5px",
    border: "2px solid black",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    fontWeight: "bold",
    outline: "none",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    backgroundColor: "black",
    borderRadius: "5px",
    padding: "10px",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    border: "none",
    marginLeft: "10px",
    cursor: "pointer",
  };

  const trailItemStyle = {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  };

  const contentStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "50px",
    backgroundColor: "#f2f22",
    borderRadius: "20px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div style={contentStyle}>
      <h1>{mountainData.name}</h1>
      <p>{mountainData.features}</p>
      <h2>등산로</h2>
      {mountainData.trails.map((trail, index) => (
        <div key={index} style={trailItemStyle}>
          <h3>{trail.name}</h3>
          <p>길이: {trail.distance}</p>
          <p>소요 시간: {trail.estimatedTime}</p>
          <p>난이도: {trail.difficulty}</p>
        </div>
      ))}
      <h2>설명</h2>
      <p>{mountainData.description}</p>
      <h2>교통</h2>
      <p>{mountainData.transportation}</p>
      <button style={favoriteButtonStyle} onClick={handleFavorite}>
        {isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      </button>
      <Link to="/main" style={linkStyle}>
        다른 산 보러 가기
      </Link>
    </div>
  );
}

function BoardList() {
  const [board, setBoard] = useState([
    { title: "Friedrich Wilhelm Nietzsche", content: "Weder Manu, noch Plato, noch Confucius, noch die jüdischen und christlichen Lehrer haben je an ihrem Recht zur Lüge gezweifelt", expanded: false },
    { title: "道", content: "道可道 非常道 名可名 非常名  無名天 地之始 有名萬 物之母", expanded: false },
    { title: "the road not taken", content: "I wandered lonely as a cloudThat floats on high o'er vales and hills,When all at once I saw a crowd,A host, of golden daffodilsBeside the lake, beneath the trees,Fluttering and dancing in the breeze.", expanded: false }
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchBoardData = async () => {
    try {
      const response = await axios.get("/api/board");
      setBoard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/board", { title, content });
      setBoard([...board, response.data]); // response.data에 새로 생성된 게시글이 담겨 있음
      setTitle("");
      setContent("");
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleExpandContent = (index) => {
    const newBoard = [...board];
    newBoard[index].expanded = true;
    setBoard(newBoard);
  };

  return (
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="navbar" style={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <div className="logo" style={{ textAlign: 'center' }}>
          <img className="logo-img" src={icon} alt="Logo Image" style={{ width: '150px' }} />
        </div>
        <div className="menu" style={{ textAlign: 'center', marginTop: '50px' }}>
          <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
            <li style={{ display: 'inline-block' }}><a href="/MyMountain" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
          </ul>
        </div>
      </div>
      <Container>
        <div className="board-container" style={{ marginTop: '100px', padding: '20px' }}>
          {board.map((post, index) => (
            <Card key={index} className="mb-3" style={{ backgroundColor: '#ffffff' }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                {post.content.length > 50 && !post.expanded ? (
                  <div>
                    <Card.Text>{post.content.substring(0, 50)}...</Card.Text>
                    <Button onClick={() => handleExpandContent(index)}>Read more</Button>
                  </div>
                ) : (
                  <div>
                    <Card.Text>{post.content}</Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
          <div className="d-flex justify-content-end mb-3" style={{ marginLeft: 'auto' }}>
            <Button onClick={handleButtonClick} style={{ backgroundColor: '#008000', border: 'none', borderRadius: '10px', fontSize: '16px' }}>New Post</Button>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </Form.Group>
                <Button type="submit" style={{ backgroundColor: '#008000', border: 'none', borderRadius: '10px', fontSize: '16px' }}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </div>
  );
}

function MyMountain() {

  const [reviewlist, setData] = useState(null);
  const onClick = () => {
    try{
      axios.get("/api/posts/user/유저id");
      setData(response.reviewlist);
    }catch(e){
      console.log(e);
    }
  };

  return (
      <div className="container1">
        <div className="Left">
          <div className="nickname">닉네임:</div>
          <div className="grade">등급:</div>
          <div className="mountainlist">정복한 산 목록</div>
        </div>
        <div className="Right">
          <div className="reviewlist" style={{ position: 'relative' }}>작성한 리뷰
            <div className="more" style={{ position: 'absolute', top: '0', right: '0' }}>
            <button type="button" class="btn btn-link"><a href="/">더보기</a></button>
                                                    {/*링크 연결=> 내 리뷰게시판*/} 
            </div>
          </div>
        </div> 
      </div> 
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Kakao />} />
        <Route path="/mountain_info" element={<Mountain_info />} />  {/*산 정보*/}
        <Route path="/boardList" element={<BoardList />} />  {/*게시판*/}
        <Route path="/MyMountain" element={<MyMountain />} />  {/*내 등산기록 페이지*/}
      </Routes>
    </Router>
  );
}

export default App;