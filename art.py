import cv2


# class IMAGE :
#         def image_to_paint(img, strength):
#                 face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
                
#                 #ff = np.fromfile('../img/1.jpg', np.uint8)
#                 img = cv2.imread(img, cv2.IMREAD_COLOR)

#                 #cv2.imdecoded() 함수 - 1d-array 이미지를 3d로 만들어줌
#                 #img = cv2.imdecode(ff, cv2.IMREAD_UNCHANGED)
#                 img = cv2.resize(img, dsize=(0,0), fx=1.0, fy=1.0, interpolation=cv2.INTER_LINEAR)

#                 gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#                 faces = face_cascade.detectMultiScale(gray, 1.2)

#                 ## 2025 7 26 추가 내용
#                 # strength(0~100)를 fx(0.01~0.5)로 변환 (값이 작을수록 강한 모자이크)
#                 fx = fy = max(0.01, 1.0 - (strength / 100) * 0.99)

#                 # 모자이크
#                 for (x,y,w,h) in faces:
#                         #모자이크 처리할 위치만 따로 저장
#                         face_img = img[y:y+h, x:x+w]

#                         # 해당 부분만 이미지 축소: 축소 비율 변경하여 모자이크 강도 변경 가능
#                         face_img = cv2.resize(face_img, dsize=(0,0), fx=fx, fy=fy)

#                         # 해당 부분만 TIER_AREA 방식으로 확대 : 보간법 알고리즘 -> 선명도가 떨어져 뿌옇게 보임
#                         face_img = cv2. resize(face_img, (w,h), interpolation=cv2.INTER_AREA)

#                         # 원본 이미지에 모자이크 처리한 이미지를 워래 위치에 대체
#                         img[y:y+h, x:x+w] = face_img

#                 cv2.waitKey(0)
#                 cv2.destroyAllWindows()

#                 src = "./static/image/image_face.jpg" # 변환된 이미지 저장 루트
#                 cv2.imwrite(src, img)
                
#                 return src


class IMAGE :
    @staticmethod
    def image_to_paint(img, strength=15):
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # strength(1~30)를 fx(0.05~1.0)로 변환 (값이 작을수록 강한 모자이크)
        min_fx = 0.05
        max_fx = 1.0
        fx = fy = min_fx + (max_fx - min_fx) * ((strength - 1) / 29)

        # 얼굴 검출 및 모자이크 처리
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.2)
        for (x, y, w, h) in faces:
            face_img = img[y:y+h, x:x+w]
            face_img = cv2.resize(face_img, dsize=(0, 0), fx=fx, fy=fy)
            face_img = cv2.resize(face_img, (w, h), interpolation=cv2.INTER_AREA)
            img[y:y+h, x:x+w] = face_img

        return img