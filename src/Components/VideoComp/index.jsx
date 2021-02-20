import React, { useState } from "react";
import { Row, Col, Card, Avatar, Typography, Space, Button } from "antd";
import {
  UserOutlined,
  HeatMapOutlined,
  QuestionCircleOutlined,
  BulbTwoTone,
  DollarTwoTone,
  ThunderboltTwoTone,
  VideoCameraFilled,
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { useGlobal } from "../../Utils/Global";
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

const MicCam = () => {
  const {
    changeMicro,
    currentMicrophone,
    changeVideo,
    currentVideo,
  } = useGlobal();

  return (
    <Row style={{ marginTop: "-70px", marginBottom: "50px" }}>
      <Space direction="horizontal">
        <Button
          style={{
            backgroundColor: currentVideo ? "#87ea26" : "red",
            borderStyle: "none",
          }}
          type="primary"
          shape="circle"
          icon={<VideoCameraFilled />}
          onClick={() => changeVideo()}
        />
        <Button
          style={{
            backgroundColor: currentMicrophone ? "#87ea26" : "red",
            borderStyle: "none",
          }}
          type="primary"
          shape="circle"
          icon={currentMicrophone ? <AudioOutlined /> : <AudioMutedOutlined />}
          onClick={() => changeMicro()}
        />
      </Space>
    </Row>
  );
};

const NoCamera = () => {

  return (
    <div style={{ height: 250, backgroundColor: "#bfbfbf" }}>
    <img
      src="https://i.ibb.co/G061H2N/b-1.png"
      style={{
        height: 180,
        width: 300,
        opacity: "40%",
        marginLeft: 45,
        marginTop: 10,
      }}
    />
  </div>
  );
};

function VideoComponente({ userVideo }) {
  const { currentMicrophone, currentVideo } = useGlobal();
  console.log("Micro:", currentMicrophone);
  console.log("Video:", currentVideo);
  return (
    <Card
      style={{ width: 450 }}
      cover={
        currentVideo ? (
          <video
            playsInline
            muted={!currentMicrophone}
            ref={userVideo}
            autoPlay
          />
        ) : (
         <NoCamera/>
        )
      }
    >
      <MicCam />
      <ContenidoCard />
    </Card>
  );
}

export default VideoComponente;
