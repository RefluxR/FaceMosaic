### 핸드폰 서비스를 위한 간단한 파이프연동

1.https://dashboard.ngrok.com/ 로그인 <br>
2. ngrok 설치
``` bash
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && \
sudo apt update && sudo apt install ngrok
```
3. 인증 토큰 연결
```bash
ngrok config add-authtoken 토근
```
https://dashboard.ngrok.com/get-started/your-authtoken


4. flask, ngrok 실행
```
ngrok http 5000
```