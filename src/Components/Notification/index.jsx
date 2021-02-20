import React from 'react';
import { Button, notification, Space } from 'antd';

/*
const openNotificationWithIcon = ({ titulo, descripcion, type }) => {
    notification[type]({
        message: { titulo },
        description:
            { descripcion },
    });
};
*/


function Notification({ tipo, titulo, descripcion, visible }) {
    return (
        openNotification(tipo, titulo, descripcion,visible)
    )
}

export default Notification
