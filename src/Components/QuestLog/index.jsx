import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Space,
  Button,
  Modal,
  Rate,
  Popover,
  notification,
} from "antd";
import {
  UserOutlined,
  EuroCircleTwoTone,
  CrownTwoTone,
} from "@ant-design/icons";

import socket from "../../Utils/Socket/socket";

let misiones_inicial = [
  {
    titulo: "Termodinámica FTW!",
    descripcion: "Esta es una descripción",
    recompensaTxt: "200 puntos extra",
    recompensa: 200,
    tipo: "puntos",
    color: "#42d469",
    nivel: 1.5,
    ID: "ASDADASDAS",
  },
  {
    titulo: "A por ellos sí señor",
    descripcion: "Esta es otra descripción",
    nivel: 5,
    recompensaTxt: "Item legendario",
    recompensa: {
      nombreItem: "Capa de la verdad",
      descripcionItem: "Una capa que dice unas cuantas mentiras",
    },
    tipo: "item",
    color: "#7842f5",
    ID: "ASDASDAS",
  },
  {
    titulo: "Jefe final",
    descripcion: "Esta es otra descripción",
    nivel: 2,
    recompensaTxt: "500 puntos extra",
    recompensa: 500,
    tipo: "puntos",
    color: "#42d469",
    ID: "ASDASDAS",
  },
  {
    titulo: "Destrucción del cálculo!",
    descripcion: "Esta es otra descripción",
    nivel: 2,
    recompensaTxt: "Espada de la justicia",
    recompensa: {
      nombreItem: "Espada de la justicia",
      descripcionItem: "Es una espada que mola mucho!",
    },
    tipo: "item",
    color: "#42d469",
    ID: "ASDASDAS",
  },
  {
    titulo: "A por las matemáticas",
    descripcion: "Esta es otra descripción",
    nivel: 2,
    recompensaTxt: "100 puntos extra",
    recompensa: 100,
    tipo: "puntos",
    color: "#42d469",
    ID: "ASDASDAS",
  },
];

const TarjetaMision = ({ mision, setMision, misiones }) => {
  const { Text } = Typography;
  const socketRef = useRef(); //Socket

  useEffect(() => {
    socketRef.current = socket; //Conectamos el socjet
  }, []);

  const handleClick = (e, mision) => {
    e.preventDefault();
    let miData = {};
    notification.info({
      message: `Quest enviada`,
      description: `¡Se ha notificado al profesor que has terminado: ${mision.titulo} !`,
      placement: "topLeft",
    });

    if (mision.tipo == "puntos") {
      miData = {
        titulo: mision.titulo,
        usuario: "Reemplazar por nombre",
        tipo: mision.tipo,
        puntos: mision.recompensa,
      };
    } else {
      miData = {
        titulo: mision.titulo,
        usuario: "Reemplazar por nombre",
        tipo: mision.tipo,
        nombreItem: mision.recompensa.nombreItem,
        descripcionItem: mision.recompensa.descripcionItem,
      };
    }

    socketRef.current.emit("QuestCompletado", {
      titulo: mision.titulo,

      usuario: "Reemplazar por nombre",
    });
    setMision(misiones.filter((elemento) => elemento != mision));
  };

  return (
    <Card
      title={
        <Space direction="horizontal" align="center">
          <h3 style={{ marginTop: "15px", marginRight: "20px" }}>
            {mision.titulo}
          </h3>

          <Rate allowHalf defaultValue={mision.nivel} disabled />
        </Space>
      }
      size="small"
      style={{ width: "100vw", margin: "10px" }}
    >
      <Col span={24}>
        <Space style={{ padding: "0px 15px" }} direction="vertical">
          <Text>{mision.descripcion}</Text>
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={(e) => handleClick(e, mision)}
          >
            Entregar
          </Button>
        </Space>
        <Popover
          placement="right"
          content={
            <div>
              <h3 style={{ color: mision.color }}>{mision.recompensaTxt}</h3>
            </div>
          }
        >
          {mision.tipoRecompensa == "puntos" ? (
            <EuroCircleTwoTone
              style={{
                fontSize: "30px",
                position: "absolute",
                right: 40,
                top: 20,
              }}
            />
          ) : (
            <CrownTwoTone
              style={{
                fontSize: "30px",
                position: "absolute",
                right: 40,
                top: 20,
              }}
            />
          )}
        </Popover>
      </Col>
    </Card>
  );
};

export default function QuestLog({ visible, modEstado }) {
  const [misMisiones, setMisiones] = useState(misiones_inicial);

  return (
    <Modal
      title="Bitácora de misiones"
      centered
      visible={visible}
      onOk={() => modEstado(false)}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Col>
        {misMisiones.map((mision, i) => (
          <Row key={i}>
            <TarjetaMision
              mision={mision}
              setMision={setMisiones}
              misiones={misMisiones}
            />
          </Row>
        ))}
      </Col>
    </Modal>
  );
}
