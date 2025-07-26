let uploadedFile = null;

function loadImage(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("No file selected.");
        return;
    }

    uploadedFile = file;

    const img = document.getElementById('originalImage');
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        alert("Image loaded successfully.");
    };
}

async function applyMosaic() {
    if (!uploadedFile) {
        alert("Please load an image first.");
        return;
    }

    const strength = document.getElementById('strength').value;
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('strength', strength);

    try {
        const response = await fetch('/mosaic', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to process the image.');
        }

        const blob = await response.blob();
        const mosaicImg = document.getElementById('mosaicImage');
        mosaicImg.src = URL.createObjectURL(blob);
    } catch (error) {
        alert(error.message);
    }
}
