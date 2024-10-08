let isCameraOn = true;
let isMicOn = true;
const likeCounts = {};
const thumbsUpCounts = {};

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
        newMessage.classList.add('sent-message', 'bounce-in');

        chatMessages.appendChild(newMessage);
        messageBox.value = '';

        setTimeout(() => newMessage.classList.remove('bounce-in'), 1000);
    }
}

function likeParticipant(participantId) {
    const likeButton = document.querySelector(`#${participantId} .like-button`);
    const likeIcon = likeButton.querySelector('.like-icon');
    const likeCount = likeButton.querySelector('.like-count');
    
    likeCounts[participantId] = (likeCounts[participantId] || 0) + 1;
    likeCount.textContent = likeCounts[participantId];
    
    likeIcon.classList.add('pulse');
    setTimeout(() => {
        likeIcon.classList.remove('pulse');
    }, 500);
}

function thumbUpParticipant(participantId) {
    const thumbsUpButton = document.querySelector(`#${participantId} .thumbs-up-button`);
    const thumbsUpIcon = thumbsUpButton.querySelector('.thumbs-up-icon');
    const thumbsUpCount = thumbsUpButton.querySelector('.thumbs-up-count');
    
    thumbsUpCounts[participantId] = (thumbsUpCounts[participantId] || 0) + 1;
    thumbsUpCount.textContent = thumbsUpCounts[participantId];
    
    thumbsUpIcon.classList.add('pulse');
    setTimeout(() => {
        thumbsUpIcon.classList.remove('pulse');
    }, 500);
}

async function connectToSerial() {
    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        console.log('Connected to Serial Port');

        await readFromSerial(port);
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

async function readFromSerial(port) {
    const decoder = new TextDecoder('utf-8');
    const reader = port.readable.getReader();

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break; 
            }

            const distance = parseInt(decoder.decode(value), 10);
            console.log('Distance received:', distance);
       
            if (distance > 30) {
                toggleModal('recordModal'); 
            }
        }
    } catch (error) {
        console.error('Error reading from serial port:', error);
    } finally {
        reader.releaseLock();
    }
}