import axios from "axios-typescript";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_IP as string}/v1/api/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
api.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.

    const accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");

    try {
      if (accessToken) {
        config.headers.req = refreshToken;
        config.headers.Authorization = accessToken;
      }

      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */

api.interceptors.response.use(
  (response) => {
    const accessToken = response.headers["authorization"];
    if (accessToken) {
      localStorage.setItem("access-token", accessToken);
    }
    return response;
  },

  async (error) => {
    if (error.response) {
      console.error("error", error.response);
      const errorStatusCode = error.response.status;
      switch (errorStatusCode) {
        case 401: {
          // 토큰 갱신 시도
          const authRefreshToken = localStorage.getItem("refresh-token");
          const authAccessToken = localStorage.getItem("access-token");

          if (authRefreshToken) {
            try {
              const refreshResponse = await axios.post(
                `${import.meta.env.VITE_SERVER_IP as string}/v1/api/admin/refresh`,
                {
                  headers: {
                    authorization: `${authAccessToken}`,
                    refresh: `${authRefreshToken}`,
                  } as Record<string, string>,
                }
              );
              const { authorization } = refreshResponse.headers;

              localStorage.setItem("access-token", authorization);

              // 원래 요청 재시도
              return api(error.config);
            } catch (err) {
              localStorage.removeItem("access-token");
              localStorage.removeItem("refresh-token");
              window.location.href = "/";
              return Promise.reject(err);
            }
          }
          break;
        }

        case 403: {
          alert("권한이 없습니다. 홈화면으로 돌아갑니다.");
          window.location.href = "/";
          return Promise.reject(error);
        }

        default:
          return Promise.reject(error.response);
      }
    } else {
      // 네트워크 에러 또는 기타 에러
      console.error("네트워크 에러:", error.message || "요청을 처리할 수 없습니다.");
    }

    return Promise.reject(error);
  }
);

export default api;
