import io from "socket.io-client";

const socket = () => {
  return io("http://192.168.0.8:3333");
};

export default socket;
