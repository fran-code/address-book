import { useState, useEffect } from "react"
import Toast from "react-bootstrap/Toast"
import { IMessage } from '../utils/interfaces'

interface IProps {
    messageProps: IMessage;
    topInPx?: number;
}

const getColor = (status: string) => {
    switch (status) {
        case "success":
            return "greenText"
        case "error":
            return "redText"
        default:
            return "blackText"
    }
}

const Message: React.FC<IProps> = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.messageProps.time > 0) {
            setShow(true)
            setTimeout(() => setShow(false), 3000)
        }
    }, [props.messageProps.time])

    if (!show) return null
    
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'fixed',
                width: "max-content",
                top: props.topInPx || 70,
                zIndex: 1500,
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center"
            }}
        >
            <Toast
                show={true}
                onClose={() => setShow(false)}
            >
                <Toast.Header>
                    <strong className={`mr-auto ${getColor(props.messageProps.status)}`}>{props.messageProps.title}</strong>
                </Toast.Header>
            </Toast>
        </div>
    )
}

export default Message;