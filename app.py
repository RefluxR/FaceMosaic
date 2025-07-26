from flask import Flask, render_template, request, send_file
import cv2
import numpy as np
from art import IMAGE
import io

app = Flask(__name__)

@app.route('/')
def upload_file():
    return render_template('index.html')

@app.route('/mosaic', methods=['POST'])
def mosaic_image():
    file = request.files.get('file')
    if not file:
        return "No file uploaded.", 400

    strength = int(request.form.get('strength', 10))

    # 파일을 메모리에서 읽어 OpenCV로 처리
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # 모자이크 처리
    processed_img = IMAGE.image_to_paint(img, strength)

    # 처리된 이미지를 메모리로 저장
    _, buffer = cv2.imencode('.jpg', processed_img)
    img_io = io.BytesIO(buffer)

    return send_file(img_io, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
