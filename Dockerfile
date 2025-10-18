# Step 1: Build React App
FROM node:18 AS builder

WORKDIR /app

# node_modules와 lock 파일 제거 후 복사
COPY package*.json ./

# @types/node 패키지 설치
RUN npm install --save-dev @types/node

# 패키지만 먼저 설치 (캐시 활용)
RUN rm -rf node_modules package-lock.json && npm install

# 나머지 프로젝트 복사
COPY . .

# 빌드 실행
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 덮어쓰기
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
