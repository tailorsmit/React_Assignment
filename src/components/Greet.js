import React from 'react'
import {withRouter} from "react-router-dom";
import T from "../static/ziXLB55iB.png"
import F from "../static/gie5B478T.png"

class Greet extends React.Component {
    username = 'Ts27'
    token = ""
    state = {
        username: "",
        mobile_no: "",
        verified: null,
        email: ""
    }

    constructor(props) {
        super(props);
        this.token = localStorage.getItem('authtoken');
        console.log(this.token)
        if(this.token === '' || this.token === null){
            this.props.history.push('/login')
        }else {
            fetch('http://localhost:8000/api/user/me/', {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Authorization': this.token
                })
            }).then(res =>
                res.json()
            ).then(data => {
                this.username = data.username;
                this.setState({
                    username: data.username,
                    verified: data.verified,
                    mobile_no: data.mobile_no,
                    email: data.email
                })
                console.log(this.state.username);
            })
        }
    }

    logout = ()=> {
        localStorage.setItem('authtoken','')
        this.props.history.push('/login')
    }

    loadImagePath(){
        if(this.state.verified)
            return T
        else if(this.state.verified !== null && !this.state.verified)
            return F
    }

    verify = async () =>{
        await fetch('http://localhost:8000/api/user/request-otp/',{
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': this.token
            })
        }).then((res) => res.json()).then(data => {
            console.log(data)
            this.props.history.push('/verify-otp');
        })
    }
    verifyButton(){
        if(this.state.verified !== null && !this.state.verified)
            return (<button onClick={this.verify}>verify mobile no.</button>)
    }
    render() {
        return <div>
            <pre><h1>Welcome User! {this.state.username+" "}
            <img src={this.loadImagePath()}  alt='not found' height='20px' width='20px'/>
            </h1></pre>
            {this.verifyButton()}
            <h3>mobile no   : {this.state.mobile_no}</h3>
            <h3>email       : {this.state.email}</h3>
            <button name='logout' onClick={this.logout} value='logout'>Logout</button>
        </div>
    }
}

export default withRouter(Greet)
