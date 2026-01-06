import { io } from 'socket.io-client';
import { useState } from 'react';

function SocketButton() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleClick = () => {
    if (!socket) {
      console.log('Creating socket connection...');
      const newSocket = io('http://localhost:3000');

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      setSocket(newSocket);
    } else {
      console.log('Socket already exists');
    }
  };

  return (
    <>
      <button onClick={handleClick}>{isConnected ? 'Socket Connected' : 'Create Socket'}</button>
      {isConnected && <p>Socket ID: {socket.id}</p>}
    </>
  );
}

export default SocketButton;
