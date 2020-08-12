import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import './Info.css'
import Loader from './Loader'
export default class info extends Component {
  panes = [
    { menuItem: '咨询', render: () => <Tab.Pane><Loader type='1'/></Tab.Pane> },
    { menuItem: '头条', render: () => <Tab.Pane><Loader type='2'/></Tab.Pane> },
    { menuItem: '问答', render: () => <Tab.Pane><Loader type='3'/></Tab.Pane> },
  ]
  render() {
    return (
      <div className="find-container">
        <div className="find-topbar">咨询</div>
        <div className="find-content">
          <Tab panes={this.panes} />
        </div>
      </div>
    )
  }
}
