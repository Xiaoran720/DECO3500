let isCameraOn = true;
let isMicOn = true;

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function changeTab(button, contentId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(contentId).classList.add('active');
}

function toggleCamera() {
    isCameraOn = !isCameraOn;
    const cameraButton = document.querySelector('.side-menu button:nth-child(3)');
    cameraButton.innerHTML = isCameraOn ? '<i class="fas fa-video"></i> Turn Off Camera' : '<i class="fas fa-video-slash"></i> Turn On Camera';
    // 这里你可以添加实际控制摄像头的代码
}

function toggleMic() {
    isMicOn = !isMicOn;
    const micButton = document.querySelector('.side-menu button:nth-child(4)');
    micButton.innerHTML = isMicOn ? '<i class="fas fa-microphone"></i> Mute Mic' : '<i class="fas fa-microphone-slash"></i> Unmute Mic';
    // 这里你可以添加实际控制麦克风的代码
}

function submitQuestion() {
    const questionText = document.getElementById('questionText').value;
    if (questionText.trim() !== '') {
        alert('Question submitted: ' + questionText);
        document.getElementById('questionText').value = '';
        toggleModal('questionModal');
    } else {
        alert('Please enter a question before submitting.');
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

function sendMessage() {
    const messageBox = document.querySelector('.chatbox textarea');
    const message = messageBox.value.trim();
    if (message) {
        const chatMessages = document.querySelector('.chat-messages');
        const newMessage = document.createElement('p');
        newMessage.textContent = 'You: ' + message;
        chatMessages.appendChild(newMessage);
        messageBox.value = ''; // 清空输入框
    }
}

function flyIcon(icon, toElement) {
    const flyIcon = document.createElement('div');
    flyIcon.innerHTML = icon;
    flyIcon.classList.add('fly-animation');

    // 获取红色框的位置（出发点）
    const fromElement = document.getElementById('startBox');
    const fromRect = fromElement.getBoundingClientRect();

    // 获取目标头像框的位置（终点）
    const toRect = toElement.getBoundingClientRect();

    // 输出起点和终点的坐标进行调试
    console.log('From:', fromRect.left, fromRect.top); // 输出出发点位置
    console.log('To:', toRect.left, toRect.top); // 输出目标头像框位置

    // 设置初始位置，并考虑滚动偏移（出发点）
    flyIcon.style.position = 'absolute';
    flyIcon.style.left = `${fromRect.left + window.scrollX}px`;
    flyIcon.style.top = `${fromRect.top + window.scrollY}px`;
    document.body.appendChild(flyIcon);

    // 计算目标头像框的中心位置
    const targetX = toRect.left + toRect.width / 2 + window.scrollX;
    const targetY = toRect.top + toRect.height / 2 + window.scrollY;

    // 计算 x 和 y 轴的偏移量
    const deltaX = targetX - (fromRect.left + window.scrollX);
    const deltaY = targetY - (fromRect.top + window.scrollY);

    // 输出偏移量进行调试
    console.log('DeltaX:', deltaX, 'DeltaY:', deltaY);

    // 应用 transform 来设置飞行路径
    flyIcon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // 移除动画元素
    setTimeout(() => {
        flyIcon.remove();
    }, 1000); // 动画持续时间
}




// Like 按钮点击事件
function likeParticipant(fromElement, toParticipantId) {
    const toElement = document.getElementById(toParticipantId); // 假设头像框有ID
    flyIcon('❤️', fromElement, toElement); // 飞行爱心
}

// 点赞按钮点击事件
function thumbUpParticipant(fromElement, toParticipantId) {
    const toElement = document.getElementById(toParticipantId); // 假设头像框有ID
    flyIcon('👍', fromElement, toElement); // 飞行点赞图标
}

