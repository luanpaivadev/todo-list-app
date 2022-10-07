declare interface HeaderComponentProps {
    title: string
}

export const HeaderComponent: React.FC<HeaderComponentProps> = (props) => {
    return (
        <div>
            <h2 className='text-center mb-4'><strong>{props.title}</strong></h2>
        </div>
    )
}