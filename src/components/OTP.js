import React from 'react'
import { withRouter} from "react-router-dom";

class OTP extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            otp: "",
            verified: false,
            success : ''
        }
        this.token = localStorage.getItem('authtoken')
        if(this.token === ''){
            this.props.history.push('/login')
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        let data = this.state.otp;
        console.log(data)
        const res = await fetch('http://localhost:8000/api/user/verify-otp/' + data, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': this.token
            })
        })
        console.log(res)
        data = await res.json()
        console.log(data)
        if(res.status === 200){
            this.state.verified =true
            this.setState({
                success: <h3>{data.message}</h3>
            });
            if(data.message === 'phone number verified'){
                setTimeout(() =>{},3000)
                this.props.history.push('/')
            }
        }else if(res.status === 400){
            this.state.success = <h3>otp invalid</h3>
        }else if(res.status === 404){
            this.state.success = <h3>server seems down try again later!</h3>
        }
    }

    dialog = ()=> {
        if(this.state.verified)
            return <h3 style={{color: 'green'}}>otp has been verified</h3>

    }
    render() {
        return <div>
            <form name='otp' onSubmit={this.onSubmit}>
                Enter Otp : <input type='number' name='otp' onChange={(e) => {
                this.setState({
                    otp: e.target.value
                })
            }}/>
                <hr/>
                <input type='submit' value='verify otp'/>
            </form>
            {this.state.success}
        </div>
    }

}

export default withRouter(OTP);
