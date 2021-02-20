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
<img src={habilidad.icono} style={{ width: '48px', height: '48px' }} />
       /* <Popover content={content} title={habilidad.nombre} trigger="hover">
            
        </Popover>*/
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
