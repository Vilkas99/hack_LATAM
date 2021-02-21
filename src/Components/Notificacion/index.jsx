import React from "react";
import { notification, Space, Divider, Button } from "antd";
import { DollarTwoTone, CrownTwoTone } from "@ant-design/icons";
import UseAnimations from "react-useanimations";
import alertCircle from "react-useanimations/lib/alertCircle";
import socket from "../../Utils/Socket/socket";

const ContenidoTitulo = ({ titulo, color }) => {
  return (
    <Space direction="horizontal">
      <h3 style={{ color: color, margin: "10px" }}>{titulo}</h3>
      <UseAnimations
        animation={alertCircle}
        size={36}
        style={{ margin: "0 20px" }}
        color={color}
      />
      <Divider />
    </Space>
  );
};

const ContenidoItem = ({ data }) => {
  const handleOtorgarRecompensa = () => {
    const miData = {};

    if (data.tipo == "puntos") {
      miData = {
        puntos: data.puntos,
        tipo: data.tipo,
      };
    } else {
      miData = {
        nombreItem: data.nombreItem,
        descripcionItem: data.descripcionItem,
        tipo: data.tipo,
      };
    }
    socket.emit("creandoNotificacion", data);
  };

  return (
    <Space direction="vertical">
      <CrownTwoTone size={36} />
      <h3>Recompensa: {data.nombreItem} </h3>
      <h4>{data.descripcionItem} </h4>
      <Button onClick={() => data.tipo}>Otorgan recompensa</Button>
    </Space>
  );
};

const ContenidoMisionCompletada = ({ data }) => {
  return (
    <Space direction="vertical">
      <CrownTwoTone size={36} />
      <h3>Mision: {data.mision} </h3>
      <h4>{data.descripcionMision} </h4>
    </Space>
  );
};

function notificacion(data) {
  console.log("Datos en la notificacion: ", data);
  let titulo = "";
  let descripcion = "";

  if (data.tipo == "puntos") {
    titulo = <ContenidoTitulo titulo="Has recibido puntos!" color="#5ae88c" />;
    descripcion = (
      <Space direction="vertical" style={{ color: "#5ae88c", margin: "10px" }}>
        <h4>Se te han otorgado {data.puntos} puntos!</h4>
      </Space>
    );
  } else if (data.tipo == "mision") {
    titulo = <ContenidoTitulo titulo="¡Nueva misión!" color="#db2149" />;
    descripcion = (
      <Space direction="vertical" style={{ color: "#5ae88c", margin: "10px" }}>
        <h4>Esta es tu nueva misión: {data.nombreMision} </h4>
        <Space
          direction="horizontal"
          style={{ color: "#5ae88c", margin: "10px" }}
        >
          {data.tipoRecompensa == "puntos" ? (
            <>
              <h4>Recompensa: {data.recompensa.puntos} puntos </h4>
              <DollarTwoTone />
            </>
          ) : (
            <ContenidoItem data={data.recompensa} />
          )}
        </Space>
      </Space>
    );
  } else if (data.tipo == "Item") {
    titulo = <ContenidoTitulo titulo="¡Nuevo item!" color="#f7cf3b" />;
    descripcion = <ContenidoItem data={data} />;
  } else if (data.tipo == "misionCompletada") {
    titulo = (
      <ContenidoTitulo titulo="¡Se ha completado una misión!" color="#943bd9" />
    );

    descripcion = <ContenidoMisionCompletada data={data} />;
  }

  notification.open({
    message: titulo,
    description: descripcion,
    duration: 0,
  });
}

export default notificacion;
