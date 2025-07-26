function loadFile(input) {
    var file = input.files[0]; // 선택된 파일 가져오기

    // 미리 만들어 놓은 div에 text(파일 이름) 추가
    var name = document.getElementById('fileName');
    name.textContent = file.name;

    // 새로운 이미지 div 추가
    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    // 이미지 source 가져오기
    newImage.src = URL.createObjectURL(file);

    newImage.style.width = "45%"; // 크기 동일하게 설정
    newImage.style.height = "auto";
    newImage.style.visibility = "visible"; // 이미지를 표시하도록 수정
    newImage.style.objectFit = "contain";

    // 이미지를 image-show div에 추가
    var container = document.getElementById('image-show');
    container.innerHTML = ""; // 이전 이미지를 제거
    container.appendChild(newImage);
}

function onInput() { 
    document.getElementById("button2").style.color = "yellow";
    document.getElementById("button2").style.border = "5px solid #435165";
}

function updateStrengthValue() {
  const slider = document.getElementById('strength');
  const display = document.getElementById('strengthValue');
  
  // 반전된 값 계산 (왼쪽: 15, 오른쪽: 1)
  const reversedValue = 11 - slider.value;
  
  // 화면에 반전된 값 표시
  display.textContent = reversedValue;
}

function applyMosaic() {
    const fileInput = document.getElementById('button1');
    const strength = document.getElementById('strength').value;

    if (!fileInput.files[0]) {
        alert("Please upload an image first.");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('strength', 11 - strength); // 반전된 값 전송

    fetch('/mosaic', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.blob())
        .then(blob => {
            const mosaicImage = document.getElementById('mosaicImage');
            const originalImage = document.querySelector('#image-show img'); // 원본 이미지 가져오기

            mosaicImage.src = URL.createObjectURL(blob);
            mosaicImage.style.visibility = 'visible';

            // 원본 이미지의 크기를 기준으로 모자이크 이미지 크기 설정
            if (originalImage) {
                mosaicImage.style.width = originalImage.offsetWidth + "px";
                mosaicImage.style.height = originalImage.offsetHeight + "px";
            }
        })
        .catch(error => console.error('Error:', error));
}