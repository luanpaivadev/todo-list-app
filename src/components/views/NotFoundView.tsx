import { Link } from "react-router-dom"

const NotFoundView = () => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <h1 style={{
                color: '#09f',
                fontWeight: 900
            }}>404</h1>
            <p>Página não encontrada!</p>
            <Link to={"/home"} style={{
                color: '#09f',
                textDecoration: 'none',
                fontSize: 14
            }}>
                Voltar para home
            </Link>
        </div>
    )
}

export default NotFoundView