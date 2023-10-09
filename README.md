# MountainView
등산객들을 위한 등산 도우미 웹서비스

### 팀 구성
프론트엔드 2명
백엔드 1명(본인)
인공지능 1명

### DB 스키마
![image](https://github.com/hyeok-kong/MountainView/assets/70522355/3966370f-cd2e-41c0-9e1c-efdd2484f622)

### 서비스 화면 예시
![image](https://github.com/hyeok-kong/MountainView/assets/70522355/189d13a4-758f-4283-961b-d655e149d034)


### 서비스 환경
AWS EC2 + RDS 이용하여 개발서버 구성
![image](https://github.com/hyeok-kong/MountainView/assets/70522355/58134964-3bc7-4c03-85bf-af1de0836e52)

### 서비스 구성
SpringBoot + JPA 로 백엔드 구성

Spring Security, OAuth2 + JWT 로 인증 구현

![image](https://github.com/hyeok-kong/MountainView/assets/70522355/dc7a0676-7f24-4622-bee8-a02e4515823c)


기상청 단기예보 API 사용

![image](https://github.com/hyeok-kong/MountainView/assets/70522355/328c08dc-f63a-4a43-9f77-da87252d1aa3)


## 발생한 문제
1. 좌표계 변환 문제
   산림청 데이터의 좌표계와 카카오맵에 마커를 찍기 위한 좌표계가 일치하지 않는 문제가 발생
   해당 좌표계를 변환하는 공식을 찾지 못해 통계청의 좌표 변환 API 사용 ==> 크리티컬한 속도 저하 발생 (1초에 약 4건의 좌표 변환, 산 및 등산로와 스팟 개수는 수십만개임)
   API를 통하지 않고, 직접 변환 로직 구현 필요

2. 인증, 인가를 제대로 사용하지 못함
   JWT 발급까진 완료했지만, 프론트에서 JWT 처리 작업 밀림에 따른 인가 프로세스 개발 중지
   로그인 불가로 인한 모든 API를 Permit All, 추가 개발 안됨(추후 개발 필요)

3. 카카오맵에 마커 표시 성능문제
   카카오맵에 전국 모든 산의 마커를 한번에 찍으려는 시도로 인한 성능상 이슈 발생(렉)
   좌상단, 우하단 좌표를 입력받음으로써 해당 위치에 존재하는 산의 위치 정보만 보내도록 API 개선 필요

4. MariaDB의 Point형으로 저장 실패 ==> BLOB 형식으로 좌표 저장
   이에 따른 좌표 계산 불가 ==> 가까운 산 목록 등 추가적인 서비스 개발 불가
   좌표형으로 변환 필요 및 좌표 계산 문제에 대한 고려 필요
