import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { useState } from "react"
import Title from "../shared/Title"

interface User {
    username: string
    password: string
}

const LoginForm = () => {

    const userInit: User = { username: '', password: '' }
    const [user, setUser] = useState(userInit)

    function handleUser(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    function login() {

        console.log(user)

        axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: 'http://localhost:8081/v1/login',
            data: JSON.stringify(user)
        }).then(response => {
            console.log(response.data)
        }).catch(error => {
            if (error instanceof Error) {
                console.log(error.message)
            }
        })

    }

    return (

        <Container maxWidth="sm">

            <Box sx={{
                backgroundColor: '#2A2A2B',
                padding: 3,
                mt: 10
            }} component='form'>

                <Title text="Login" />

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

                <Button sx={{
                    width: '100%',
                    height: 50,
                    mt: 3
                }} variant="contained" onClick={login}>Login</Button>

                <div className="form-text text-center mt-3">v1.0.0-Alpha</div>
            </Box>
            
        </Container>

    )
}

export default LoginForm