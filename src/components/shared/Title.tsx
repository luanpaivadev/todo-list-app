declare interface TitleProps {
    text: string
}

export const Title: React.FC<TitleProps> = (props) => {
    return (
        <div>
            <h2 className='text-center mb-4'><strong>{props.text}</strong></h2>
        </div>
    )
}