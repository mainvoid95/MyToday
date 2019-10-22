
# MyToday

일기를 쓰고싶었다. 근데 맨날 까먹는다.

어디서든 일기를 쓸수있게 만들어볼까....? 해서 만들기 시작했습니다.

웹앱으로 개발하고 SPA로 제작해보고 싶었습니다 

프론트는 React를 이용하고

백앤드 서버로 node.js를 사용하기로 했습니다.

개인프로젝트와 졸업작품을 겸하는 프로젝트입니다.


2019년 8월 9일에 시작된 git 저장소입니다.

---

> 구현현 된것

- 로그인 기능 

- 로그인이 세션으로 유지된다

- 비밀번호 단방향 암호화

- 회원가입 기능

- 회원가입시 아이디 중복될 경우 db에 저장되지 않는다

- 일기쓰기 페이지에서 일기를 작성할 수 있다

- 작성한 일기를 한페이지에서 볼 수 있다 (초기 버전)

- 작성한 일기를 최신순으로 하나씩 볼수잇다. 버튼을 눌러 예전 일기를 조회한다.

- 작성한 일기를 제거 할 수 있다.

- 일기를 수정할 수 있다

- 작성된 일기가 없을경우 일기 조회시 작성된 일기가 없다고 알려준다

- 일기가 없는데 조회를 할경우 팝업으로 마지막, 그리고 최근일기인지 알려준다.

- 로그인 실패시 로그인 실패 알림, 비밀번호 틀렸을경우 비밀번호 틀린것 알림

- footer를 제작해 지금 보고있는 github문서로의 링크 제공




> 구현 할것  (하고싶은것...)

+ 회원 탈퇴 기능

+ 회원 정보 수정..?

+ 비밀번호 재설정 기능 (메일로 비밀번호 재설정할수있도록)


---

> 개발 환경

개발 툴 : VScode

백 엔드 : node.js, express

프론트 엔드: html, css, javascript, React

DB: MySQL

---

> 기록

2019.08.09 ~ 2019.09.18

html, css로 달력, todo를 만들고 달력 날자를 누르면 그날자의 일기를 작성할 수 있고 저장하면 DB에 저장되는 방식으로 제작




2019.09.18 ~ 2019.10.01

프론트 엔드를 리엑트로 제작하기위해서 리엑트 학습




2019.10.01 ~ 2019.10.04

프론트를 리엑트로 백앤드를 node.js를 이용하기 위한 개발환경 설정 4일동안 계속해서 찾음




2019.10.04 ~ 2019.10.09

머테리얼 ui기반으로 제작하다가 머테리얼 ui보다 직접 구현하는게 맞다는 판단이 들어 머테리얼 ui제거

회원가입 기능 추가, 아이디 중복 기능 추가, 비밀번호 암호화 기능추가, 세션기능 추가




2019.10.10

비밀번호 암호화후 맞는지 확인하는 부분에서 에러를 발견하여 수정함





2019.10.11

일기 쓰는 프론트엔드 제작, db에 저장하는 기능구현.




2019.10.12

저장된 일기를 db에서 조회해서 출력하는 기능 구현.




2019.10.14

저장된 일기를 최신순부터 조회하도록 수정, 저장된 날자 출력되도록 수정




2019.10.15 

일기 삭제기능 추가




2019.10.16

일기 CRUD 완성




2019.10.17

외부 팝업모듈로 팝업안내 기능 추가 
회원탈퇴기능 팝업으로 이동


2019.10.21

기록된 일기를 1개씩 조회하도록 수정함.

2019.10.22 

safari 브라우저에서 JournalView 페이지가 작동하지 않았던 것 수정