import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import AchievementComp from "../AchievementsComp";
let user = {
  name: "Escanor Del Sol",
  type: "STUDENT",
  icon: "",
  level: 10,
  points: 1452,
  email: "escanor@gmail.com",
};

let frases = [
  {
    autor: "Nelson Mandela",
    descripcion: "Siempre parece imposible hasta que se hace",
  },
  {
    autor: "Jim Yyun",
    descripcion: "La motivación es lo que te pone en marcha, el hábito es lo que hace que sigas",
  },
  {
    autor: "Confucio",
    descripcion: "Estudia el pasado si quieres intuir el futuro",
  },
  {
    autor: "Jim Rohn",
    descripcion: "Si no te gusta cómo son las cosas, cámbialas",
  },
  {
    autor: "John R. Wooden",
    descripcion: "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer",
  },
  {
    autor: "Virgilio",
    descripcion: "La buena fortuna favorece a los atrevidos",
  },
  {
    autor: "Tiger Woods",
    descripcion: "Siempre se puede ser mejor",
  },
  {
    autor: "Thomas Edison",
    descripcion: "No hay un sustituto para el trabajo duro",
  },
  {
    autor: "Michael Jordan",
    descripcion: "He fallado una y otra vez a lo largo de mi vida. Es por eso por lo que he tenido éxito",
  },
  {
    autor: "Séneca",
    descripcion: "Sin estudiar enferma el alma",
  },
  {
    autor: "George Saville",
    descripcion: "El hombre que es un maestro de la paciencia es un maestro de todo lo demás",
  },
  {
    autor: "Proverbio chino",
    descripcion: "Un libro es como un jardín que se puede llevar en el bolsillo",
  },
  {
    autor: "Thomas Edison",
    descripcion: "Si hiciésemos todas las cosas de las que somos capaces, nos asombraríamos",
  },
  {
    autor: "Thomas Jefferson",
    descripcion: "Cuanto más trabajo, más suerte parezco tener",
  },
  {
    autor: "John Ruskiin",
    descripcion: "La calidad nunca es un accidente, siempre es resultado de un esfuerzo de la inteligencia",
  },
  {
    autor: "Norman Vincent Peale",
    descripcion: "Cambia tus pensamientos y cambiarás tu mundo",
  },
  {
    autor: "Martin Luther King",
    descripcion: "Tus talentos y habilidades irán mejorando con el tiempo, pero para eso has de empezar",
  },
  {
    autor: "Mahatma Gandhi",
    descripcion: "La verdadera educación consiste en obtener lo mejor de uno mismo",
  },
  {
    autor: "Edmund Burke",
    descripcion: "Nuestra paciencia conseguirá más cosas que nuestra fuerza",
  },
  {
    autor: "Helen Exley",
    descripcion: 'Los libros son peligrosos. Los mejores deberían ser etiquetados con un "Esto podría cambiar tu vida"',
  },
];


const Buttons = ({ user }) => {
  const [visibleAchievements, setVisibleAchievements] = useState(false);
  let indice = Math.floor(Math.random() * frases.length);
  return (
    <div class="actions">
      <Popover
        placement="right"
        content={
          <div>
            <h3 style={{ color: "#4b16a0" }}>{user.email}</h3>
          </div>
        }
      >
        <MailTwoTone className="btn-icon" twoToneColor="#4b16a0" />
      </Popover>

      <Popover
        title={
          frases[indice].autor
        }
        placement="right"
        content={
          <div>
            <h3 style={{ color: "#4b16a0" }}>{
              frases[indice].descripcion
            }</h3>

          </div>
        }
      >
        <BulbTwoTone className="btn-icon" twoToneColor="#4b16a0" />
      </Popover>

      <Popover
        placement="right"
        content={
          <div>
            <h3 style={{ color: "#4b16a0" }}>Achievements</h3>
          </div>
        }
      >
        <TrophyTwoTone
          className="btn-icon"
          twoToneColor="#4b16a0"
          onClick={() => setVisibleAchievements(true)}
        />
      </Popover>
      <AchievementComp
        visible={visibleAchievements}
        modEstado={setVisibleAchievements}
      />
    </div>
  );
};

const CardPerfil = ({ datos }) => {
  const { Text } = Typography;

  return (
    <div>
      <div class="img-avatar">
        <Text className="avatar">{datos.level}</Text>
      </div>
      <div class="card-text">
        <div class="portada"></div>
        <div class="title-total">
          <div class="title">{datos.type}</div>
          <h2 className="h2-name">{datos.name}</h2>
          <div className="subtitle">{datos.points} points</div>

          <div class="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            illo, omnis accusantium numquam saepe ullam voluptates
            necessitatibus alias provident odio!
          </div>
          <Buttons user={datos} />
        </div>
      </div>
    </div>
  );
};

export default function PerfilComp({ visible, modEstado }) {
  //   const [misMisiones, setMisiones] = useState(misiones_inicial);
  const datos = useSelector((state) => state.user.metaDatos);
  return (
    <Modal
      title="Profile"
      centered
      visible={visible}
      onOk={() => modEstado(false)}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <CardPerfil datos={datos} />
    </Modal>
  );
}
