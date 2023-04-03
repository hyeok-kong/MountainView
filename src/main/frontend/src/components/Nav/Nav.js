import "../../App";
import './Nav.css'

function Nav() {
  return (
    <nav class="navbar">
        <div class="navbar__logo">
          <img id="mountainimg" src="mountainviewlogo1.PNG" alt="로고 이미지" />
        </div>
        <ul class="navbar__menu">
            <li><a href="">편의시설</a></li>
            <li><a href="">리뷰</a></li>
            <li><a href="">마이페이지</a></li>
            <li><a href="">로그인</a></li>
        </ul>

        <a href="#" class="navbar__toggleBtn"><i class="fas fa-bars"></i></a>
    </nav>
  )
}

export default Nav;