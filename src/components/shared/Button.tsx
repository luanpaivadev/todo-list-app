interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <div className="d-grid gap-2 mb-4">
            <button {...props}>
                {props.text}
            </button>
        </div>
    )
}

export default Button