import React from "react";
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
} from "antd";

export default function QuestLog({ visible, modEstado }) {
  const { Text } = Typography;

  let misiones = [
    {
      titulo: "Esta es la primera misión",
      descripcion: "Esta es una descripción",
      reward: "https://img.icons8.com/officel/80/000000/galaxy.png",
      nivel: 1.5,
      ID: "ASDADASDAS",
    },
    {
      titulo: "Esta es la segunda misión",
      descripcion: "Esta es otra descripción",
      nivel: 5,
      reward: "https://img.icons8.com/color/96/000000/astronaut-helmet.png",
      ID: "ASDASDAS",
    },
    {
      titulo: "Esta es la tercera misión",
      descripcion: "Esta es otra descripción",
      nivel: 2,
      reward: "https://img.icons8.com/officel/80/000000/galaxy.png",
      ID: "ASDASDAS",
    },
  ];
  return (
    <Modal
      title="Agenda de misiones"
      centered
      visible={visible}
      onOk={() => modEstado(false)}
    >
      <Col>
        {misiones.map((mision) => (
          <Row>
            <Card
              title={
                <Space direction="horizontal" align="center">
                  <h3 style={{ marginTop: "15px", marginRight: "20px" }}>
                    Bitácora de misiones
                  </h3>

                  <Rate allowHalf defaultValue={mision.nivel} disabled />
                </Space>
              }
              size="small"
              style={{ width: "100vw", margin: "10px" }}
            >
              <Col span={12}>
                <Space style={{ padding: "0px 15px" }} direction="vertical">
                  <Avatar src={mision.reward} />
                  <Text>{mision.descripcion}</Text>
                  <Button type="primary" style={{ background: "green" }}>
                    Entregar
                  </Button>
                </Space>
              </Col>
            </Card>
          </Row>
        ))}
      </Col>
    </Modal>
  );
}
