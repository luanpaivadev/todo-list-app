interface MessageProps {
    text: string
}

const Message: React.FC<MessageProps> = (props) => {
    return (
        <div className="form-text text-center mt-3" style={{
            color: 'red'
        }}>{props.text}</div>
    )
}

export default Message