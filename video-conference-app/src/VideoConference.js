import React, { useState } from 'react';

const ParticipantVideo = ({ name }) => (
  <div className="w-48 h-48 bg-secondary rounded-lg border-2 border-accent flex flex-col items-center justify-center relative mb-4 shadow-lg">
    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2">
      {name[0]}
    </div>
    <span className="text-sm font-semibold text-text">{name}</span>
    <div className="absolute right-0 top-0 bottom-0 w-10 bg-background bg-opacity-75 flex flex-col items-center justify-center space-y-3">
      <span className="cursor-pointer text-accent hover:text-primary transition-colors">❤️</span>
      <span className="cursor-pointer text-accent hover:text-primary transition-colors">👍</span>
      <span className="cursor-pointer text-accent hover:text-primary transition-colors">🔊</span>
    </div>
  </div>
);

const Whiteboard = () => (
  <div className="bg-white border-4 border-secondary rounded-lg w-full h-full flex items-center justify-center shadow-xl">
    <span className="text-2xl font-bold text-text">Whiteboard Area</span>
  </div>
);

const Button = ({ children, onClick, className }) => (
  <button 
    className={`${className} text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm shadow-md`}
    onClick={onClick}
  >
    {children}
  </button>
);

const SideMenu = ({ onPostQuestion, onViewRecord, onToggleCamera, onToggleMic, isCameraOn, isMicOn }) => (
  <div className="w-56 bg-primary p-6 flex flex-col space-y-4 rounded-r-2xl shadow-xl">
    <Button className="bg-accent" onClick={onPostQuestion}>❓ Post Question</Button>
    <Button className="bg-accent" onClick={onViewRecord}>📝 View Record</Button>
    <Button className="bg-tertiary text-text" onClick={onToggleCamera}>
      {isCameraOn ? '📷 Turn Off Camera' : '🚫 Turn On Camera'}
    </Button>
    <Button className="bg-tertiary text-text" onClick={onToggleMic}>
      {isMicOn ? '🎤 Mute Mic' : '🔇 Unmute Mic'}
    </Button>
  </div>
);

const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={`px-6 py-3 ${isActive ? 'bg-accent text-white' : 'bg-secondary text-text'} text-sm font-semibold rounded-t-lg`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg w-3/4 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
        <Button className="bg-accent mt-4" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

const RecordModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Speech');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Meeting Record">
      <div className="flex mb-4">
        <TabButton isActive={activeTab === 'Speech'} onClick={() => setActiveTab('Speech')}>Speech Content</TabButton>
        <TabButton isActive={activeTab === 'Whiteboard'} onClick={() => setActiveTab('Whiteboard')}>Whiteboard</TabButton>
        <TabButton isActive={activeTab === 'Quiz'} onClick={() => setActiveTab('Quiz')}>Quiz</TabButton>
        <TabButton isActive={activeTab === 'Chat'} onClick={() => setActiveTab('Chat')}>Chat Box</TabButton>
      </div>
      <div className="bg-white p-4 rounded-lg h-64 overflow-y-auto">
        {activeTab === 'Speech' && (
          <div className="space-y-2">
            <p className="text-text">A: Lorem ipsum dolor sit amet consectetur. Dolor vulputate enim scelerisque cursus.</p>
            <p className="text-text">A: Lorem ipsum dolor sit amet consectetur. Dolor vulputate enim scelerisque cursus.</p>
          </div>
        )}
        {/* Add content for other tabs as needed */}
      </div>
    </Modal>
  );
};

const QuestionModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Post a Question">
    <textarea 
      className="w-full h-32 border rounded p-2 mb-4" 
      placeholder="Type your question here..."
    />
    <Button className="bg-accent" onClick={onClose}>Submit Question</Button>
  </Modal>
);

const VideoConference = () => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <SideMenu 
        onPostQuestion={() => setIsQuestionModalOpen(true)}
        onViewRecord={() => setIsRecordModalOpen(true)}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        onToggleMic={() => setIsMicOn(!isMicOn)}
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
      />
      <div className="flex-1 flex flex-col p-6">
        <div className="flex justify-center space-x-6 mb-6">
          <ParticipantVideo name="User 1" />
          <ParticipantVideo name="User 2" />
          <ParticipantVideo name="User 3" />
          <ParticipantVideo name="User 4" />
        </div>
        <div className="flex-1">
          <Whiteboard />
        </div>
      </div>

      <RecordModal 
        isOpen={isRecordModalOpen} 
        onClose={() => setIsRecordModalOpen(false)}
      />

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
      />
    </div>
  );
};

export default VideoConference;