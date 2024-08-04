#!/bin/bash

REPOSITORY=/home/ubuntu/front

echo "운영 서버 배포"
cd "${REPOSITORY}"

# npm 의존성 설치
npm install

# PM2 프로세스 관리
pm2 describe til-product > /dev/null
if [ $? -eq 0 ]; then
  # 실행 중인 경우
  echo "til-product 프로세스가 실행 중입니다."
  npm run pm2:reload:prod
else
  # 실행 중이 아닌 경우
  echo "til-product 프로세스가 실행되지 않았습니다."
  npm run pm2:start:prod
fi
