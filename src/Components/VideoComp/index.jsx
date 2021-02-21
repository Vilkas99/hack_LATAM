import React, { useEffect, useState } from "react";
import { Row, Col, Card, Avatar, Typography, Space, Button } from "antd";
import {
  UserOutlined,
  HeatMapOutlined,
  QuestionCircleOutlined,
  BulbTwoTone,
  DollarTwoTone,
  ThunderboltTwoTone,
  NotificationTwoTone,
  VideoCameraFilled,
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { useGlobal } from "../../Utils/Global";
import QuestLog from "../QuestLog";
import Inventary from "../Inventary/index";
import PerfilComp from "../PerfilComp";
import FormNotificaciones from "../FormNotificaciones";
import { useDispatch, useSelector } from "react-redux";

const Descripcion = ({ datos }) => {
  const { Text } = Typography;
  return (
    <Row>
      <Space direction="horizontal">
        <BulbTwoTone />
        <Text strong>Nivel: {datos.level}</Text>
        <DollarTwoTone />
        <Text strong>Puntos: {datos.points}</Text>
        <ThunderboltTwoTone />
        <Text strong>Misiones completadas: 10</Text>
      </Space>
    </Row>
  );
};

const Botones = ({ tipo }) => {
  const [visibleQuest, setVisibleQuest] = useState(false);
  const [visibleItems, setVisibleItems] = useState(false);
  const [visiblePerfil, setVisiblePerfil] = useState(false);
  const [visibleFormNoti, setVisibleFormNoti] = useState(false);
  return (
    <Row style={{ marginTop: "20px" }}>
      <Space direction="horizontal">
        {tipo == "TEACHER" ? (
          <Button
            icon={<NotificationTwoTone />}
            onClick={() => setVisibleFormNoti(true)}
          >
            Notificación
          </Button>
        ) : (
          <>
            {" "}
            <Button
              icon={<UserOutlined />}
              onClick={() => setVisiblePerfil(true)}
            >
              Perfil
            </Button>
            <Button
              icon={<QuestionCircleOutlined />}
              onClick={() => setVisibleQuest(true)}
            >
              Misiones
            </Button>
            <Inventary visible={visibleItems} modEstado={setVisibleItems} />
            <Button
              icon={<HeatMapOutlined />}
              onClick={() => setVisibleItems(true)}
            >
              Items
            </Button>
          </>
        )}

        <QuestLog visible={visibleQuest} modEstado={setVisibleQuest} />
        <PerfilComp visible={visiblePerfil} modEstado={setVisiblePerfil} />

        <FormNotificaciones
          visible={visibleFormNoti}
          setVisible={setVisibleFormNoti}
        />
      </Space>
    </Row>
  );
};

const ContenidoCard = ({ tipo, datos }) => {
  const { Meta } = Card;
  return (
    <Meta
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      title={datos.name} //Reemplazar por el nombre del usuario
      description={
        tipo != "Partner" && (
          <Col>
            {datos.type == "STUDENT" && <Descripcion datos={datos} />}

            <Botones tipo={datos.type} />
          </Col>
        )
      }
    />
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

function VideoComponente({ userVideo, tipo }) {
  let datosUs = useSelector((state) => state.user.metaDatos);
  let datosInv = useSelector((state) => state.invitado.metaDatos);

  const { currentMicrophone, currentVideo } = useGlobal();
  console.log("Micro:", currentMicrophone);
  console.log("Video:", currentVideo);

  useEffect(() => {
    console.log("Mis datos: ", datosUs);
    console.log("Video usuario: ", userVideo);
  }, []);

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
          <NoCamera />
        )
      }
    >
      <MicCam />
      <ContenidoCard tipo={tipo} datos={tipo == "Us" ? datosUs : datosInv} />
    </Card>
  );
}

export default VideoComponente;
