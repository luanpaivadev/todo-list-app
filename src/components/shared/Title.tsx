declare interface TitleProps {
    text: string
    marginTop?: string
    marginBotton?: string
}

export const Title: React.FC<TitleProps> = (props) => {
    return (
        <div>
            <h2 className={`text-center mt-${props.marginTop} mb-${props.marginBotton}`}>
                <strong>{props.text}</strong>
            </h2>
        </div>
    )
}