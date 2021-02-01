import React from "react"

import {Link,withRouter} from "react-router-dom"

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.token = localStorage.getItem('authtoken')
        if(this.token !=null && this.token!==''){
            this.props.history.push('/')
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target)
        console.log(data);
        const res =await fetch('http://localhost:8000/api/user/register/', {
                method: 'POST',
                body: data,
                headers: new Headers({
                    Accept: 'application/json'
                })
            })
        console.log(res.status);
        if(res.status === 201){
            this.props.history.push('/login');
        }
    }

    render() {
        return <div>
            <form name='form1' onSubmit={this.onSubmit}>
                Email id <input name='email'/><br/>
                username <input name='username'/><br/>
                mobile no <input name='mobile_no'/><br/>
                password <input type='password' name='password'/>
                <hr/>
                <input type='submit' value='register'/>
            </form>
            Already Registered? <Link to='/login'>Login here!</Link>
        </div>
    }
}

export default withRouter(RegisterComponent);
