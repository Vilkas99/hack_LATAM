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
    SearchOutlined,
} from "@ant-design/icons";

import socket from "../../Utils/Socket/socket";
import styles from '../Store/index.css';

let items_tienda = [
    {
        icono: 'https://img.icons8.com/color/48/000000/mana.png',
        nombre: 'Mana',
        descripcion: 'Agûita para refrescarse',
        precio: 200,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/diamond-ring.png',
        nombre: 'Anillo de invisibilidad',
        descripcion: 'Puedes apagar la camara durante la sesion',
        precio: 300,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/magical-scroll.png',
        nombre: 'Receta secreta',
        descripcion: 'Aumenta experiencia',
        precio: 500,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/dice.png',
        nombre: 'Dado mágico',
        descripcion: 'Dependiendo del valor resultante se multiplican tus puntos',
        precio: 1000,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/shield.png',
        nombre: 'Escudo',
        descripcion: 'Te protege de una amonestacion',
        precio: 1500,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/poison-bottle.png',
        nombre: 'Pocion de veneno',
        descripcion: 'CUIDADO no consumir',
        precio: 60,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/greek-helmet.png',
        nombre: 'Casco de guerra',
        descripcion: 'Para mas FPS',
        precio: 400,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/three-leaf-clover.png',
        nombre: 'Trévol de suerte',
        descripcion: 'Aumenta la posibilidad de que te toque participar y sumar puntos',
        precio: 900,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/snorlax.png',
        nombre: 'Snorlax',
        descripcion: 'Te libra de una penalizacion por llegar tarde por quedarte dormido',
        precio: 7000,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/buzzer.png',
        nombre: 'Botón de participación',
        descripcion: 'Te permite participar en el siguiente turno y ganar experiencia.',
        precio: 1500,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/remove-book.png',
        nombre: 'Reducir tarea (Item Especial)',
        descripcion: 'Reduce la cantidad de tarea asignada por el profesor segun su criterio, para hacer uso de este item tienen que activarlo todos en la clase.',
        precio: 9500,
    },
    {
        icono: 'https://img.icons8.com/color/48/000000/story-time.png',
        nombre: 'Tiempo extra (Item Especial)',
        descripcion: 'Aumenta el tiempo de una práctica o examen para los estudiantes segun el criterio del profesor, para hacer uso de este item tienen que activarlo todos en la clase.',
        precio: 9800,
    },
];

const { Search } = Input;

const TarjetaStore = ({ producto, setProducto, productos }) => {
    const { Text } = Typography;
    const socketRef = useRef(); //Socket

    useEffect(() => {
        socketRef.current = socket; //Conectamos el socjet
    }, []);

    const handleClick = (e, producto) => {
        e.preventDefault();
        notification.info({
            message: `Habilidad Comprada`,
            description: `¡Acabas de comprar la habilidad: ${producto.nombre}, por un total de ${producto.precio} puntos !`,
            placement: "topLeft",
        });
        socketRef.current.emit("Habilidad Activada", {
            titulo: producto.nombre,
            usuario: "Reemplazar por nombre",
        });
        setProducto(productos.filter((elemento) => elemento != producto));
    };

    const content = (
        <h4 style={{ marginTop: "15px", marginRight: "20px" }}>
            {producto.descripcion}
        </h4>
    );

    return (
        <Button
            style={{ width: '70px', height: '70px', padding: '0', margin: '10px', backgroundColor: '#E57C7E', borderColor: 'transparent', borderRadius: '5px', cursor: 'pointer' }}
            onClick={(e) => handleClick(e, producto)}
        >
            <Popover content={content} title={producto.nombre} trigger="hover">
                <div className="item-producto">
                    <img src={producto.icono} style={{ width: '60px', height: '60px', padding: '2px' }} />
                    <div class="precio">
                        <h4>{producto.precio} P</h4>
                    </div>
                </div>
            </Popover>
        </Button>

    )
}



function Store({ visible, modEstado }) {
    const [misProductos, setProductos] = useState(items_tienda);
    const hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    return (
        <Modal
            title="Tienda"
            centered
            visible={visible}
            onOk={() => modEstado(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okText="Salir"
        >
            <Col>
                <Row>
                    <div class="productos">
                        <h2 className="subtitulo-disp">Habilidades Disponibles</h2>
                        <div className="contenedor-primario">
                            {misProductos.map((item, i) => (
                                <TarjetaStore key={i}
                                    producto={item}
                                    setProducto={setProductos}
                                    productos={misProductos}
                                />
                            ))}
                        </div>
                    </div>
                </Row>
            </Col>
        </Modal>
    )
}


export default Store
