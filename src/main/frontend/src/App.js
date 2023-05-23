import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file
import icon from './mountainviewlogo.PNG'
import loginpage from './loginpage.jpg'
import { FaHome, FaUser, FaTasks, FaMountain } from 'react-icons/fa';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import axios from 'axios';
import Homeimage from './Home.jpg'; // Home 이미지
import mountain from './mountain.png'; // Kakao Map 이미지
import Mountaininfoimage from './Mountaininfo.jpg'; //Mountain_info 이미지
import Mypageimage from './Mypage.jpg'; //Mypage 이미지
import { Card, Button, Modal, Form, Container, Pagination, handleButtonClick } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.css';
import styled from 'styled-components';
import OpenAI from 'openai-api';
import './Chatmountain.css';
import member from "./member_img.png";
import { useMediaQuery } from 'react-responsive';
import boardback from './boardback.jpg';
import chatpage from './chatpage.png';



const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="logo" style={{ textAlign: 'center' }}>
        <img className="logo-img" src={icon} alt="Logo Image" style={{ width: isMobile ? '100px' : '150px' }} />
      </div>
      {isMobile ? (
        <>
          <nav className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
            <i className="fa fa-bars" style={{ fontSize: '20px', cursor: 'pointer'}} onClick={handleMenuClick}></i>
          </nav>
          {isMenuOpen && (
            <div className="sidebar" style={{ backgroundColor: 'white', position: 'fixed', top: '0', right: '0', height: '100vh', width: '250px', zIndex: '999', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)', transition: 'all 0.3s ease-in-out' }}>
              <button style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', cursor: 'pointer', border: '0px' }} onClick={handleMenuClick}>
                {isOpen ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}
              </button>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ display: 'block', marginTop: '40px' }}>
                  <a href="/" style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '10px' }}>
                    <FaHome style={{ marginRight: '5px' }} /> Home
                  </a>
                </li>
                <li style={{ display: 'block', marginTop: '20px' }}>
                  <a href="/login" style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '10px' }}>
                    <FaUser style={{ marginRight: '5px' }} /> Login
                  </a>
                </li>
                <li style={{ display: 'block', marginTop: '20px' }}>
                  <a href="/main" style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '10px' }}>
                    <FaTasks style={{ marginRight: '5px' }} /> Services
                  </a>
                </li>
                <li style={{ display: 'block', marginTop: '20px' }}>
                  <a href="/Mypage" style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '10px' }}>
                    <FaMountain style={{ marginRight: '5px' }} /> Mypage
                  </a>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
            <li style={{ display: 'inline-block' }}><a href="/Mypage" style={{ textDecoration: 'none', color: 'black' }}>Mypage</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};


const Header_b = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
            <li style={{ display: 'inline-block' }}><a href="/Mypage" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};
