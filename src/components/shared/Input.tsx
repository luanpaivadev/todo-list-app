const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <div className="mb-3">
            <input {...props} />
        </div>
    )
}

export default Input