import React, { useEffect, useState } from "react";
import ContenidoPuntos from "./Puntos";
import ContenidoItem from "./Item";
import ContenidoMision from "./Mision";
import { Drawer, Form, Button, Col, Row, Select, Cascader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../Utils/Socket/socket";

const opciones = [
  {
    value: "Item",
    label: "item",
  },
  {
    value: "puntos",
    label: "Puntos",
  },
  {
    value: "mision",
    label: "Mision",
  },
];

function FormNotificaciones({ visible, setVisible }) {
  const [tipo, setTipo] = useState("");
  const [puntos, setPuntos] = useState(10);
  const [nombreMision, setNombreMision] = useState("");
  const [descMision, setDescMision] = useState("");
  const [tipoRecompensa, setTipoRecompensa] = useState("");
  const [nombreItem, setNombreItem] = useState("");
  const [descripcionItem, setDescripcionItem] = useState("");
  const [datosRecompensa, setDatosRecompensa] = useState({ puntos: 0 });

  let keyTo = useSelector((state) => state.invitado.keyId);

  useEffect(() => {
    console.log("La key: ", keyTo);
    console.log("El estado", tipo);
  }, [tipo]);

  const handleTipoNoti = (value) => {
    setTipo(value);
  };

  const handleEnviar = () => {
    setVisible(false);
    let data = {};
    if (tipo == "mision") {
      data = {
        nombreMision,
        descMision,
        tipoRecompensa,
        recompensa: datosRecompensa,
        tipo,
        to: keyTo,
      };
      console.log("Hemos registrado una misión: ", data);
    } else if (tipo == "puntos") {
      data = {
        puntos,
        tipo,
        to: keyTo,
      };
    } else {
      data = {
        nombreItem,
        descripcionItem,
        tipo,
        to: keyTo,
      };
    }

    socket.emit("creandoNotificacion", data);
  };

  return (
    <Drawer
      title={<h2 style={{ marginTop: "20px" }}>Nueva notificación</h2>}
      width={720}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleEnviar} type="primary">
            Enviar
          </Button>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row glutter={24} style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <Cascader
              options={opciones}
              placeholder="Selecciona el tipo de notificación"
              onChange={(value) => handleTipoNoti(value)}
            />
          </Col>
        </Row>
        {tipo[0] == "puntos" ? (
          <ContenidoPuntos puntos={puntos} setPuntos={setPuntos} />
        ) : tipo == "Item" ? (
          <ContenidoItem
            setDescription={setDescripcionItem}
            setNombre={setNombreItem}
          />
        ) : (
          <ContenidoMision
            setNombre={setNombreMision}
            setDescripcion={setDescMision}
            setTipoRecompensa={setTipoRecompensa}
            tipoRecompensa={tipoRecompensa}
            setDatosRecompensa={setDatosRecompensa}
          />
        )}
      </Form>
    </Drawer>
  );
}

export default FormNotificaciones;