const Header_h = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="logo" style={{ textAlign: 'center' }}>
        <img className="logo-img" src={icon} alt="Logo Image" style={{ width: isMobile ? '100px' : '150px' }} />
      </div>
      {isMobile ? (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <i className="fa fa-bars" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleMenuClick}></i>
          {isMenuOpen && (
            <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'white' }}>Home</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'white' }}>Services</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/MyMountain" style={{ textDecoration: 'none', color: 'white' }}>Mountain</a></li>
            </ul>
          )}
        </div>
      ) : (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'white' }}>Home</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'white' }}>Services</a></li>
            <li style={{ display: 'inline-block' }}><a href="/Mypage" style={{ textDecoration: 'none', color: 'white' }}>Mountain</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};





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
    <div>
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${Homeimage})`,
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      {/* <div className="logo" style={{ textAlign: 'center' }}>
        <img className="logo-img" src={icon} alt="Logo Image" style={{ width: isMobile ? '100px' : '150px' }} />
       </div> */}
      {isMobile ? (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <i className="fa fa-bars" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleMenuClick}></i>
          {isMenuOpen && (
            <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
              <li style={{ display: 'block', marginTop: '20px' }}><a href="/Mypage" style={{ textDecoration: 'none', color: 'black' }}>Mypage</a></li>
            </ul>
          )}
        </div>
      ) : (
        <div className="menu" style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black', fontSize: '24px' }}>Home</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black', fontSize: '24px' }}>Login</a></li>
            <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black', fontSize: '24px' }}>Services</a></li>
            <li style={{ display: 'inline-block' }}><a href="/Mypage" style={{ textDecoration: 'none', color: 'black', fontSize: '24px' }}>Mypage</a></li>
          </ul>
        </div>
      )}
      <div className="main-text" style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '5rem', marginBottom: '0' }}>Let's Go</h1>
        <h1 style={{ fontSize: '6rem', marginTop: '0' }}><span>Mountain</span></h1>
      </div>
    </div>
  </div>
  );
}


function LoginContainer() {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  return <Login isLoginSuccess={isLoginSuccess} setIsLoginSuccess={setIsLoginSuccess} />;
} const Login = ({ isLoginSuccess, setIsLoginSuccess }) => {
  const REST_API_KEY = '65d7d41f6c724b09645939d238c0b75f'; // 카카오 개발자 사이트에서 발급받은 REST API KEY
  const REDIRECT_URI = 'http://localhost:3000/login'; // 카카오 개발자 사이트에서 등록한 Redirect URI
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    axios
      .get('/auth/kakao')
      .then(res => {
        console.log(res.data);
        setIsLoginSuccess(true); // 로그인 성공 시 상태 변수를 true로 변경
      })
      .catch(err => {
        console.log(err);
        setIsLoginSuccess(false); // 로그인 실패 시 상태 변수를 false로 변경
      });
  };

  return (
    <div
      className="home-page"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${loginpage})`,
        backgroundSize: 'cover',
      }}
    >
      <Header_h />


      <div>
        {isLoginSuccess ? (
          // 로그인 성공 시 나타날 화면
          <h1 style={{ marginTop: '150px', flex: 1, textAlign: 'center', color: 'white', fontFamily: 'cursive', fontSize: '48px' }}>
            로그인이 완료되었습니다.
          </h1>
        ) : (
          // 로그인 실패 시 나타날 화면
          <div style={{ marginTop: '50px', flex: 1, textAlign: 'left' }}>
            <p style={{ color: 'white', marginTop: '10px', fontFamily: 'cursive', fontSize: '20px' }}>
              Hi anonymous.
            </p>
            <p style={{ color: 'white', marginTop: '10px', fontFamily: 'cursive', fontSize: '20px' }}>
              we got much tips and funny things about mountain
            </p>
            <p style={{ color: 'white', fontFamily: 'cursive', fontSize: '20px', marginTop: '10px' }}>
              If you wanna more tips? let's go Kakao Login
            </p>
            <a
              href={KAKAO_AUTH_URL}
              onClick={handleLogin}
              style={{
                color: 'white',
                background: 'none',
                border: 'none',
                fontSize: '30px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'cursive',
                textDecoration: 'underline',
                marginTop: '20px',
              }}
            >
              Kakao Login
            </a>

          </div>
        )}
      </div>
    </div>
  );
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
    
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  };

  const contentStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "50px",
    backgroundColor: "#f2f22",
    borderRadius: "20px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
    backgroundImage: `url(${Mountaininfoimage})`, /*배경 이미지 삽입*/
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    color:'white' /*글씨 색 변경*/
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
      <h1>설명</h1>
      <p>{mountainData.description}</p>
      <h1>교통</h1>
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
  const [board, setBoard] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userid, setUserid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const fetchBoardData = (page) => {
    console.log(page)
    axios
      .get(`http://ec2-3-37-214-183.ap-northeast-2.compute.amazonaws.com:8080/api/posts?size=5&page=${page}`)
      .then((response) => {
        const newBoardData = response.data;
        if (newBoardData && newBoardData.length > 0) { // Check if newBoardData is not undefined
          setBoard(newBoardData);
          setUserid("1")
          setTotalPages(response.data.totalPages);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchBoardData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSubmit = (event) => {
    axios.post("http://ec2-3-37-214-183.ap-northeast-2.compute.amazonaws.com:8080/api/posts", { title, content, userid })
      .then(response => {
        const newBoardData = Array.isArray(response.data.content) ? response.data.content : [response.data.content];
        setBoard([...board, ...newBoardData]);
        setTitle("");
        setContent("");
        setShowModal(false);
        fetchBoardData(); // <-- add this line to refresh the board

      })
      .catch(error => {
        console.error(error);
      });
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
    <>
      <div
        className="home-page"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${boardback})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Header_b />
        <Container style={{ flex: '1' }}>
          <div className="board-container" style={{ marginTop: '100px', padding: '20px' }}>
            {board && board.map((post, index) => (
              <Card key={index} className="mb-3" style={{ backgroundColor: '#ffffff' }}>
                <Card.Body>
                  <Card.Title>{post && post.title}</Card.Title>
                  {post && post.content && post.content.length > 50 && !post.expanded ? (
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
            <div className="d-flex justify-content-center">
              <Pagination>
                {Array.from({ length: 10 }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index === currentPage}
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
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

    </>
  );
}

function MyMountain() {

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reviewlist, setData] = useState(null);
  const [mountainname, setmountainname] = useState({});
  const [mountainday, setmountainday] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    try {
      axios.get("/api/posts/user/유저id");
      // setData(response.reviewlist);
    } catch (e) {
      console.log(e);

    }
  };

  useEffect(() => {
    const name = {
      name1: '한라산',
      name2: '설악산',
      name3: '지리산',
      name4: '북한산'
    };
    setmountainname(name);
  }, []);

  useEffect(() => {
    const date = {
      date1: '2023.03.01',
      date2: '2023.03.08',
      date3: '2023.03.15',
      date4: '2023.03.22'
    };
    setmountainday(date);
  }, []);

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
    <>
      <Header />
      <div className="Mountainlist">
        <div className="wrap">
          <div className="header"></div>
          <div className="wrap-inner">
            {/*상단 내정보 영역*/}
            <div className="member-wrap inner">
              <div className="member-img">
                <img src={member} alt="member_img" />
              </div>
              <p className="member-name">이용자</p>
              <p className="member-level">
                평점 <span>99.99</span>
              </p>
            </div>
            {/*하단 콘텐츠 영역*/}
            <div className="content-wrap inner">
              {/*정복한 산 목록*/}
              <div className="mountain">
                <p className="content-title">
                  <span>정복한 산 목록</span>
                </p>
                <table className="list-table">
                  <tr>
                    <td className="list-data">
                      <p>{mountainname.name1}</p>
                    </td>
                    <td className="list-date">{mountainday.date1}</td>
                  </tr>
                  <tr>
                    <td className="list-data">
                      <p>{mountainname.name2}</p>
                    </td>
                    <td className="list-date">{mountainday.date2}</td>
                  </tr>
                  <tr>
                    <td className="list-data">
                      <p>{mountainname.name3}</p>
                    </td>
                    <td className="list-date">{mountainday.date3}</td>
                  </tr>
                  <tr>
                    <td className="list-data">
                      <p>{mountainname.name4}</p>
                    </td>
                    <td className="list-date">{mountainday.date4}</td>
                  </tr>
                </table>
              </div>
              {/*작성한 리뷰*/}
              <div className="review">
                <p className="content-title">
                  <span>작성한 리뷰</span>
                  <a className="more-btn" href="#none">
                    View more
                  </a>
                </p>
                <table className="list-table">
                  <tr>
                    <td className="list-data">
                      <p>
                        생에 첫 한라산 등반! 너무 힘들었지만 끝까지 포기하지않았다
                      </p>
                    </td>
                    <td className="list-date">2022.04.13</td>
                  </tr>
                  <tr>
                    <td className="list-data">
                      <p>
                        친구들과 설악산 등반을 완료했다
                      </p>
                    </td>
                    <td className="list-date">2022.04.13</td>
                  </tr>
                  <tr>
                    <td className="list-data">
                      <p>처음 등산을 시작할땐 산중턱까지도 가기 힘들었지만 결국 해냈다.</p>
                    </td>
                    <td className="list-date">2022.04.13</td>
                  </tr>
                  <tr>
                    <td className="list-data">
                      <p>등산을 셀프 고문이라고 생각했는데 뿌듯하고 즐거웠다</p>
                    </td>
                    <td className="list-date">2022.04.13</td>
                  </tr>
                  <tr>
                    <td className="list-data">
                      <p>기분이 좋았다</p>
                    </td>
                    <td className="list-date">2022.04.13</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



const Wrapper = styled.div`
display: grid;
grid-template-columns: fr;
grid-template-rows: auto;
gap: 20px;
margin: auto;
margin-top: 180px;
max-width: 1500px;
padding: 50px;
border: 1px solid #ccc;
border-radius: 4px;
background-color: #fff;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

@media (min-width: 768px) {
  grid-template-columns: 2fr 4fr;
  grid-template-rows: 1fr;
}
`;

const Divider = styled.div`
  height: 100%;
  border-left: 1px solid #ccc;
`;

const Title = styled.h1`
  font-size: 34px;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-right: 25px;
  margin-top: 5px;

`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  font-weight: bold;

`;

const UserInfoTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  
`;

const UserInfo = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
  color: #666;
  font-weight: bold;
  margin-right: 100px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 25px;
  font-weight: bold;

`;

const ReviewIcon = styled.a`
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  text-align: center;
  &:hover {
    background-color: #f0f0f0;
  }
  font-weight: bold;

`;

const EditButton = styled.button`
  background-color: #8fbc8f;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  &:hover {
    background-color: #90ee90;
    cursor: pointer;
  }
  font-weight: bold;

`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 25px;
  font-weight: bold;

`;

const AvatarTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;

`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

function Mypage() {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const user = {
      name: 'auspicious',
      email: 'hong@example.com',
      phone: '010-9876-5432',
      avatar: 'https://placehold.it/200x200',
    };
    setUserInfo(user);
  }, []);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (
    <>
    <div
        style={{
          backgroundImage: `url(${Mypageimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '120vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      <Header />
      <Wrapper>
        <Title></Title>
        <UserInfoWrapper>
          <UserInfoTitle>UserProfile</UserInfoTitle>
          {isEditing ? (
            <>
              <UserInfo>
                <label htmlFor="name">name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                />
              </UserInfo>
              <UserInfo>
                <label htmlFor="email">e-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </UserInfo>
              <UserInfo>
                <label htmlFor="phone">phonenumber:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                />
              </UserInfo>
              <EditButton onClick={handleSave}>save</EditButton>
              <EditButton onClick={handleCancel}>cancel</EditButton>
            </>
          ) : (
            <>
              <UserInfo>
                <label>name:</label>
                <span>{userInfo.name}</span>
              </UserInfo>
              <UserInfo>
                <label>e-mail:</label>
                <span>{userInfo.email}</span>
              </UserInfo>
              <UserInfo>
                <label>phonenumber:</label>
                <span>{userInfo.phone}</span>
              </UserInfo>
              <EditButton onClick={handleEdit}>Edit</EditButton>
            </>
          )}
        </UserInfoWrapper>
        <Divider />
        <LinkWrapper>
          <UserInfoTitle>another</UserInfoTitle>
          {/* 리뷰게시판 -> 로그인 회원 정보 게시판 변경 */}
          <ReviewIcon href="/boardList">review board</ReviewIcon>  
          <ReviewIcon href="/MyMountain">information</ReviewIcon>
          <ReviewIcon href="/chatmountain">ChatMountain</ReviewIcon>
        </LinkWrapper>
        <Divider />

      </Wrapper>
    </div>
    </>
  );
}

const openai = require('openai-api');



const openaiInstance = new OpenAI('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');
const Chatmountain = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };
/*
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://ec2-3-37-214-183.ap-northeast-2.compute.amazonaws.com:8080/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: encodeURIComponent(question),
        }),
      });

      const data = await response.json();
      setAnswer(data.response);
    } catch (error) {
      console.error(error);
    }
  };
*/
const handleSubmit = (event) => {
  event.preventDefault();

  // Sample questions and answers
  const sampleQuestions = [
    'What is the weather like today?',
    'How tall is Mount Everest?',
    'What is the capital of France?',
  ];
  const sampleAnswers = [
    'The weather today is sunny with a temperature of 25 degrees Celsius.',
    'The weather today is sunny with a temperature of 23 degrees Celsius.',
    'The weather today is sunny with a temperature of 19 degrees Celsius.',
    'The weather today is sunny with a temperature of 13 degrees Celsius.',

  ];

  const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
  setAnswer(sampleAnswers[randomIndex]);
};
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
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Chatmountain 컴포넌트가 사라지도록 구현
    const chatmountain = document.querySelector('.chat-container');
    chatmountain.style.display = isMenuOpen ? 'block' : 'none';
  };


  return (
    <div
      className="home-page"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${chatpage})`, // Replace 'mountainBackground' with the URL of the mountain image
        backgroundSize: 'cover',
      }}
    >
      <div className="home-page" style={{ backgroundColor: 'transparent', padding: '20px' }}>
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
              <li style={{ display: 'inline-block' }}><a href="/Mypage" style={{ textDecoration: 'none', color: 'black' }}>Mountain</a></li>
            </ul>
          </div>
        )}

        <div className="chat-container" style={{ marginTop: '20px', backgroundColor: 'transparent', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '500px', margin: '0 auto' }}>
          <div className="chat-header" style={{color:'white',fontSize:'20px', padding: '10px', borderRadius: '5px', outline: 'none', width: '100%' }}>
            <p>ChatMountain</p>
          </div>
          <div className="intro-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={question}
                onChange={handleInputChange}
                placeholder="Enter your question"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', width: '100%' }}
              />
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer' }}>Ask a Question</button>
            </form>
            {answer && (
              <div className="answer-container" style={{color:'white',fontSize:'20px', padding: '10px', borderRadius: '5px',  outline: 'none', width: '100%' }}>
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Kakao />} />
        <Route path="/mountain_info" element={<Mountain_info />} />
        <Route path="/boardList" element={<BoardList />} />  {/*게시판*/}
        <Route path="/MyMountain" element={<MyMountain />} />  {/*내 등산기록 페이지*/}
        <Route path="/Mypage" element={<Mypage />} />  {/*사용자 정보 출력 페이지*/}
        <Route path="/chatMountain" element={<Chatmountain />} />  {/*chatgpt 활용 산 정보*/}

      </Routes>
    </Router>
  );
}

export default App;