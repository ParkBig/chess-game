import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import FindRoomPage from './page/FindRoomPage';
import RoomPage from './page/RoomPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <FindRoomPage />,
      },
      {
        path: 'room/:roomName',
        element: <RoomPage />,
      },
    ],
  },
]);

export default router;
