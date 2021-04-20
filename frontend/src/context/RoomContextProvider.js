import { createContext } from 'react';
import useRoomState from '../hooks/useRoomState';

const RoomContext = createContext();

function RoomContextProvider({ children }) {
  const [state, dispatch] = useRoomState();

  return <RoomContext.Provider value={{ state, dispatch }}>{children}</RoomContext.Provider>;
}

export { RoomContext, RoomContextProvider };
