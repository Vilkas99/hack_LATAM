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

const openNotification = ({ tipo, titulo, descripcion, visible }) => {
    if (visible) {
        return (
            notification[{ tipo }]({
                message: { titulo },
                description:
                    { descripcion },
            }
            )
        )
    }
}


function Notification({ tipo, titulo, descripcion, visible }) {
    return (
        openNotification(visible)
    )
}

export default Notification
