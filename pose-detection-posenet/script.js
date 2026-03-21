const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false
  });

  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

// Draw keypoints (joints)
function drawKeypoints(keypoints) {
  keypoints.forEach(keypoint => {
    const { x, y } = keypoint.position;

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
  });
}

// Draw skeleton (lines)
function drawSkeleton(keypoints, minConfidence = 0.2) {
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

async function main() {
  const net = await posenet.load({
    architecture: "MobileNetV1",
    outputStride: 16,
    inputResolution: { width: 640, height: 480 },
    multiplier: 0.75
  });

  await setupCamera();
  video.play();

  // Set canvas size equal to video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  async function detect() {
    const pose = await net.estimateSinglePose(video, {
  flipHorizontal: false,
  decodingMethod: "single-person"
});

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw pose
    drawKeypoints(pose.keypoints);
    drawSkeleton(pose.keypoints);

    requestAnimationFrame(detect);
  }

  detect();
}

main();