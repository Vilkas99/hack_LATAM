import React from "react";
import { notification, Space } from "antd";
import { DollarTwoTone } from "@ant-design/icons";

function notificacion(data) {
  console.log("Datos en la notificacion: ", data);
  let titulo = "";
  let descripcion = "";

  if (data.tipo == "puntos") {
    titulo = (
      <Space direction="horizontal">
        <h3 style={{ color: "#5ae88c", margin: "10px" }}>
          Has recibido puntos!
        </h3>
        <DollarTwoTone />
      </Space>
    );
    descripcion = (
      <Space direction="vertical">
        <h4>Se te han otorgado ${data.puntos} puntos!</h4>
      </Space>
    );
  }

  notification.open({
    message: titulo,
    description: descripcion,
  });
}

export default notificacion;
