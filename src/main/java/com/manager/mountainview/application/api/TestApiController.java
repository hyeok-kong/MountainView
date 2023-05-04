package com.manager.mountainview.application.api;


import com.manager.mountainview.application.dto.request.*;
import com.manager.mountainview.application.service.*;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.user.Role;
import com.manager.mountainview.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.awt.geom.Point2D;
import java.util.stream.IntStream;


@RequiredArgsConstructor
@RestController
public class TestApiController {
    private final MountainService mountainService;
    private final SpotService spotService;
    private final TrailService trailService;
    private final UserService userService;
    private final PostsService postsService;

    @GetMapping("api/hello")
    public String hello() {
        return "Hello AWS";
    }
    // 테스트용 초기값 설정
//    @PostConstruct
//    public void init() {
//        initMountain();
//        initSpot();
//        initTrail();
//        initUser();
//        initPost();
//    }
//
//    public void initPost() {
//        IntStream.range(1, 100).forEach(i ->
//                postsService.save(new PostsRequestDto("테스트 제목" + i, "테스트 내용" + i, 1L)));
//    }
//
//    public void initUser() {
//        User user1 = User.builder()
//                .email("khb6997@gmail.com")
//                .name("권혁빈")
//                .role(Role.USER)
//                .build();
//
//        User user2 = User.builder()
//                .email("test@test")
//                .name("테스트 유저")
//                .role(Role.USER)
//                .build();
//
//        UserRequestDto dto = UserRequestDto.builder()
//                .user(user1)
//                .build();
//        userService.save(dto);
//
//        dto = UserRequestDto.builder()
//                .user(user2)
//                .build();
//        userService.save(dto);
//    }
//
//    public void initMountain() {
//        Point2D.Double point =  new Point2D.Double(37.888751032177076, 127.72831210287406);
//        mountainService.save(new MountainRequestDto("421102301", "봉의산", point));
//
//        point = new Point2D.Double(37.59423650755463, 126.94391883864768);
//        mountainService.save(new MountainRequestDto("114100801", "북한산", point));
//    }
//
//    public void initSpot() {
//        Mountain mountain1 = mountainService.findByCode("421102301");
//
//        Point2D.Double point1 =  new Point2D.Double(37.888751032177076, 127.72831210287406);
//        spotService.save(new SpotRequestDto("시종점", point1, mountain1));
//
//        Point2D.Double point2 =  new Point2D.Double(37.88764952447844, 127.73231700748643);
//        spotService.save(new SpotRequestDto("시설물(운동기구등)", point2, mountain1));
//
//
//        Mountain mountain2 = mountainService.findByCode("114100801");
//
//        point1 = new Point2D.Double(37.59423650755463, 126.94391883864768);
//        spotService.save(new SpotRequestDto("시멘트계단시작", point1, mountain2));
//
//        point2 = new Point2D.Double(37.594111784629845, 126.94383828850526);
//        spotService.save(new SpotRequestDto("시멘트계단끝", point2, mountain2));
//    }
//
//    public void initTrail() {
//        Point2D.Double start = new Point2D.Double();
//        Point2D.Double end = new Point2D.Double();
//
//        Mountain mountain1 = mountainService.findByCode("421102301");
//        start = new Point2D.Double(37.89070405863443, 127.7319966048185);
//        end = new Point2D.Double(37.892055579981005, 127.73016336723578);
//        TrailRequestDto dto = TrailRequestDto.builder()
//                .name(" ")
//                .length(0.33)
//                .difficult("중간")
//                .uppl(6)
//                .godn(4)
//                .risk(" ")
//                .start(start)
//                .end(end)
//                .mountain(mountain1)
//                .build();
//        trailService.save(dto);
//
//
//        start = new Point2D.Double(37.89070405863443, 127.7319966048185);
//        end = new Point2D.Double(37.892055579981005, 127.73016336723578);
//        dto = TrailRequestDto.builder()
//                .name("소양로1가구간")
//                .length(0.41)
//                .difficult("쉬움")
//                .uppl(7)
//                .godn(5)
//                .risk(" ")
//                .start(start)
//                .end(end)
//                .mountain(mountain1)
//                .build();
//        trailService.save(dto);
//
//
//        Mountain mountain2 = mountainService.findByCode("114100801");
//        start =  new Point2D.Double(37.60255081802761, 126.9466655439718);
//        end =  new Point2D.Double(37.603164455329, 126.9469992007725);
//        dto = TrailRequestDto.builder()
//                .name("서대문구홍은동풍림아이원아파트-홍은동구간")
//                .length(0.08)
//                .difficult("쉬움")
//                .uppl(1)
//                .godn(1)
//                .risk("암벽지역")
//                .start(start)
//                .end(end)
//                .mountain(mountain2)
//                .build();
//        trailService.save(dto);
//
//
//        start = new Point2D.Double(37.60879928458794, 126.94919168613981);
//        end = new Point2D.Double(37.61114410991243, 126.9495150023945);
//        dto = TrailRequestDto.builder()
//                .name("서대문구홍은2동구간")
//                .length(0.29)
//                .difficult("쉬움")
//                .uppl(5)
//                .godn(4)
//                .risk("암벽지역")
//                .start(start)
//                .end(end)
//                .mountain(mountain2)
//                .build();
//        trailService.save(dto);
//    }
}
