import React, { useState } from "react";
import { Form, Col, Row, Input, Cascader, Button } from "antd";
import ContenidoItem from "../Item";
import ContenidoPuntos from "../Puntos";

const opciones = [
  {
    value: "item",
    label: "Item",
  },
  {
    value: "puntos",
    label: "Puntos",
  },
];

function ContenidoMision({
  setNombre,
  setDescripcion,
  setTipoRecompensa,
  tipoRecompensa,
  setDatosRecompensa,
}) {
  const [puntos, setPuntos] = useState(0);
  const [nombre, setNombreItem] = useState(0);
  const [descripcion, setDescripcionItem] = useState("");

  const handleRecompensa = () => {
    let data = {};
    if (tipoRecompensa == "puntos") {
      data = { puntos };
    } else {
      data = { nombreItem: nombre, descripcionItem: descripcion };
    }
    console.log("Hemos creado la recompensa: ", data);
    setDatosRecompensa(data);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Nombre misión"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre de la mision",
              },
            ]}
          >
            <Input
              placeholder="Nombre"
              onChange={(event) => {
                setNombre(event.target.value);
                console.log("Nombre mision: ", event.target.value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Descripcion"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el tipo de recompensa",
              },
            ]}
          >
            <Input onChange={(event) => setDescripcion(event.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Tipo de recompensa"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el tipo de recompensa",
              },
            ]}
          >
            <Cascader
              options={opciones}
              onChange={(value) => setTipoRecompensa(value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          {tipoRecompensa == "puntos" ? (
            <ContenidoPuntos puntos={puntos} setPuntos={setPuntos} />
          ) : tipoRecompensa == "item" ? (
            <ContenidoItem
              setDescription={setDescripcionItem}
              setNombre={setNombreItem}
            />
          ) : (
            <h2>Todo lo demas</h2>
          )}
          <Button onClick={handleRecompensa}>Confirmar recompensa</Button>
        </Col>
      </Row>
    </>
  );
}

export default ContenidoMision;
