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
  MailTwoTone,
  BulbTwoTone,
  TrophyTwoTone
} from "@ant-design/icons";

import "../PerfilComp/index.scss";

let user = {
  name: "Escanor Del Sol",
  type: "STUDENT",
  icon: "",
  level: 10,
  points: 1452,
  email: "escanor@gmail.com",
};

const CardPerfil = ({ user }) => {
  const { Text } = Typography;

  return (
    <div>
      <div class="img-avatar">
        <Text className="avatar">{user.level}</Text>
      </div>
      <div class="card-text">
        <div class="portada"></div>
        <div class="title-total">
          <div class="title">{user.type}</div>
          <h2 className="h2-name">{user.name}</h2>
          <div className="subtitle">{user.points} points</div>

          <div class="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            illo, omnis accusantium numquam saepe ullam voluptates
            necessitatibus alias provident odio!
          </div>
          <div class="actions">
            <Popover
              placement="right"
              content={
                <div>
                  <h3 style={{ color: "#4b16a0" }}>{user.email}</h3>
                </div>
              }
            >
              <MailTwoTone className="btn-icon" twoToneColor="#4b16a0"/>
            </Popover>

            <Popover
              placement="right"
              content={
                <div>
                  <h3 style={{ color: "#4b16a0" }}>Mago de las ideas</h3>
                </div>
              }
            >
              <BulbTwoTone className="btn-icon" twoToneColor="#4b16a0"/>
            </Popover>

            <Popover
              placement="right"
              content={
                <div>
                  <h3 style={{ color: "#4b16a0" }}>Trofeo por participación</h3>
                </div>
              }
            >
              <TrophyTwoTone  className="btn-icon" twoToneColor="#4b16a0"/>
            </Popover>

          </div>
        </div>
      </div>
    </div>
  );
};

export default function QuestLog({ visible, modEstado }) {
  //   const [misMisiones, setMisiones] = useState(misiones_inicial);

  return (
    <Modal
      title="Perfil"
      centered
      visible={visible}
      onOk={() => modEstado(false)}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <CardPerfil user={user} />
    </Modal>
  );
}
