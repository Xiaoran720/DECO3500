Public URL: https://deco3500-c9145.web.app


Project Overview
This project is a remote conferencing application that allows users to participate in virtual meetings, interact through a shared chat, and manage various media features like turning the camera or microphone on and off. The application simulates an interactive video conference environment and includes an avatar shop where users can purchase accessories using a custom "likes" system. Additionally, an external sensor device can be connected for detecting user presence.

Features
1. Video Conferencing: Participants can join video calls, interact with each other using like and thumbs-up buttons, and communicate via a chatbox.
External Sensor Integration: A sensor device can be installed to detect user presence, and when a user leaves the camera, the application enters "Leave Mode."

2. Avatar Customization: Users can personalize their avatars with accessories purchased from the Avatar Shop.
Real-time Chat: Participants can send messages in the chatbox, which are stored and retrieved using Firebase.

3. Leave Mode: If a user steps away from the camera (detected by the sensor), a leave mode is triggered with visual cues.
Requirements


Web Technologies:
HTML, CSS, JavaScript
Firebase for database and real-time chat

External Sensor:
A sensor device is required for detecting user presence.
The sensor needs to be manually connected through the web serial API.


File Structure
index.html: Main interface of the video conferencing application.

index.js: Contains all the JavaScript logic for toggling camera/mic, handling chat, and integrating with Firebase and the external sensor.

styles.css: Contains all the styles for the application layout, chatbox, modal, and avatars.

shop.html: Contains the avatar shop interface, where users can purchase avatar accessories.

404.html: Custom 404 error page for Firebase hosting.

firebase.json: Firebase configuration file for deployment.

Known Issues
Sensor Integration: The sensor might not be recognized in some browsers that don’t support the web serial API.

Chat: The chat system relies on Firebase and requires proper configuration to function.

License
This project is licensed under the MIT License.