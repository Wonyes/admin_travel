
# ✈️ Traveldige


> **Travelidge**는 소상공인 및 여행업체를 위한 **온라인 예약/결제 통합 관리 시스템**입니다.  
> 자체 플랫폼과 **네이버 스마트스토어**를 연동하여 상품 등록부터 예약, 결제, 주문 관리까지 한 번에 처리할 수 있도록 지원합니다.

- 소상공인 및 업체는 **쉽고 빠르게 상품을 등록**할 수 있습니다.
- 고객은 **간편하게 예약 및 결제**를 통해 원활한 사용자 경험을 제공합니다.
---

## 👨‍💻 개발 기간 및 인원

- **기간**: 2025.02 ~ 2025.05
- **구성**: 2인으로 기획된 프로젝트이며 기획 **공동** 디자인 **프론트**가 담당하였습니다.

|<img src="https://avatars.githubusercontent.com/u/186001551?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/92082963?v=4" width="150" height="150"/>|
|:-:|:-:|
|BACK-END<br/>[@silver-sunny](https://github.com/silver-sunny)|FRONT-END / DESIGN<br/>[@Wonyes](https://github.com/Wonyes)|

---

## 🌐 배포 링크
| **페이지**          | **바로가기**                                                                                    
|-------------------------|-----------------------------------------------------------------------------------------------|
| 사용자 페이지 | [사용자페이지 바로가기](https://travelidge.shop) |   
| 관리자 페이지 | [관리자페이지 바로가기](https://admin.travelidge.shop) |
| API 명세 |[API명세서 바로가기](https://api.travelidge.shop/swagger-ui) |
---

## 🌐 Front-end 폴더 구조
📦src

| **폴더/파일**         | **설명**                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| 📂api                 | API 호출, 인터셉터, react-query 관련 훅 및 설정 관리                                         |
| 📂assets              | 이미지, 스타일 등 정적 자원 관리                                                            |
| 📂components          | UI 컴포넌트 모음 (공통, 장바구니, 헤더, 마이페이지, 상품, 검색 등)                            |
| 📂constant            | 상수 및 공통적으로 사용하는 훅 관리                                                         |
| 📂hook                | 캘린더, 오버레이, 페이징, 인풋 등 다양한 커스텀 훅 및 공통 기능 제공                        |
| 📂pages               | 라우팅 및 페이지 단위 컴포넌트 관리                                                         |
| 📂stores              | 전역 상태 관리(예: recoil, zustand 등)                                                      |
| 📂types               | 타입스크립트 타입 정의                                                                      |
| 📂utils               | 유틸리티 함수 모음                                                                          |
| 📜App.tsx             | 앱의 루트 컴포넌트                                                                          |
| 📜index.css           | 전역 스타일 정의                                                                            |
| 📜main.tsx            | 앱 진입점(ReactDOM.render 등)                                                               |
--- 

## 🗂 ERD 구조

- [ERD Cloud에서 보기](https://www.erdcloud.com/d/mYpMAqACf4JSA5JHM )

<br>

![travelidge (5)](https://github.com/user-attachments/assets/b95190c4-046e-4f08-809c-e1ff264c6810)

---

## 🏗 시스템 아키텍처

![시스템 아키텍쳐-페이지-1의 복사본 drawio (3)](https://github.com/user-attachments/assets/34de2a30-2678-474e-98a8-873e7454424a)


---

## 🛠 기술 스택

### 🌐 Front-end

| **라이브러리**          | **설명**                                                                                       | **버전**   |
|-------------------------|-----------------------------------------------------------------------------------------------|------------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) | React를 사용하여 동적인 UI를 구현하고, Vite로 빠르고 효율적인 개발 환경을 제공합니다. | 18.2.0   |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Vite를 사용하여 빠른 빌드와 핫 리로딩을 통해 개발 생산성을 극대화합니다.             | 5.3.1    |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | TypeScript로 타입 안전성을 강화하여, 코드 작성 시 오류를 사전에 예방합니다.         | 5.7      |
| ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | React Router를 사용하여 애플리케이션 내의 페이지 간 네비게이션을 구현합니다.        | 7.2.0    |
| ![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | React Query로 서버 데이터를 캐싱하고, API 통신을 효율적으로 관리합니다.             | 5.74.4   |
| ![Axios](https://img.shields.io/badge/Axios-5A29E3?style=for-the-badge&logo=axios&logoColor=white) | Axios를 사용하여 API 통신을 처리하고, token 검사 및 요청을 관리합니다.              | 1.0.2    |
| ![Zustand](https://img.shields.io/badge/Zustand-FF0000?style=for-the-badge) | Zustand로 애플리케이션의 상태를 효율적으로 관리합니다.                               | 5.0.4    |
| ![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) | Styled-Components를 활용해 컴포넌트 단위로 스타일을 정의하고, 코드의 재사용성을 높였습니다. | 6.1.15   |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-00C853?style=for-the-badge&logo=framer&logoColor=white) | Framer Motion을 활용하여 애니메이션을 추가하여 사용자 경험을 향상시킵니다.          | 12.5.0   |
| ![Swiper](https://img.shields.io/badge/Swiper-6A5DFF?style=for-the-badge&logo=swiper&logoColor=white) | Swiper를 사용하여 다양한 슬라이더 UI를 구현합니다.                                  | 11.2.6   |
| ![Date-Fns](https://img.shields.io/badge/Date--Fns-1D61D1?style=for-the-badge&logo=date-fns&logoColor=white) | Date-Fns를 사용하여 날짜와 시간을 효율적으로 처리합니다.                             | 4.1.0    |

---


### ⚙ CI/CD

| **기술**                | **설명**                                                                                       |
|-------------------------|-----------------------------------------------------------------------------------------------|
| ![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white) | Jenkins를 사용하여 CI/CD 파이프라인을 구축하고, 자동화된 빌드 및 배포를 관리합니다.  |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) | Docker를 활용하여 애플리케이션을 컨테이너화하고, 일관된 실행 환경을 제공합니다.     |
| ![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) | Nginx를 사용하여 리버스 프록시 설정 및 트래픽 분배를 효율적으로 처리합니다.          |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Vite는 프론트엔드 소스코드를 빠르게 빌드하여 정적 파일로 만들어주는 도구로, CI/CD 파이프라인의 빌드 단계에서 사용됩니다. |
| `.env` 환경 변수        | 환경별 API 주소, 비밀키 등 민감한 정보를 안전하게 관리하며, Vite 빌드 시 자동으로 주입되어 환경에 맞는 설정을 제공합니다. |
---
## 🚀 주요 기능

### ✅ **공통**

| **기능**                     | **설명**                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| 📅 캘린더, 인풋, 텍스트 입력창 | 한 컴포넌트에서 종류별로 나눠서 사용 가능. 필요한 경우에만 렌더링되도록 조정됨.                |
| 💬 모달, 알림, 확인창, 토스트  | Modal, Alert, Confirm, Toast 등 다양한 UI 및 기능 요소를 한 컴포넌트에서 관리 가능.           |
| 🎨 공통 스타일 관리           | 자주 사용되는 스타일은 모두 공통으로 분리하여 재사용성을 극대화.                            |
| ❤️‍🔥 좋아요 및 드래그 기능     | 여러 페이지에서 사용되는 좋아요 및 드래그 기능을 함수 형태로 분리하여 편리하게 사용 가능.      |
| 🔢 페이징 처리                | 페이징 로직을 공통으로 처리하여 일관된 사용자 경험 제공.                                    |
| 🧩 레이아웃                   | 테이블, 아이템리스트, 드롭다운, 버튼 등 컴포넌트화를 활용해 API DATA만 입력 시 작동 가능.    |


---

### 📦 **데이터 관리**

| **기능**                     | **설명**                                                                 |
|------------------------------|-------------------------------------------------------------------------|
|🗂️ 상태 관리 |	React Query, Zustand 등으로 서버 데이터와 클라이언트 상태를 효율적으로 관리합니다. |
🔄 비동기 처리 |	React Query를 활용해 데이터 패칭, 캐싱, 리페치 등 비동기 로직을 간편하게 구현합니다. |
🗑️ 삭제/수정 |	리뷰 등 데이터 삭제 시, 서버와 동기화 후 UI를 즉시 반영하여 사용자 경험을 높입니다. |
📝 입력/수정 |	입력 폼, 드래그, 이미지 업로드 등 다양한 입력 UI와 데이터 바인딩을 제공합니다. |
🧩 컴포넌트화 |	반복되는 데이터 UI(리스트, 썸네일 등)는 컴포넌트로 분리해 재사용성과 유지보수를 높였습니다. |

---

### 👤 **사용자 기능**
| **기능**                     | **설명**                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| 🔑 소셜 회원가입 및 로그인       | OAuth2를 활용한 소셜 로그인 및 회원가입 기능 제공                       |
| 📝 회원 정보 수정                | 사용자 프로필 및 계정 정보를 수정할 수 있는 기능                        |
| 🛒 장바구니 관리                 | 상품을 장바구니에 추가, 삭제, 수정할 수 있는 기능                       |
| 💳 상품 구매 및 결제             | Toss API를 연동하여 간편 결제 및 구매 기능 제공                        |
| 📦 주문 관리                    | 주문 취소, 반품 등 주문 상태를 관리할 수 있는 기능                      |
| ⭐ 리뷰 작성 및 신고             | 상품 리뷰 작성, 별점 평가 및 부적절한 리뷰 신고 기능                   |
| ❤️ 관심상품 등록                | 관심상품으로 등록하여 즐겨찾기 기능 제공                               |
| 🗣️ 후기 작성                    | 구매 후 후기 작성 기능                                                 |
| 🔍 상품 검색 및 인기 검색어 출력 | 키워드 기반 검색 및 인기 검색어를 실시간으로 출력                      |
| 💬 상품 문의 및 1:1 문의 작성    | 상품 관련 문의 및 1:1 문의 작성 기능 제공                              |
| 🖼️ 리뷰 이미지 첨부 및 썸네일    | 리뷰 작성 시 이미지 첨부 및 썸네일로 확인 가능                         |
| ⭐ 별점 표시                     | 리뷰에 남긴 별점(평점)을 시각적으로 표시                                |
| 🗑️ 리뷰 삭제                    | 리뷰 삭제 버튼 클릭 시 삭제 확인 및 삭제 기능 제공                      |
| 🕒 리뷰 작성일 표시              | 리뷰 작성 날짜 및 시간 확인 가능                                       |
| 🏷️ 옵션 정보 표시                | 구매한 상품의 옵션 정보(색상, 사이즈 등) 표시                          |
| 🔗 상품 상세 이동                | 썸네일 클릭 시 해당 상품 상세 페이지로 이동                             |
| 🖱️ 드래그 스크롤                | 여러 이미지가 있을 때 마우스 드래그로 가로 스크롤 지원                  |

---

### 🔧 **관리자 기능**
| **기능**                     | **설명**                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| 🔑 관리자 로그인                | 관리자 계정으로 로그인 가능                                             |
| ➕➖ 관리자 계정 생성 및 삭제      | 관리자 계정을 생성하거나 삭제할 수 있는 기능                            |
| 🗂️ 상품 및 카테고리 관리         | 상품 및 카테고리를 추가, 수정, 삭제할 수 있는 기능                      |
| 🤝 네이버 스마트스토어 연동      | 네이버 스마트스토어와 연동하여 상품 및 주문 데이터를 동기화             |
| 📦 주문 상태 관리               | 주문 확인, 취소, 반품 상태를 관리할 수 있는 기능                        |
| 🎫 티켓 발급 및 사용 처리        | 예약 티켓 발급 및 사용 상태를 관리                                     |
| 🚨 리뷰 신고 관리               | 신고된 리뷰를 확인하고 처리할 수 있는 기능                              |
| 💬 상품 문의 및 1:1 문의 응답    | 사용자 문의에 대한 응답 기능                                           |
| 🌟 추천상품 등록 및 삭제         | 추천상품을 등록하거나 삭제할 수 있는 기능                              |
  



