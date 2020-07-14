import React, { Component } from 'react'
import './login.css'
import { Form } from 'semantic-ui-react'
export default class login extends Component {
    constructor() {
        super()
        this.state = {
            uname: '',
            pwd: ''
        }
    }
    login = async () => {
        // console.log(this.state);
        // const res = await this.axios.post('users/login',this.state)
        const res = {
            status:200,
            data:{
                meta:{
                    uid:1,
                    token:'adcc23123jjd22344',
                    uname:'tom'
                }
            }
        }
        console.log(res);
        if(res.status === 200) {
            localStorage.setItem('uid',res.data.meta.uid)
            localStorage.setItem('token',res.data.meta.token)
            this.props.history.push('/layout')
        }else {
            alert('登录失败')
        }
    }
    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let { uname, pwd } = this.state
        return (
            <div className='login-container'>
                <div className="login-title">登录</div>
                <div className="login-form">
                    <Form onSubmit={this.login}>
                        <Form.Field>
                            <Form.Input placeholder='请输入账号' icon='user' iconPosition='left' value={uname} onChange={this.change} name='uname' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input placeholder='请输入密码' icon='lock' iconPosition='left' type='password' onChange={this.change} value={pwd} name='pwd' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Button positive>登录</Form.Button>
                        </Form.Field>

                    </Form>
                </div>
            </div>
        )
    }
}
