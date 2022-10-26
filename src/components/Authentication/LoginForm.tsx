import Button from "../shared/Button"
import Input from "../shared/Input"
import Title from "../shared/Title"

const LoginForm = () => {
    return (
        <div className="container" style={{
            width: 600,
            backgroundColor: '#FFF',
            padding: 50
        }}>
            <form>
                <Title text="Login" />
                <Input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="E-mail"
                />
                <Input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Password"
                />
                <Button
                    type="submit"
                    className="btn btn-lg btn-primary"
                    text="Login"
                />
                <div className="form-text text-center">v1.0.0-Alpha</div>
            </form>
        </div>
    )
}

export default LoginForm