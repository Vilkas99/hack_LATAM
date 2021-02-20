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
    titulo: "Esta es la primera misión",
    descripcion: "Esta es una descripción",
    recompensa: "500 puntos extra",
    tipoRecompensa: "puntos",
    color: "#42d469",
    nivel: 1.5,
    ID: "ASDADASDAS",
  },
  {
    titulo: "Esta es la segunda misión",
    descripcion: "Esta es otra descripción",
    nivel: 5,
    recompensa: "Item legendario",
    tipoRecompensa: "item",
    color: "#7842f5",
    ID: "ASDASDAS",
  },
  {
    titulo: "Esta es la tercera misión",
    descripcion: "Esta es otra descripción",
    nivel: 2,
    recompensa: "500 puntos extra",
    tipoRecompensa: "puntos",
    color: "#42d469",
    ID: "ASDASDAS",
  },
  {
    titulo: "Esta es la tercera misión",
    descripcion: "Esta es otra descripción",
    nivel: 2,
    recompensa: "500 puntos extra",
    tipoRecompensa: "puntos",
    color: "#42d469",
    ID: "ASDASDAS",
  },
  {
    titulo: "Esta es la tercera misión",
    descripcion: "Esta es otra descripción",
    nivel: 2,
    recompensa: "500 puntos extra",
    tipoRecompensa: "puntos",
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
    notification.info({
      message: `Quest enviada`,
      description: `¡Se ha notificado al profesor que has terminado: ${mision.titulo} !`,
      placement: "topLeft",
    });
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
              <h3 style={{ color: mision.color }}>{mision.recompensa}</h3>
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
        {misMisiones.map((mision) => (
          <Row>
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
