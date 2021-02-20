import React from "react";
import { Form, Col, Row, Input } from "antd";

function ContenidoItem({ setNombre, setDescription }) {
  return (
    <Row>
      <Col span={12}>
        <Form.Item
          label="Nombre Item"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el nombre del item",
            },
          ]}
        >
          <Input
            placeholder="Nombre"
            onChange={(event) => setNombre(event.target.value)}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Descripción Item"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la descripción del item",
            },
          ]}
        >
          <Input
            placeholder="Descripción"
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default ContenidoItem;
