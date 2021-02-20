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
    Input,
    Image,
    Popover,
    notification,
} from "antd";
import {
    UserOutlined,
    EuroCircleTwoTone,
    CrownTwoTone,
} from "@ant-design/icons";

import socket from "../../Utils/Socket/socket";

let items_inicial = [
    {
        icono: 'https://img.icons8.com/color/48/000000/mana.png',
        nombre: 'Mana',
        descripcion: 'Agûita para refrescarse',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/diamond-ring.png',
        nombre: 'Anillo de invisibilidad',
        descripcion: 'Puedes apagar la camara durante la sesion',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/magical-scroll.png',
        nombre: 'Receta secreta',
        descripcion: 'Aumenta experiencia',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/dice.png',
        nombre: 'Dado mágico',
        descripcion: 'Dependiendo del valor resultante se multiplican tus puntos',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/shield.png',
        nombre: 'Escudo',
        descripcion: 'Te protege de una amonestacion',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/poison-bottle.png',
        nombre: 'Pocion de veneno',
        descripcion: 'CUIDADO no consumir',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/greek-helmet.png',
        nombre: 'Casco de guerra',
        descripcion: 'Para mas FPS',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/three-leaf-clover.png',
        nombre: 'Trévol de suerte',
        descripcion: 'Aumenta la posibilidad de que te toque participar y sumar puntos',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/snorlax.png',
        nombre: 'Snorlax',
        descripcion: 'Te libra de una penalizacion por llegar tarde por quedarte dormido',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/buzzer.png',
        nombre: 'Botón de participación',
        descripcion: 'Te permite participar en el siguiente turno y ganar experiencia.',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/remove-book.png',
        nombre: 'Reducir tarea (Item Especial)',
        descripcion: 'Reduce la cantidad de tarea asignada por el profesor segun su criterio, para hacer uso de este item tienen que activarlo todos en la clase.',
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/story-time.png',
        nombre: 'Tiempo extra (Item Especial)',
        descripcion: 'Aumenta el tiempo de una práctica o examen para los estudiantes segun el criterio del profesor, para hacer uso de este item tienen que activarlo todos en la clase.',
    },
];


const { Search } = Input;

const TarjetaInventario = ({ habilidad, setHabilidad, habilidades }) => {
    const { Text } = Typography;
    const socketRef = useRef(); //Socket

    useEffect(() => {
        socketRef.current = socket; //Conectamos el socjet
    }, []);

    const handleClick = (e, habilidad) => {
        e.preventDefault();
        notification.info({
            message: `Habilidad Activada`,
            description: `¡Acabas de utlitizar la habilidad: ${habilidad.nombre} !`,
            placement: "topLeft",
        });
        socketRef.current.emit("Habilidad Activada", {
            titulo: habilidad.nombre,
            usuario: "Reemplazar por nombre",
        });
        setHabilidad(habilidades.filter((elemento) => elemento != habilidad));
    };

    const content = (
        <h6 style={{ marginTop: "15px", marginRight: "20px" }}>
            {habilidad.descripcion}
        </h6>
    );

    return (
        <Button
            style={{ width: '48px', height: '48px',padding:'0', margin:'10px'}}
            onClick={(e) => handleClick(e, habilidad)}
        >
            <Popover content={content} title={habilidad.nombre} trigger="hover">
                <img src={habilidad.icono} style={{ width: '48px', height: '48px' }} />
            </Popover>
        </Button>

    )
}


const onSearch = value => console.log(value);
function Inventary({ visible, modEstado }) {
    const [misItems, setItems] = useState(items_inicial);

    return (
        <Modal
            title="Inventario"
            centered
            visible={visible}
            onOk={() => modEstado(false)}
            cancelButtonProps={{ style: { display: "none" } }}
        >
            <Col>
                <Row>
                    <Search placeholder="Buscar en el inventario" allowClear onSearch={onSearch} style={{ width: 300 }} />
                </Row>
                <Row>
                    <Card>
                        {misItems.map((item, i) => (
                            <TarjetaInventario key={i}
                                habilidad={item}
                                setHabilidad={setItems}
                                habilidades={misItems}
                            />
                        ))}
                    </Card>
                </Row>
            </Col>
        </Modal>
    )
}


export default Inventary
