let mediaRecorder;
let recordedChunks = [];

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const preview = document.getElementById('preview');

startBtn.onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });

    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      preview.src = url;

      const a = document.createElement('a');
      a.href = url;
      a.download = 'экран-запись.webm';
      a.click();
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    alert('Ошибка: ' + err.message);
  }
};

stopBtn.onclick = () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
};
