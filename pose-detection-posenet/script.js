const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

function drawKeypoints(keypoints, minConfidence = 0.5) {
  keypoints.forEach(keypoint => {
    if (keypoint.score > minConfidence) {
      const { x, y } = keypoint.position;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  });
}

function drawSkeleton(keypoints, minConfidence = 0.5) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.forEach(pair => {
    ctx.beginPath();
    ctx.moveTo(pair[0].position.x, pair[0].position.y);
    ctx.lineTo(pair[1].position.x, pair[1].position.y);
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

async function detectPose() {
  const net = await posenet.load();

  await setupCamera();
  video.play();

  async function poseLoop() {
    const pose = await net.estimateSinglePose(video, {
      flipHorizontal: true
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    drawKeypoints(pose.keypoints);
    drawSkeleton(pose.keypoints);
    ctx.restore();
    requestAnimationFrame(poseLoop);
  }

  poseLoop();
}

detectPose();