from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
from art import IMAGE

app = Flask(__name__)
UPLOAD_FOLDER = './static/image/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def upload_file():
    return render_template('index.html')

@app.route('/img', methods=['GET', 'POST'])
def uploader_file():
    if request.method=='POST':
        file = request.files['file']
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        face = IMAGE.image_to_paint(path)
        return render_template('index.html', path = path, face = face)


if __name__ == '__main__':
    app.run(debug = True)

