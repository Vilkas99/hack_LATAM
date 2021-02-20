import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";
import socket from "../../Utils/Socket/socket";
import "./estilo.scss";
import { Row, Col } from "antd";
import VideoComponente from "./VideoComp";

function VideoLayout() {
  const [yourID, setYourID] = useState(""); //Id del usuario
  const [users, setUsers] = useState({}); //Objeto que almacenara todos los usuarios en la sesion
  const [stream, setStream] = useState(); //Streaming
  const [receivingCall, setReceivingCall] = useState(false); //Booleano que nos indica si se está recibiendo una llamada
  const [caller, setCaller] = useState(""); //Emisor
  const [callerSignal, setCallerSignal] = useState(); //Señal del emisor
  const [callAccepted, setCallAccepted] = useState(false); //Booleano que muestra si el usuario acepta la llamada
  const userVideo = useRef(); //Referencia para el video
  const partnerVideo = useRef(); //Referencia para el vídeo del otro cliente
  const socketRef = useRef(); //Socket

  useEffect(() => {
    socketRef.current = socket; //Conectamos el socjet

    navigator.mediaDevices //Accedemos al navigator
      .getUserMedia({ video: true, audio: true }) //Obtenemos vídeo y audio
      .then((stream) => {
        //Si el usuario acepta compartir su vídeo y audio
        setStream(stream); //Actualizamos nuestro stream
        if (userVideo.current) {
          //Si entonces poseemos vídeos...
          userVideo.current.srcObject = stream; //Establecemos que el src será el stream
        }
      });

    //Nos suscribimos al evento en donde obtenemos nuestro id de socket
    socketRef.current.on("yourID", (id) => {
      console.log("He recibido mi ID!");
      setYourID(id); //Actualizamos el ID
    });

    //Nos suscribimos al sistema de notificación
    socketRef.current.on("notification", (data) => {
      console.log("He recibido una NOTIFICACION");
    });

    //Nos suscribimos al evento que nos da a todos los usuarios
    socketRef.current.on("allUsers", (users) => {
      console.log("He recibido a todos los usuarios ", users);
      setUsers(users); //Actualizamos los usuarios
    });

    //Nos suscribimos al evento "hey" que se activa cuando alguien nos marca
    socketRef.current.on("hey", (data) => {
      console.log("Estoy recibiendo una llamada");
      setReceivingCall(true); //Establecemos que estamos recibiendo una llamada
      setCaller(data.from); //Establecemos quien nos llama
      setCallerSignal(data.signal); //Establecemos la señal de la persona
    });
  }, []);

  //Funcion que se ejecuta cuando queremos llamar a alguien (Requerimos de su ID)
  function callPeer(id) {
    //Actualizamos al emisor
    setCaller(id);

    const peer = new Peer({
      //Creamos el peer para la persona que llama

      initiator: true, //Esta persona ES la que inicia el proceso de llamada
      trickle: false,
      stream: stream,
    });

    console.log("Hemos llamado y creado al peer", peer);

    //Nos suscribimos al evento "signal" - Que se ejecuta cuando se crea un nuevo peer
    peer.on("signal", (data) => {
      console.log("Lanzando una señal desde el peer");
      //Emitimos un evento "callUser" al servidor en donde le brindamos el ID de la persona a llamar, su signa y nuestro ID
      socketRef.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    //Nos suscribimos al evento "stream"
    peer.on("stream", (stream) => {
      console.log("Hemos creado el stream");
      if (partnerVideo.current) {
        //Si tenemos el vídeo de la otra persona
        partnerVideo.current.srcObject = stream; //Actualizamos su src con el stream que nos mandaron
      }
    });

    console.log("Recibió la llamada?: ", receivingCall);

    //Nos suscribimos al método "callAccepted"
    socketRef.current.on("callAccepted", (data) => {
      console.log("La señal fue aceptada");

      setCallAccepted(true); //Establecemos que la llamada  ha sido aceotada
      peer.signal(data.signal); //Mandamos la señal con nuestros datos
    });
  }

  //Función que se ejecuta cuando la llamada ha sido aceptada
  function acceptCall() {
    //Actualizamos nuestro estado
    setCallAccepted(true);
    const peer = new Peer({
      //Creamos el peer de la persona
      initiator: false, //NO somos los iniciadores de la llamada
      trickle: false,
      stream: stream,
    });

    //Nos suscribimos a la señal de la otra persona
    peer.on("signal", (data) => {
      //Emitimos al servidor que aceptamos la llamada
      socketRef.current.emit("acceptCall", { signal: data, to: caller });
    });

    //Nos suscribimos al evento del "stream" en donde colocamos el stream de la otra persona
    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    //Mandamos una señal de regreso con nuestra señal
    peer.signal(callerSignal);
  }

  return (
    <>
      <Row justify="space-around" align="middle">
        <Col span={8}></Col>
        <Col span={8}>
          <VideoComponente userVideo={userVideo} />
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
}

export default VideoLayout;
