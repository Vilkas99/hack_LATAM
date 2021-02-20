import io from "socket.io-client";
const server = process.env.REACT_APP_SERVER_URL;
let socket = io(server);
export default socket;
