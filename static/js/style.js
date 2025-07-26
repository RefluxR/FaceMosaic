function loadFile(input) {
    var file = input.files[0]; // 선택된 파일 가져오기

    // 파일 이름 표시
    var name = document.getElementById('fileName');
    name.textContent = file.name;

    // 새로운 이미지 생성
    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    // 이미지 소스 설정
    newImage.src = URL.createObjectURL(file);

    newImage.style.width = "45%"; // 크기 동일하게 설정
    newImage.style.height = "auto";
    newImage.style.visibility = "visible";
    newImage.style.objectFit = "contain";

    // image-show에 이미지 추가
    var container = document.getElementById('image-show');
    container.innerHTML = ""; // 이전 이미지 제거
    container.appendChild(newImage);

    // 모자이크 이미지 초기 숨기기 및 비우기
    const mosaicImage = document.getElementById('mosaicImage');
    mosaicImage.style.visibility = 'hidden';
    mosaicImage.style.opacity = '0';
    mosaicImage.src = '';

    // 저장 버튼 숨기기
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('saveMessage').textContent = '';
}

function onInput() { 
    document.getElementById("button2").style.color = "yellow";
    document.getElementById("button2").style.border = "5px solid #435165";
}

function updateStrengthValue() {
    const slider = document.getElementById('strength');
    const display = document.getElementById('strengthValue');

    // 퍼센트 계산 (0~10 값 → 0%~100%)
    const percent = (slider.value / 10) * 100;

    // 화면에 표시
    display.textContent = Math.round(percent) + "%";
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
    formData.append('strength', 10 - strength); // 반전된 값 전송

    fetch('/mosaic', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.blob())
    .then(blob => {
        const mosaicImage = document.getElementById('mosaicImage');
        const originalImage = document.querySelector('#image-show img'); // 원본 이미지

        mosaicImage.src = URL.createObjectURL(blob);

        // 모자이크 이미지 보이기 (자리 유지하며 자연스럽게)
        mosaicImage.style.visibility = 'visible';
        mosaicImage.style.opacity = '1';

        if (originalImage) {
            mosaicImage.style.width = originalImage.offsetWidth + "px";
            mosaicImage.style.height = originalImage.offsetHeight + "px";
        }

        // 저장 버튼 보이기
        document.getElementById('saveButton').style.display = 'inline-block';
        document.getElementById('saveMessage').textContent = '';
    })
    .catch(error => console.error('Error:', error));
}

function saveMosaicImage() {
    const mosaicImage = document.getElementById('mosaicImage');
    if (!mosaicImage.src) {
        alert("저장할 이미지가 없습니다!");
        return;
    }

    // a 태그 만들어서 이미지 다운로드 트리거
    const link = document.createElement('a');
    link.href = mosaicImage.src;
    link.download = 'mosaic_image.png';  // 저장될 파일명
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 저장 성공 안내 메시지 보여주기
    const saveMessage = document.getElementById('saveMessage');
    saveMessage.textContent = "이미지가 저장되었습니다! 📁";
    setTimeout(() => {
        saveMessage.textContent = "";
    }, 3000);
}
