document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const imageWrapper = document.querySelector(".image-wrapper");

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // 폼 제출 기본 동작 막기

        const fileInput = document.querySelector("input[type='file']");
        const file = fileInput.files[0];

        if (!file) {
            alert("파일을 선택해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("서버 응답 실패");
            }

            const data = await response.json();

            // 이미지 추가
            imageWrapper.innerHTML = `
                <img src="${data.original}" alt="원본 이미지">
                <img src="${data.processed}" alt="처리된 이미지">
            `;
        } catch (error) {
            console.error("에러 발생:", error);
            alert("이미지 업로드 중 문제가 발생했습니다!");
        }
    });
});
