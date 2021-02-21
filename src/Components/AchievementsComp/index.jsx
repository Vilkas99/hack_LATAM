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
import { MailTwoTone, BulbTwoTone, TrophyTwoTone } from "@ant-design/icons";

import "../PerfilComp/index.scss";

let achievements = [
  {
    title: "Newbie",
    description: "Complete Level 1",
    icon: "https://i.ibb.co/dDdVD2L/information.png",
    status: "pending",
    date: "",
    ID: "1",
  },
  {
    title: "I'm new in Town",
    description: "Complete your first 5 levels",
    icon: "https://i.ibb.co/KhrxSTv/coin.png",
    status: "completed",
    date: "January 12 2021",
    ID: "2",
  },
  {
    title: "Ridiculus",
    description: "Complete a level with just one star",
    icon: "https://i.ibb.co/yXTHqYW/hero.png",
    status: "completed",
    date: "January 12 2021",
    ID: "3",
  },
  {
    title: "Good luck",
    description: "Complete your first 3 levels with 3 stars",
    icon: "https://i.ibb.co/dDdVD2L/information.png",
    status: "pending",
    date: "",
    ID: "4",
  },
  {
    title: "Nevermind",
    description: "Use Octoblue as character in level 30",
    icon: "https://i.ibb.co/dDdVD2L/information.png",
    status: "pending",
    date: "",
    ID: "5",
  },
];

let user = {
  name: "Escanor Del Sol",
  type: "STUDENT",
  icon: "",
  level: 10,
  points: 1452,
  email: "escanor@gmail.com",
};

const CardAchievement = ({ achievement, setAchievement, achievements }) => {
  const { Text } = Typography;

  return (
    <Popover
    placement="right"
    content={
      <div>
        <h4 style={{ color: "#4b16a0" }}>{(achievement.date)? "💪 " + achievement.date : "Aún no consigues este logro 🙁" }</h4>
      </div>
    }
  >
    <div
      style={{
        width: "900px",
        backgroundColor: "#f9f0ff",
        margin: "6px",
        borderRadius: "6px",
      }}
    >
      <div class="wrapper">
        <div style={{ float: "left", width: "30%", height: "100%" }}>
          <img
            className="rote"
            style={{
              width: "40%",
              display: "block",
              marginLeft: "30px",
              marginTop: "30px",              
            }}
            src={achievement.icon}
          />
        </div>
        <div style={{ float: "right", width: "70%", height: "100%" }}>
          <div style={{ padding: "1em", position: "relative" }}>
            <h1 style={{ color: "#4b16a0", fontSize: "20px" }}>
              {achievement.title}
            </h1>
            <p class="text">{achievement.description}</p>
          </div>
        </div>
      </div>
    </div>
  </Popover>
  );
};

export default function AchievementComp({ visible, modEstado }) {
  const [misAchievements, setAchievements] = useState(achievements);
  return (
    <Modal
      title="Achievements"
      centered
      visible={visible}
      onOk={() => modEstado(false)}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Col>
        {misAchievements.map((achievement, i) => (
          <Row key={i}>
            <CardAchievement
              achievement={achievement}
              setAchievement={setAchievements}
              achievements={misAchievements}
            />
          </Row>
        ))}
      </Col>
    </Modal>
  );
}
