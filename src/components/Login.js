import React from "react"
import {Link,withRouter} from "react-router-dom"

class Login extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props.login);
        //props.login("to get token");
        this.onSubmit = this.onSubmit.bind(this)
        this.token = localStorage.getItem('authtoken')
        console.log(this.token)
        if(this.token !== ''){
            this.props.history.push('/')
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target)
        const res = await fetch('http://localhost:8000/api/user/token/', {
            method: 'POST',
            body: data,
            headers: new Headers({
                'Accept': 'application/json',
            })
        })
        console.log(res.status)
        const d= await res.json()
        console.log(d)
        if(res.status === 200 && (d.token !== '' || d.token !== null) ){
            localStorage.setItem('authtoken','Token '+d.token)
            this.props.history.push('/');
        }
    }

    render() {
        return <div>
            <form name='loginform' onSubmit={this.onSubmit}>
                email : <input type='email' name='email'/><br/>
                password : <input type='password' name='password'/><hr/>
                <input type='submit' value='Login'/>
            </form>
            Not yet registered? <Link to="/register">Register Now!</Link>
        </div>
    }
}

export default withRouter(Login)
