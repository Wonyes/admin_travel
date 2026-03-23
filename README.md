# ✈️ Travelidge

> **Travelidge**는 소상공인 및 여행업체를 위한 **온라인 예약/결제 통합 관리 시스템**입니다.  
> 자체 플랫폼과 **네이버 스마트스토어**를 연동하여 상품 등록부터 예약, 결제, 주문 관리까지 한 번에 처리할 수 있도록 지원합니다.

- 소상공인 및 업체는 **쉽고 빠르게 상품을 등록**할 수 있습니다.
- 고객은 **간편하게 예약 및 결제**를 통해 원활한 사용자 경험을 제공합니다.

---

## 👨‍💻 개발 기간 및 인원

- **기간**: 2025.02 ~ 2025.05
- **구성**: 2인으로 기획된 프로젝트이며 기획 **공동**, 디자인 및 프론트엔드/CI·CD AWS 배포는 **프론트**가 전담하였습니다.

<div align="center">

| <img src="https://avatars.githubusercontent.com/u/186001551?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/92082963?v=4" width="150" height="150"/> |
| :---: | :---: |
| **BACK-END**<br/>[@silver-sunny](https://github.com/silver-sunny) | **FRONT-END / DESIGN / DevOps**<br/>[@Wonyes](https://github.com/Wonyes) |

</div>

---

## 🌐 배포 링크

| **페이지** | **바로가기** |
| :--- | :--- |
| **사용자 페이지** | [🔗 사용자페이지 바로가기](https://travelidge.shop) |
| **관리자 페이지** | [🔗 관리자페이지 바로가기](https://admin.travelidge.shop) |
| **API 명세서** | [🔗 API명세서 바로가기](https://api.travelidge.shop/swagger-ui) |

---

## 🔧 기술적 도전과 핵심 아키텍처 (Engineering Decisions)

### 1️⃣ 디자인 시스템 기반의 커스텀 UI Kit 및 Hooks 추상화 (개발 생산성 60% 향상)
<details open>
<summary><b>전역 타이포그래피 토큰화 및 컴포넌트 자동완성을 통한 DX(Developer Experience) 극대화</b></summary>
<br />

**문제 상황:**
방대한 어드민 페이지 특성상 반복되는 텍스트, 인풋, 버튼 UI가 매우 많았습니다. 매번 컴포넌트마다 CSS를 작성하면 코드량이 비대해지고, 휴먼 에러로 인해 전체 시스템의 디자인 일관성이 무너지는 문제가 발생했습니다.

**해결 방안:**
- **디자인 토큰(Design Token) 시스템 구축:** CSS 변수와 맵핑된 전역 타이포그래피 객체(`textStyles`)를 구축하여 폰트, 크기, 색상, 행간을 중앙 통제했습니다.
- **다형성 컴포넌트(`<Text>`) 개발:** TypeScript를 활용해 `$class="subTitle"`과 같이 프롭스를 주입하면 IDE에서 **자동 완성(Auto-complete)**이 지원되도록 커스텀 팩토리 함수(`createTextBox`)를 설계했습니다.
- **로직/UI 분리:** `useQueryString`, `useCalendarLogic`, `useOverlay` 등 수십 개의 커스텀 훅을 개발해 UI 컴포넌트에서 비즈니스 로직을 완벽히 분리해 냈습니다.

**결과:** 일관된 디자인 시스템 적용 및 중복 코드 제거를 통해 **전체 프론트엔드 개발 속도가 약 60% 이상 향상**되는 압도적인 효율을 이끌어냈습니다.
</details>

### 2️⃣ 방대한 데이터 테이블의 UX 최적화 (반반 스크롤 테이블)
<details open>
<summary><b>핵심 데이터를 고정하고 부가 정보를 스크롤하는 공통 UI 시스템 구축</b></summary>
<br />

**문제 상황:**
어드민 대시보드 특성상 최소 10개 이상의 데이터 필드를 화면에 렌더링해야 했습니다. 노트북 해상도에서 표가 찌그러지거나 핵심 정보가 밀려나는 UX 저하가 발생했습니다.

**해결 방안 (`<ScrollTable>` 컴포넌트화):**
중요 정보(처리 버튼, 문의 요약 등)는 좌측에 **고정(Fixed)**하고, 부가 정보(날짜, 상태 등)는 우측에서 **가로 스크롤(Scroll)**되도록 커스텀 UI 컴포넌트를 설계했습니다. API 데이터를 `map`으로 주입만 하면 즉시 반응형 테이블이 완성되도록 추상화하여 공통 디자인 시스템으로 구축했습니다.
</details>

### 3️⃣ API 모듈, TanStack Query 및 글로벌 에러 핸들링 추상화
<details open>
<summary><b>선언적 프로그래밍을 통한 로직 간소화 및 JWT 인증/예외 처리</b></summary>
<br />

**문제 상황:**
Axios 호출부의 반복 코드와 컴포넌트마다 오버레이(Modal/Alert) 및 Form 에러 상태를 개별적으로 관리해야 하는 불편함이 컸습니다. 또한 비동기 통신 상태와 UI 피드백 로직이 뷰(View) 단에 파편화되어 있었습니다.

**해결 방안:**
1. **API 메서드 래핑 및 JWT 인증:** `Axios Interceptor`를 활용해 401(만료) 시 토큰을 갱신 및 원래 요청을 재시도하며, 403(권한 없음) 시 홈으로 리다이렉트하는 통신 레이어를 구축했습니다. HTTP 메서드는 캡슐화(`Post`, `Delete` 등)하여 재사용성을 높였습니다.
2. **TanStack Query 연동 (핵심):** 캡슐화된 통신 모듈을 `TanStack Query`의 `useMutation`, `useQuery`와 결합했습니다. 데이터 패칭과 서버 상태 관리를 위임하고, `onSuccess`와 `onError` 라이프사이클 훅 내부에서 전역 피드백 UI를 호출하도록 비즈니스 로직을 하나로 묶어냈습니다.
3. **글로벌 오버레이 시스템:** TanStack Query의 결과에 따라, 함수 호출(`openAlert()`)만으로 어디서든 UI 피드백을 발생시킬 수 있도록 중앙 제어 시스템을 연동했습니다.
4. **Zustand 연동 글로벌 에러 메시지:** 상태 관리 스토어(`useErrorStore`)와 연동된 `<ErrorMessage />` 공통 컴포넌트를 설계하여 폼 유효성 검사 및 에러 렌더링 로직을 완벽히 추상화했습니다.
</details>

### 4️⃣ UI/UX 디테일 및 CSS 트러블슈팅 (캘린더 grouped 버튼)
<details open>
<summary><b>Localized 텍스트 너비 차이와 테두리 겹침으로 인한 레이아웃 깨짐 해결</b></summary>
<br />

**문제 상황:**
어드민 캘린더의 기간 조회 그룹 버튼 스타일링 과정에서 특정 버튼('오늘')이 active 상태일 때 글자 사이로 배경 테두리가 뚫고 지나가 가독성을 심각하게 해치는 버그가 발생했습니다.


**해결 방안:**
'오늘'과 '일주일' 등 텍스트 길이에 따른 너비 차이와 grouped UI의 테두리 중첩 규칙이 충돌한 것을 파악하고, Z-index 조정 및 테두리 공유 규칙을 픽셀 단위로 정밀하게 디버깅하여 텍스트 길이에 상관없이 active 테두리가 완벽하게 렌더링되도록 수정했습니다.

</details>

### 5️⃣ 인프라 마이그레이션 및 배포 최적화 (DevOps)
<details open>
<summary><b>빌드 병목 현상 해결을 위한 AWS EC2 및 Nginx 직접 구축</b></summary>
<br />

**문제 상황:**
초기에는 Jenkins와 Docker 기반의 CI/CD 파이프라인을 구상했으나, 프론트엔드 환경에서 빌드 및 배포 속도가 너무 느려져 개발 사이클에 심각한 병목 현상이 발생했습니다.

**해결 방안:**
배포 환경을 근본적으로 개선하기 위해 **AWS EC2 인스턴스로의 마이그레이션**을 결정했습니다. 기술 블로그와 공식 문서를 탐독하며 클라우드 환경을 독학했고, `Nginx`를 직접 설치하여 웹 서버 및 리버스 프록시로 구성함으로써 프론트엔드 정적 파일 서빙과 API 라우팅을 안정화했습니다.

**결과:** 단순한 UI/UX 개발을 넘어, 프론트엔드 배포 환경의 문제를 주도적으로 파악하고 인프라(AWS/Nginx) 설정까지 직접 해결하는 **풀사이클(Full-cycle) 프론트엔드 개발 경험**을 확보할 수 있었습니다.
</details>

<br />

---

## 🚀 주요 기능

### ✅ 공통 및 아키텍처
| **기능** | **설명** |
| :--- | :--- |
| **🎨 커스텀 디자인 시스템** | 타이포그래피 토큰화 및 `<Text>` 다형성 컴포넌트 구축으로 자동완성 지원 및 일관성 유지. |
| **📅 모듈화된 입력 컴포넌트** | 캘린더, 인풋 등을 단일 컴포넌트에서 분기 처리하여 렌더링 최적화. |
| **💬 중앙 제어 오버레이** | `openAlert`, `openConfirm` 등 함수 호출만으로 동작하는 글로벌 Modal/Toast 시스템. |
| **🚨 글로벌 에러 핸들링** | `useErrorStore`와 연동된 `<ErrorMessage />`로 전역적인 폼 검증 및 에러 추상화. |
| **🔢 URL 연동 페이징/필터** | 페이징 및 검색 필터를 URL Query와 동기화하여 새로고침 시에도 상태 완벽 유지. |
| **🧩 동적 레이아웃 시스템** | `ScrollTable`, 리스트, 드롭다운 등을 컴포넌트화해 API 데이터(`map`) 주입 시 자동 동작. |

### 📦 데이터 및 상태 관리
| **기능** | **설명** |
| :--- | :--- |
| **🗂️ 관심사 분리 (상태 관리)** | 서버 데이터는 `React Query`로, 클라이언트 뷰 상태는 `Zustand`로 분리하여 효율적 관리. |
| **🔄 비동기 통신 제어** | 공통 API 래핑 모듈과 React Query를 활용해 데이터 패칭, 캐싱, 리페치 로직 추상화. |
| **🗑️ 낙관적 동기화 업데이트** | 리뷰 등 데이터 삭제 시, 서버 통신 완료 전 UI를 즉시 반영하여 지연 없는 사용자 경험 제공. |

### 👤 사용자 기능 (B2C)
| **기능** | **설명** |
| :--- | :--- |
| **🔑 소셜 회원가입 및 로그인** | OAuth2를 활용한 소셜 로그인, 회원가입 및 프로필 정보 수정 기능 제공 |
| **💳 상품 구매 및 결제 연동** | **Toss Payments API**를 연동하여 장바구니부터 간편 결제까지의 파이프라인 구축 |
| **📦 주문 라이프사이클 관리** | 상품 주문 ➔ 결제 ➔ 구매 확정 ➔ 주문 취소/반품까지의 전 과정 제어 |
| **⭐ 리뷰 및 커뮤니티** | 리뷰 작성(이미지 첨부), 별점 평가, 썸네일 지원 및 부적절 리뷰 신고 시스템 |
| **🔍 상품 검색 및 필터링** | 실시간 인기 검색어 출력, 키워드 검색 및 관심 상품(즐겨찾기) 기능 제공 |
| **💬 실시간 고객 소통** | 상품 상세 페이지 직접 문의 및 마이페이지 1:1 문의 내역 관리 시스템 |

<br />

---

## 🖥️ 사용자 및 관리자 서비스 UI (Gallery)

<details>
<summary style="font-size: 1.2rem; font-weight: bold; cursor: pointer;">🛍️ 메인, 탐색 및 상세 페이지 (클릭)</summary>
<br />
<p align="center">
  <img src="https://github.com/user-attachments/assets/bcafb10c-45ca-4775-9b05-e1d66f0fe612" width="32%" />
  <img src="https://github.com/user-attachments/assets/845ae749-589e-4c7c-9e79-0dc27d72f697" width="32%" />
  <img src="https://github.com/user-attachments/assets/20836e4b-1e11-408c-8544-c9a991ec5d9c" width="32%" />
  <br /><sub><i>메인 추천/베스트 상품 | 검색 및 인기검색어 | 관심 상품</i></sub>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/a991e4ef-a70e-4eca-bcb3-146e74ec28ba" width="32%" />
  <img src="https://github.com/user-attachments/assets/2b690713-1e26-4efe-b1e1-968f875ffacb" width="32%" />
  <img src="https://github.com/user-attachments/assets/4db6baff-3a6f-4d2a-ac5a-ab015905a0a9" width="32%" />
  <br /><sub><i>상품 상세 페이지 | ↳ 상세 페이지 문의 | ↳ 상세 페이지 리뷰</i></sub>
</p>
</details>

<details>
<summary style="font-size: 1.2rem; font-weight: bold; cursor: pointer;">💳 장바구니 및 결제 연동 (클릭)</summary>
<br />
<p align="center">
  <img src="https://github.com/user-attachments/assets/479b7b48-e7c2-4105-9643-b099f26e38d9" width="32%" />
  <img src="https://github.com/user-attachments/assets/6a8b4ca6-8437-4df9-b260-3068a1fa13a5" width="32%" />
  <img src="https://github.com/user-attachments/assets/8bfe97d7-d8ae-4366-b1ff-05c8e5beff9e" width="32%" />
  <br /><sub><i>장바구니 | 상품 결제 페이지 | ↳ 토스페이먼츠 연동 결제</i></sub>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/13e22342-d1f9-469d-9ab0-107569dc6fbc" width="32%" />
  <br /><sub><i>↳ 결제 완료 페이지</i></sub>
</p>
</details>

<details>
<summary style="font-size: 1.2rem; font-weight: bold; cursor: pointer;">👤 마이페이지 및 정보수정 (클릭)</summary>
<br />
<p align="center">
  <img src="https://github.com/user-attachments/assets/c3aba5e0-ca40-409d-b2ea-e647f53edbf5" width="48%" />
  <img src="https://github.com/user-attachments/assets/42ee9ea6-ced2-4eee-8a6a-7844866923ce" width="48%" />
  <br /><sub><i>마이 페이지 | 회원정보 수정 홈</i></sub>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/9a55fe97-3884-4b0e-81a4-52ac5d0af37d" width="32%" />
  <img src="https://github.com/user-attachments/assets/4776becf-5b36-47e2-b181-876ba7f74c0a" width="32%" />
  <img src="https://github.com/user-attachments/assets/955fa59c-da06-4932-9388-be722efe249f" width="32%" />
  <br /><sub><i>↳ 이름 변경 | ↳ 닉네임 변경 | ↳ 전화번호 변경</i></sub>
</p>
</details>

<details>
<summary style="font-size: 1.2rem; font-weight: bold; cursor: pointer;">🔄 구매/취소 내역 및 리뷰 작성 (클릭)</summary>
<br />
<p align="center">
  <img src="https://github.com/user-attachments/assets/0ba19cab-3066-4ec8-aef8-05dd51724abf" width="32%" />
  <img src="https://github.com/user-attachments/assets/e20182f3-bd98-4444-a736-3c7028e440b4" width="32%" />
  <img src="https://github.com/user-attachments/assets/2fab49cb-4375-4cd7-96f8-0fb61c689b75" width="32%" />
  <br /><sub><i>구매내역 | ↳ 구매상세내역 | ↳ 구매취소 모달</i></sub>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/f1000d47-b522-497c-bac9-bd791ffb46c4" width="48%" />
  <img src="https://github.com/user-attachments/assets/ab748537-0f89-4803-9a33-7566f003ea44" width="48%" />
  <br /><sub><i>취소/반품 완료내역 | ↳ 환불상세내역</i></sub>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/75074a55-b3ec-4524-bd8d-59f2d865dc77" width="32%" />
  <img src="https://github.com/user-attachments/assets/35606ac3-7d94-4fd8-9ba1-4e54e474ac85" width="32%" />
  <img src="https://github.com/user-attachments/assets/8987b8d3-4028-4f88-9e0b-ae7dfab014ed" width="32%" />
  <br /><sub><i>후기 리스트 | ↳ 후기 작성 페이지 | ↳ 후기 작성 완료</i></sub>
</p>
</details>

<details>
<summary style="font-size: 1.2rem; font-weight: bold; cursor: pointer; color: #666666;">⚙️ [Admin] 관리자 시스템 스크린샷 갤러리 (클릭)</summary>
<br />
<table width="100%">
  <tr>
    <td width="50%"><img src="https://github.com/user-attachments/assets/0f622164-4072-4b60-bead-8f6ce69c082a" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/ac39a114-5bc2-4397-8c9a-7205f6427c70" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><sub><i>실시간 현황 대시보드 및 티켓 관리 모니터링</i></sub></td>
  </tr>
</table>
<table width="100%">
  <tr>
    <td width="33%"><img src="https://github.com/user-attachments/assets/2c7f5e26-d72d-400b-bd5a-b64c1d34e34b" /></td>
    <td width="33%"><img src="https://github.com/user-attachments/assets/c77b8c8c-a140-4811-8bd8-80d0634399e3" /></td>
    <td width="33%"><img src="https://github.com/user-attachments/assets/55a75221-71e0-44c0-8692-9c3d9428143d" /></td>
  </tr>
  <tr>
    <td colspan="3" align="center"><sub><i>상품 등록 ➔ 네이버 연동 옵션 제어 ➔ 취소/환불 클레임 파이프라인</i></sub></td>
  </tr>
</table>
<table width="100%">
  <tr>
    <td width="50%"><img src="https://github.com/user-attachments/assets/497c82f5-dd3c-4f20-8d8d-ea59708f5524" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/20334c37-be73-49fb-b7d3-f5266559a290" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><sub><i>어드민 계정 권한 등록 ➔ 1:1 고객 문의 답변 시스템</i></sub></td>
  </tr>
</table>
</details>

<br />

---

## 🛠 기술 스택

### 🌐 Front-end
| **라이브러리** | **설명** | **버전** |
| :--- | :--- | :--- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) | React를 사용하여 동적인 UI를 구현하고, Vite로 빠르고 효율적인 개발 환경을 제공합니다. | 18.2.0 |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Vite를 사용하여 빠른 빌드와 핫 리로딩을 통해 개발 생산성을 극대화합니다. | 5.3.1 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | TypeScript로 타입 안전성을 강화하여, 코드 작성 시 런타임 오류를 사전에 예방합니다. | 5.7 |
| ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | React Router를 사용하여 SPA 환경에서의 중첩 라우팅 및 URL 파라미터 제어를 수행합니다. | 7.2.0 |
| ![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | 서버 데이터를 캐싱하고, 백그라운드 리페치를 통해 API 통신을 효율적으로 관리합니다. | 5.74.4 |
| ![Axios](https://img.shields.io/badge/Axios-5A29E3?style=for-the-badge&logo=axios&logoColor=white) | Axios 인터셉터로 인증 토큰을 관리하고 전역 API 래핑 모듈을 구축했습니다. | 1.0.2 |
| ![Zustand](https://img.shields.io/badge/Zustand-FF0000?style=for-the-badge) | Zustand로 보일러플레이트를 최소화하여 클라이언트 전역 상태를 가볍게 제어합니다. | 5.0.4 |
| ![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) | CSS-in-JS로 스타일을 캡슐화하고 재사용 가능한 디자인 시스템을 구축했습니다. | 6.1.15 |

### ⚙ CI/CD & Infra
| **기술** | **설명** |
| :--- | :--- |
| ![AWS](https://img.shields.io/badge/Aws-232F3E?style=for-the-badge&logo=aws&logoColor=white) | AWS EC2 인스턴스를 활용하여 빠르고 안정적인 클라우드 배포 서버를 운영합니다. |
| ![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) | Nginx를 통한 웹 서버 및 리버스 프록시 적용으로 트래픽 라우팅 처리를 수행합니다. |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) | Docker를 활용해 애플리케이션을 컨테이너화하여 초기 환경 구축에 활용했습니다. |
| ![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white) | Jenkins를 통한 CI/CD 파이프라인 구축을 시도하여 자동화 개념을 확립했습니다. |

<br />

---

## 🏗 시스템 & DB 아키텍처

<div align="center">
  <table width="100%">
    <tr>
      <td width="50%" align="center"><b>Infrastructure Architecture</b></td>
      <td width="50%" align="center"><b><a href="https://www.erdcloud.com/d/mYpMAqACf4JSA5JHM">Database ERD (Cloud에서 보기)</a></b></td>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/user-attachments/assets/34de2a30-2678-474e-98a8-873e7454424a" width="95%" alt="Architecture" /></td>
      <td align="center"><a href="https://www.erdcloud.com/d/mYpMAqACf4JSA5JHM"><img src="https://github.com/user-attachments/assets/b95190c4-046e-4f08-809c-e1ff264c6810" width="95%" alt="ERD" /></a></td>
    </tr>
  </table>
</div>

<br />

---

## 🌐 Front-end 폴더 구조
📦`src`

| **폴더/파일** | **설명** |
| :--- | :--- |
| 📂`api` | API 호출, 인터셉터, react-query 관련 훅 및 전역 설정 관리 |
| 📂`assets` | 시스템 내부 이미지, 아이콘 및 전역 폰트/스타일 등 정적 자원 |
| 📂`components` | 공통 UI(모달, 테이블, 입력폼) 및 특정 도메인별 기능 컴포넌트 분리 |
| 📂`constant` | 시스템 전역 상수, 날짜 포맷팅 기준 등 불변 데이터 관리 |
| 📂`hook` | 캘린더 연산, 오버레이 제어, 페이징/드래그 등 복잡한 뷰 로직 추상화 커스텀 훅 |
| 📂`pages` | 라우팅 기반의 독립적 View 컨테이너(Page 단위) 컴포넌트 |
| 📂`stores` | Zustand를 활용한 클라이언트 전역 상태(인증, UI 테마 등) 저장소 |
| 📂`types` | 엄격한 타입 가드를 위한 프론트엔드 전반의 TypeScript 인터페이스 정의 |
| 📂`utils` | 데이터 파싱, 포매터, 유효성 검사 등 범용 헬퍼(유틸리티) 함수 모음 |
