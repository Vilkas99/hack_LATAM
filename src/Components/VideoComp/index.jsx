import React, { useEffect, useState } from "react";
import { Row, Col, Card, Avatar, Typography, Space, Button } from "antd";
import {
  UserOutlined,
  HeatMapOutlined,
  QuestionCircleOutlined,
  BulbTwoTone,
  DollarTwoTone,
  ThunderboltTwoTone,
} from "@ant-design/icons";

import QuestLog from "../QuestLog";

const Descripcion = () => {
  const { Text } = Typography;
  return (
    <Row>
      <Space direction="horizontal">
        <BulbTwoTone />
        <Text strong>Nivel: 24</Text>
        <DollarTwoTone />
        <Text strong>Puntos: 350</Text>
        <ThunderboltTwoTone />
        <Text strong>Misiones completadas: 10</Text>
      </Space>
    </Row>
  );
};

const Botones = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Row style={{ marginTop: "20px" }}>
      <Space direction="horizontal">
        <Button icon={<UserOutlined />}>Perfíl</Button>
        <Button
          icon={<QuestionCircleOutlined />}
          onClick={() => setVisible(true)}
        >
          Misiones
        </Button>
        <Button icon={<HeatMapOutlined />}>Items</Button>
        <QuestLog visible={visible} modEstado={setVisible} />
      </Space>
    </Row>
  );
};

const ContenidoCard = () => {
  const { Meta } = Card;
  return (
    <Meta
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      title="Víctor Mancera" //Reemplazar por el nombre del usuario
      description={
        <Col>
          <Descripcion />
          <Botones />
        </Col>
      }
    />
  );
};

function VideoComponente({ userVideo }) {
  useEffect(() => {
    console.log("Video usuario: ", userVideo);
  }, []);

  return (
    <Card
      style={{ width: 450 }}
      cover={<video playsInline muted ref={userVideo} autoPlay />}
    >
      <ContenidoCard />
    </Card>
  );
}

export default VideoComponente;
