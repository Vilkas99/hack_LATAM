import io from "socket.io-client";
const server = process.env.REACT_APP_SERVER_URL; //Establecer la variable de entorno
let socket = io(server);
export default socket;
