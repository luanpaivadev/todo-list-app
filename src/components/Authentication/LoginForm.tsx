import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import Title from "../shared/Title"

interface User {
    username: string
    password: string
}

const LoginForm = () => {

    const [open, setOpen] = useState(false);
    const userInit: User = { username: '', password: '' }
    const [user, setUser] = useState(userInit)
    const [alert, setAlert] = useState('')

    function handleUser(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    function login() {

        setOpen(!open);

        axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: 'http://localhost:8081/v1/login',
            params: user
        }).then(response => {
            const token = response.data.access_token
            if (token == null) {
                setAlert('Usuário ou senha inválidos')
            }
            console.log(token)
            setAlert('')
            setOpen(false);
        }).catch(error => {
            if (error.response) {
                if (error.response.data.includes('User not found')) {
                    setAlert('Usuário ou senha inválidos.')
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: error.message
                })
            }
            setOpen(false);
        })

    }

    return (

        <Container maxWidth="sm">

            <Box sx={{
                backgroundColor: '#2A2A2B',
                padding: 3,
                mt: 10
            }} component='form'>

                <Stack spacing={2}>

                    <Title text="Login" />

                    {
                        // CRIAR COMPONENTE DE MENSAGEM
                        alert.length != 0 &&
                        <div className="form-text text-center mt-3" style={{
                            color: 'red'
                        }}>{alert}</div>
                    }

                    <TextField sx={{
                        width: '100%',
                        mt: 3
                    }}
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        name="username"
                        onChange={handleUser}
                    />

                    <TextField sx={{
                        width: '100%',
                        mt: 3
                    }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleUser} />

                    <Button
                        sx={{
                            width: '100%',
                            height: 50,
                            mt: 3
                        }}
                        disabled={user.username == '' || user.password == '' ? true : false}
                        variant="contained"
                        onClick={login}>
                        Login
                    </Button>

                    <div className="form-text text-center mt-3">v1.0.0-Alpha</div>

                </Stack>

            </Box>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </Container>

    )
}

export default LoginForm