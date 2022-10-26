export const Container: React.FC<{ children: JSX.Element | JSX.Element[]}> = (props) => {
    return (
        <div className='container-sm shadow mb-5 mt-4 p-3 bg-body rounded'>
            {
               props.children
            }
        </div>
    )
}