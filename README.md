# ✈️ Travelidge Integrated Admin Solutions

> **이기종 플랫폼 연동 및 실시간 운영 자동화를 구현한 고도화된 통합 어드민 솔루션**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Completed-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Role-Front--End%20Lead-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/Deployment-AWS%20EC2-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/CI/CD-Jenkins%20&%20Docker-blue?style=flat-square" />
</p>

<br />

## 👨‍💻 Project Overview

> **Travelidge**는 소상공인 및 여행업체를 위한 **온라인 예약/결제 통합 관리 시스템**입니다.  
> 자체 플랫폼과 **네이버 스마트스토어**를 연동하여 상품 등록부터 예약, 결제, 주문 관리까지 한 번에 처리할 수 있도록 지원합니다.

- 소상공인 및 업체는 **쉽고 빠르게 상품을 등록**할 수 있습니다.
- 고객은 **간편하게 예약 및 결제**를 통해 원활한 사용자 경험을 제공받습니다.

### 🗓️ 개발 기간 및 인원
- **기간**: 2025.02 ~ 2025.05
- **구성**: 2인 프로젝트 (기획 공동 참여 / 디자인, 프론트엔드, AWS CI/CD 배포는 프론트엔드가 전담)

<div align="center">

| <img src="https://avatars.githubusercontent.com/u/186001551?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/92082963?v=4" width="120" /> |
| :---: | :---: |
| **BACK-END** | **FRONT-END / DESIGN** |
| [@silver-sunny](https://github.com/silver-sunny) | [@Wonyes](https://github.com/Wonyes) |

</div>

<br />

## 🌐 Quick Links

| 사용자 페이지 | 관리자 페이지 | API 명세서 |
| :---: | :---: | :---: |
| [🔗 사용자페이지 바로가기](https://travelidge.shop) | [🔗 관리자페이지 바로가기](https://admin.travelidge.shop) | [🔗 API 명세서 바로가기](https://api.travelidge.shop/swagger-ui) |

<br />

---

## 🖥️ Operational Workflow Gallery
*각 섹션을 클릭하여 관리자 시스템의 상세 UI 및 흐름을 확인하세요.*

<br />

<div align="center">

### 📍 Core Dashboard & Real-time Monitoring
*실시간 현황 대시보드 및 티켓 사용 처리 핵심 화면*
<p>
  <img src="https://github.com/user-attachments/assets/0f622164-4072-4b60-bead-8f6ce69c082a" width="49%" />
  <img src="https://github.com/user-attachments/assets/ac39a114-5bc2-4397-8c9a-7205f6427c70" width="49%" />
</p>

</div>

<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">📦 Product & Inventory Management (클릭하여 열기)</summary>
<br />
<p align="left"><i>상품 등록, 수정, 삭제 및 통합 리스트 관리 인터페이스입니다.</i></p>

<table width="100%">
  <tr>
    <td width="33%"><img src="https://github.com/user-attachments/assets/2c7f5e26-d72d-400b-bd5a-b64c1d34e34b" /></td>
    <td width="33%"><img src="https://github.com/user-attachments/assets/bb441e47-1ed0-4add-b8bd-6a7c40569134" /></td>
    <td width="33%"><img src="https://github.com/user-attachments/assets/0f1c5460-51c0-4d96-9402-63e6ca5b7fc8" /></td>
  </tr>
  <tr>
    <td colspan="3" align="center">
      <br />
      <img src="https://github.com/user-attachments/assets/c77b8c8c-a140-4811-8bd8-80d0634399e3" width="80%" />
      <br /><sub><b>↳</b> <i>상품 목록 내 상세 수정 및 삭제 인터페이스</i></sub>
    </td>
  </tr>
</table>
</details>

<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">🧾 Order & Claim Pipeline (클릭하여 열기)</summary>
<br />
<p align="left"><i>주문 확인부터 취소/환불 요청 승인, 반품 처리까지의 정밀한 클레임 프로세스입니다.</i></p>

<table width="100%">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/640d9f21-4a2e-41bc-816d-a3db372df201" /></td>
    <td><img src="https://github.com/user-attachments/assets/55a75221-71e0-44c0-8692-9c3d9428143d" /></td>
  </tr>
  <tr>
    <td colspan="2">
      <div align="center">
        <br />
        <img src="https://github.com/user-attachments/assets/dfb64feb-df7c-4669-9c12-90431ad770ba" width="32%" />
        <img src="https://github.com/user-attachments/assets/281274b3-c851-486a-83e3-1b6e569f1e1e" width="32%" />
        <img src="https://github.com/user-attachments/assets/276e3d1e-e239-418c-9f3b-5294cdd24f31" width="32%" />
      </div>
      <p align="center"><sub><b>↳</b> <i>취소·환불 내역과 프로세스별 승인/거부 모달 UI</i></sub></p>
    </td>
  </tr>
</table>
</details>

<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">👥 Admin & CS Management (클릭하여 열기)</summary>
<br />
<p align="left"><i>어드민 계정 권한 설정 및 1:1 문의 답변 시스템입니다.</i></p>

<div align="center">
  <img src="https://github.com/user-attachments/assets/497c82f5-dd3c-4f20-8d8d-ea59708f5524" width="32%" />
  <img src="https://github.com/user-attachments/assets/3d35b9b5-0290-4472-aba9-3c96f8603bfd" width="32%" />
  <img src="https://github.com/user-attachments/assets/2fdb363e-9306-447b-a4b2-56f063a29182" width="32%" />
</div>
<br />
<div align="center">
  <img src="https://github.com/user-attachments/assets/20334c37-be73-49fb-b7d3-f5266559a290" width="49%" />
  <img src="https://github.com/user-attachments/assets/c6ec6979-e933-4469-916f-a340c5b455a3" width="49%" />
  <img src="https://github.com/user-attachments/assets/f76a6268-c309-44e6-b803-ead23329fd4d" width="49%" />
  <img src="https://github.com/user-attachments/assets/04a3bf70-25c9-4cb8-b052-0fe4b3e8a684" width="49%" />
</div>
</details>

<br />

<div align="center">

### 👤 User Perspective
*최종 사용자(고객 및 소상공인)가 경험하게 되는 프론트엔드 마이페이지입니다.*

<p align="center">
  <img src="https://github.com/user-attachments/assets/36663d35-26c7-4d17-a126-37f1975a4a3a" width="65%" />
</p>

</div>

---

## 🛠 기술 스택 상세

### 🌐 Front-end
| 라이브러리 | 설명 | 버전 |
| :--- | :--- | :--- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white) | React를 사용하여 동적인 UI를 구현하고, 컴포넌트 기반 아키텍처를 설계했습니다. | 18.2.0 |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Vite를 사용하여 빠른 빌드와 핫 리로딩을 통해 방대한 어드민 개발 생산성을 극대화했습니다. | 5.3.1 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | TypeScript로 타입 안전성을 강화하여, 복잡한 데이터 바인딩 시 오류를 사전에 예방합니다. | 5.7 |
| ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white) | React Router를 사용하여 애플리케이션 내의 페이지 간 네비게이션을 구현했습니다. | 7.2.0 |
| ![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) | React Query로 서버 데이터를 캐싱하고, 외부 API 통신 및 동기화를 효율적으로 관리합니다. | 5.74.4 |
| ![Axios](https://img.shields.io/badge/Axios-5A29E3?style=flat-square&logo=axios&logoColor=white) | Axios 인터셉터를 활용해 API 통신을 처리하고, token 검사 및 요청을 중앙 제어합니다. | 1.0.2 |
| ![Zustand](https://img.shields.io/badge/Zustand-orange?style=flat-square) | Zustand로 애플리케이션의 인증 및 UI 전역 상태를 가볍고 직관적으로 관리합니다. | 5.0.4 |
| ![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=flat-square&logo=styled-components&logoColor=white) | Styled-Components를 활용해 컴포넌트 단위로 스타일을 정의하고 캡슐화했습니다. | 6.1.15 |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-00C853?style=flat-square&logo=framer&logoColor=white) | 선언적 애니메이션을 추가하여 모달 및 트랜지션 사용자 경험(UX)을 향상시켰습니다. | 12.5.0 |

### ⚙ CI/CD & Infra
| 기술 | 설명 |
| :--- | :--- |
| ![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white) | Jenkins를 사용하여 CI/CD 파이프라인을 구축하고, 자동화된 빌드 및 배포를 관리합니다. |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Docker를 활용하여 애플리케이션을 컨테이너화하고, 일관된 실행 환경을 제공합니다. |
| ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white) | Nginx를 사용하여 리버스 프록시 설정 및 정적 자원 서빙 트래픽을 효율적으로 처리합니다. |
| ![AWS](https://img.shields.io/badge/AWS%20EC2-232F3E?style=flat-square&logo=amazon-aws&logoColor=white) | AWS EC2를 활용하여 클라우드 배포 환경을 제공하고, 서버 운영과 관리를 수행합니다. |
| ![ENV](https://img.shields.io/badge/.env-6f42c1?style=flat-square&logo=dotenv&logoColor=white) | 환경별 API 주소 등 민감한 정보를 안전하게 관리하며, Vite 빌드 시 자동으로 주입합니다. |

<br />

---

## 🚀 주요 기능 (Key Features)

### ✅ 공통 UI & 아키텍처
| 기능 | 설명 |
| :--- | :--- |
| **📅 모듈화된 입력 컴포넌트** | 캘린더, 인풋, 텍스트 입력창 등을 단일 컴포넌트 내에서 종류별로 분기 처리하여 렌더링 최적화. |
| **💬 중앙 제어 오버레이** | Modal, Alert, Confirm, Toast 등 다양한 피드백 UI 요소를 중앙 시스템에서 통합 관리 가능. |
| **🎨 공통 스타일 및 훅** | 자주 사용되는 스타일 모듈화 및 좋아요, 드래그 기능을 커스텀 훅(Hook)으로 분리하여 재사용성 극대화. |
| **🧩 데이터 기반 레이아웃** | 테이블, 아이템 리스트, 드롭다운 등을 컴포넌트화하여 API 데이터 주입 시 자동 작동하도록 구현. |
| **🔢 페이징 엔진** | 공통 페이징 로직을 추상화하여 전체 서비스에 일관된 탐색 경험 제공. |

### 📦 데이터 및 상태 관리
| 기능 | 설명 |
| :--- | :--- |
| **🗂️ 최적화된 상태 관리** | React Query, Zustand를 결합하여 서버 데이터와 클라이언트 전역 상태의 관심사를 분리. |
| **🔄 비동기 통신 제어** | React Query를 활용해 데이터 패칭, 캐싱, 리페치 등 비동기 로직을 간편하고 안전하게 구현. |
| **🗑️ 낙관적 동기화 업데이트** | 데이터 삭제/수정 시, 서버 통신 완료 전 UI를 즉시 반영하여 지연 없는 사용자 경험 제공. |
| **📝 복합 입력 폼 제어** | 이미지 업로드, 드래그 앤 드롭 등 다양한 입력 UI를 폼 데이터와 유연하게 바인딩. |

### 🔧 통합 관리자 (Admin) 기능
| 기능 | 설명 |
| :--- | :--- |
| **🗂️ 상품 및 인벤토리 제어** | 카테고리 설정, 상품 추가/수정/삭제 및 메인 추천 상품 큐레이션 관리. |
| **🤝 이기종 플랫폼 연동** | **네이버 스마트스토어 API**와 연동하여 외부 상품 및 주문 데이터를 실시간 동기화. |
| **📦 클레임 파이프라인 관리** | 신규 주문 확인부터 취소/환불 요청 승인/거부, 반품 처리까지 라이프사이클 통제. |
| **🎫 실시간 티켓 운영** | 예약된 상품의 티켓 발급 및 고객의 현장 사용(Used) 여부에 대한 즉각적인 상태 처리. |
| **👥 CS 및 권한 설정** | 1:1 고객 문의 실시간 응답, 악성 리뷰 신고 처리 및 관리자 계정(CRUD) 권한 생성 통제. |

<br />

---

## 🏗️ Engineering Architecture

### 📐 System & DB Design
<div align="center">
  <table width="100%">
    <tr>
      <td width="50%" align="center"><b>Infrastructure Architecture</b></td>
      <td width="50%" align="center"><b>Database ERD</b></td>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/user-attachments/assets/34de2a30-2678-474e-98a8-873e7454424a" width="95%" alt="Architecture" /></td>
      <td align="center"><a href="https://www.erdcloud.com/d/mYpMAqACf4JSA5JHM"><img src="https://github.com/user-attachments/assets/b95190c4-046e-4f08-809c-e1ff264c6810" width="95%" alt="ERD" /></a></td>
    </tr>
  </table>
</div>

<br />

### 📂 Front-end 폴더 구조
*확장성과 유지보수를 고려한 도메인 중심 설계(DDD)*

<pre><code>src
 ┣ 📂 api        # API 호출, Axios 인터셉터, React-Query 훅 및 설정
 ┣ 📂 assets     # 이미지, 로고, 전역 스타일 등 정적 자원
 ┣ 📂 components # 공통 UI (모달, 테이블) 및 도메인 컴포넌트
 ┣ 📂 constant   # 전역 상수 관리
 ┣ 📂 hook       # 캘린더, 오버레이, 페이징 등 복잡한 뷰 로직 추상화 훅
 ┣ 📂 pages      # 라우팅 기반 독립적 View 단위 컴포넌트
 ┣ 📂 stores     # Zustand 클라이언트 전역 상태 저장소
 ┣ 📂 types      # 엄격한 관리를 위한 TypeScript 타입 정의
 ┗ 📂 utils      # 포매터, 유효성 검사 등 공통 유틸리티 함수
</code></pre>

<br />



