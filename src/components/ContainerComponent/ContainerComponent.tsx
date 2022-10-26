export const ContainerComponent: React.FC<{ children: JSX.Element | JSX.Element[] }> = (props) => {
    return (
        <div className='container-sm shadow mb-5 mt-4 p-3 bg-body rounded' style={{
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