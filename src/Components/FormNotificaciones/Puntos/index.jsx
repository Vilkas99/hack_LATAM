import React from "react";
import { Form, Col, Row, Slider, InputNumber } from "antd";

function ContenidoPuntos({ puntos, setPuntos }) {
  return (
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item
          label="Puntos"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la cantidad de puntos",
            },
          ]}
        >
          <Col span={12}>
            <Slider
              min={10}
              max={500}
              onChange={(value) => setPuntos(value)}
              value={puntos}
            />
          </Col>
          <Col span={12}>
            <InputNumber
              min={10}
              max={500}
              style={{ margin: "0 16px" }}
              value={puntos}
              onChange={(value) => setPuntos(value)}
            />
          </Col>
        </Form.Item>
      </Col>
    </Row>
  );
}

export default ContenidoPuntos;
