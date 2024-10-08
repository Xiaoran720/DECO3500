let isCameraOn = true;
let isMicOn = true;
const likeCounts = {};
const thumbsUpCounts = {};
let userLikes = 100; // Starting likes for demonstration

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

    // Increase user's likes (for shop functionality)
    userLikes++;
    updateUserLikes();
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

    // Increase user's likes (for shop functionality)
    userLikes++;
    updateUserLikes();
}

// Avatar Class
class Avatar {
    constructor(username) {
        this.username = username;
        this.accessories = [];
        this.status = 'online';
    }

    addAccessory(accessory) {
        this.accessories.push(accessory);
    }

    setStatus(status) {
        this.status = status;
    }

    render() {
        let avatarHTML = `
            <div class="avatar ${this.status}">
                <div class="avatar-base">${this.username[0]}</div>
                ${this.accessories.map(acc => `<div class="accessory ${acc}"></div>`).join('')}
            </div>
        `;
        return avatarHTML;
    }
}

// Function to detect user presence (this would interact with your external sensor)
function detectUserPresence() {
    // This is a mock function. In reality, this would interact with your sensor API
    return Math.random() < 0.8; // 80% chance the user is present
}

// Function to update user status based on presence
function updateUserStatus(avatar) {
    const isPresent = detectUserPresence();
    avatar.setStatus(isPresent ? 'online' : 'away');
    // Re-render the avatar with the new status
    document.getElementById(avatar.username).innerHTML = avatar.render();
}

// Shop functionality
const shopItems = [
    { id: 1, name: "Cool Hat", price: 50, image: "hat.png" },
    { id: 2, name: "Sunglasses", price: 30, image: "sunglasses.png" },
    { id: 3, name: "Necklace", price: 40, image: "necklace.png" },
    // Add more items as needed
];

function loadShopItems() {
    const shopContainer = document.getElementById('shopItems');
    if (shopContainer) {
        shopContainer.innerHTML = ''; // Clear existing items
        shopItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'shop-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.price} likes</p>
                <button onclick="purchaseItem(${item.id})">Purchase</button>
            `;
            shopContainer.appendChild(itemElement);
        });
    }
}

function purchaseItem(itemId) {
    const item = shopItems.find(i => i.id === itemId);
    if (userLikes >= item.price) {
        userLikes -= item.price;
        alert(`You've purchased ${item.name}!`);
        updateUserLikes();
        // Here you would update the user's inventory and save the changes
    } else {
        alert("Not enough likes to purchase this item!");
    }
}

function updateUserLikes() {
    const userLikesElement = document.getElementById('userLikes');
    if (userLikesElement) {
        userLikesElement.textContent = userLikes;
    }
}

// Initialize when the page loads
window.onload = function() {
    // Initialize avatars
    const user1Avatar = new Avatar('User1');
    user1Avatar.addAccessory('cool-hat');
    const user1Element = document.getElementById('User1');
    if (user1Element) {
        user1Element.innerHTML = user1Avatar.render();
    }

    // Update status every 5 seconds
    setInterval(() => updateUserStatus(user1Avatar), 5000);

    // Load shop items if on shop page
    loadShopItems();

    // Update user likes display
    updateUserLikes();
};