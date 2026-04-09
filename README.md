# ✈️ Travelidge

> **Travelidge**는 소상공인 및 여행업체를 위한 **온라인 예약/결제 통합 관리 시스템**입니다.  
> 자체 플랫폼과 **네이버 스마트스토어**를 연동하여 상품 등록부터 예약, 결제, 주문 관리까지 한 번에 처리할 수 있도록 지원합니다.

- 소상공인 및 업체는 **쉽고 빠르게 상품을 등록**할 수 있습니다.
- 고객은 **간편하게 예약 및 결제**를 통해 원활한 사용자 경험을 제공합니다.

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

## 🖥️ 사용자 및 관리자 서비스 UI (Gallery)
<details open>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">📍 Core Dashboard & Real-time Monitoring</summary>
<br />
<p align="left"><i>실시간 현황 대시보드 및 티켓 사용 처리 핵심 화면</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/0f622164-4072-4b60-bead-8f6ce69c082a" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/ac39a114-5bc2-4397-8c9a-7205f6427c70" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>실시간 현황 대시보드</i></sub></td>
    <td><sub><i>티켓 사용 처리 및 모니터링</i></sub></td>
  </tr>
</table>
</details>
<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">📦 Product & Inventory Management</summary>
<br />
<p align="left"><i>상품 등록, 수정, 삭제 및 통합 리스트 관리 인터페이스입니다.</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/2c7f5e26-d72d-400b-bd5a-b64c1d34e34b" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/bb441e47-1ed0-4add-b8bd-6a7c40569134" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>상품 리스트 및 등록 관리</i></sub></td>
    <td><sub><i>상품 정보 및 재고 수정</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/0f1c5460-51c0-4d96-9402-63e6ca5b7fc8" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/c77b8c8c-a140-4811-8bd8-80d0634399e3" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>네이버 스마트스토어 연동 제어</i></sub></td>
    <td><sub><i>상품 목록 내 상세 제어 인터페이스</i></sub></td>
  </tr>
</table>
</details>
<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">🧾 Order & Claim Pipeline</summary>
<br />
<p align="left"><i>주문 확인부터 취소/환불 요청 승인, 반품 처리까지의 정밀한 클레임 프로세스입니다.</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/640d9f21-4a2e-41bc-816d-a3db372df201" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/55a75221-71e0-44c0-8692-9c3d9428143d" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>전체 주문 및 결제 내역 확인</i></sub></td>
    <td><sub><i>클레임 파이프라인 (취소/환불)</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/dfb64feb-df7c-4669-9c12-90431ad770ba" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/281274b3-c851-486a-83e3-1b6e569f1e1e" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>취소 및 환불 상세 처리 내역</i></sub></td>
    <td><sub><i>클레임 승인 모달 UI</i></sub></td>
  </tr>
  <tr align="center">
    <td colspan="2"><img src="https://github.com/user-attachments/assets/276e3d1e-e239-418c-9f3b-5294cdd24f31" width="49%" /></td>
  </tr>
  <tr align="center">
    <td colspan="2"><sub><i>클레임 거부 모달 UI</i></sub></td>
  </tr>
</table>
</details>
<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">👥 Admin & CS Management</summary>
<br />
<p align="left"><i>어드민 계정 권한 설정 및 1:1 문의 답변 시스템입니다.</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/497c82f5-dd3c-4f20-8d8d-ea59708f5524" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/3d35b9b5-0290-4472-aba9-3c96f8603bfd" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>어드민 계정 권한 리스트</i></sub></td>
    <td><sub><i>신규 어드민 계정 추가 폼</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/2fdb363e-9306-447b-a4b2-56f063a29182" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/20334c37-be73-49fb-b7d3-f5266559a290" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>권한 레벨 상세 설정 모달</i></sub></td>
    <td><sub><i>고객 1:1 문의(CS) 리스트</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/c6ec6979-e933-4469-916f-a340c5b455a3" width="100%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/f76a6268-c309-44e6-b803-ead23329fd4d" width="100%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>문의 상세 내역 및 첨부 이미지</i></sub></td>
    <td><sub><i>문의 답변 작성 인터페이스</i></sub></td>
  </tr>
  <tr align="center">
    <td colspan="2"><img src="https://github.com/user-attachments/assets/04a3bf70-25c9-4cb8-b052-0fe4b3e8a684" width="49%" /></td>
  </tr>
  <tr align="center">
    <td colspan="2"><sub><i>답변 완료 상태 확인</i></sub></td>
  </tr>
</table>
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

### 🔧 관리자 기능
| **기능** | **설명** |
| :--- | :--- |
| **🔑 관리자 로그인** | 관리자 계정으로 로그인 가능 |
| **➕➖ 관리자 계정 생성/삭제** | 관리자 계정을 생성하거나 삭제할 수 있는 기능 |
| **🗂️ 상품 및 카테고리 관리** | 상품 및 카테고리를 추가, 수정, 삭제할 수 있는 기능 |
| **🤝 네이버 스마트스토어 연동** | 네이버 스마트스토어와 연동하여 상품 및 주문 데이터를 동기화 |
| **📦 주문 상태 관리** | 주문 확인, 취소, 반품 상태를 관리할 수 있는 기능 |
| **🎫 티켓 발급 및 사용 처리** | 예약 티켓 발급 및 사용 상태를 관리 |
| **🚨 리뷰 신고 관리** | 신고된 리뷰를 확인하고 처리할 수 있는 기능 |
| **💬 상품 문의 및 1:1 문의 응답** | 사용자 문의에 대한 응답 기능 |
| **🌟 추천상품 등록 및 삭제** | 추천상품을 등록하거나 삭제할 수 있는 기능 |

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
