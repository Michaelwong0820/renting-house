import React, { Component } from 'react'
import './layout.css'

import Home from '../home/home'
import Info from '../info/info'
import Chat from '../chat/chat'
import Mine from '../mine/mine'
import NotFound from '../NotFound/404'

import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { Grid, Icon } from 'semantic-ui-react'

function TabsNavLink({ name, icon, to ,activeOnlyWhenExact }) {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            return <Link to={to}>
                <div className={match ? 'placeholder active' : 'placeholder'}>
                    <Icon name={icon} />
                    <div>{name}</div>
                </div>
            </Link>
        }} />
    )

}

export default class layout extends Component {
    render() {
        return (
            <div>
                <div className='main-content'>
                    <Switch>
                        <Route path="/layout/home" component={Home} />
                        <Route path="/layout/info" component={Info} />
                        <Route path="/layout/chat" component={Chat} />
                        <Route path="/layout/mine" component={Mine} />
                        <Redirect path="/layout/" exact to="/layout/home" />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <div className='main-menu'>
                    <Grid padded>
                        <Grid.Row columns={4}>
                            <Grid.Column>
                                <TabsNavLink name="首页" icon="user secret" to="/layout/home" activeOnlyWhenExact={true}/>
                                {/* <Link to="/layout/home">首页</Link> */}
                            </Grid.Column>
                            <Grid.Column>
                                <TabsNavLink name="咨询" icon="envelope" to="/layout/info" />
                                {/* <Link to="/layout/info">咨询</Link> */}
                            </Grid.Column>
                            <Grid.Column>
                                <TabsNavLink name="微聊" icon="phone square" to="/layout/chat" />
                                {/* <Link to="/layout/chat">微聊</Link> */}
                            </Grid.Column>
                            <Grid.Column>
                                <TabsNavLink name="我的" icon="archive" to="/layout/mine" />
                                {/* <Link to="/layout/mine">我的</Link> */}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }
}
