export const ContainerComponent: React.FC<{ children: JSX.Element | JSX.Element[] }> = (props) => {
    return (
        <div className='container-sm shadow mt-1 p-4 rounded' style={{
            color: '#FFF',
            backgroundColor: '#2A2A2B',
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0
        }}>
            {
                props.children
            }
        </div>
    )
}