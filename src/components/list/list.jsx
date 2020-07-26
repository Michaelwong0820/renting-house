import React, { Component } from 'react'
import './list.css'
import { Icon, Dimmer, Loader,Item } from 'semantic-ui-react'
export default class list extends Component {
  constructor(props) {
    super(props)
    this.state = {
      house_type: props.computedMatch.params.house_type,
      name: props.computedMatch.params.name,
      houses: [],
      isLoading: true,
    }
  }
  componentWillMount() {
    this.setState({}, () => {
      setTimeout(() => {
        this.setState({
          isLoading: false,
        })
      }, 2000)
    })
    // const res = await this.axios.post('homes/list', {
    //   home_type: this.state.house_type,
    // })
    // this.setState({
    //   houses: res.data.data,
    // })
  }
  render() {
    return (
      <div>
        <Dimmer active={this.state.isLoading}>
          <Loader>正在加载中...</Loader>
        </Dimmer>
        <div className="house-list">
          {/* 标题 */}
          <div className="house-list-title">
            <Icon
              onClick={() => {
                this.props.history.goBack()
              }}
              size="large"
              name="angle left"
            />
            <span>{this.state.name}</span>
          </div>
        </div>
        <Item.Group unstackable>
          {houses.map((item) => {
            return (
              <Item key={item.id}>
                <Item.Image
                  size="tiny"
                  src="http://47.96.21.88:8086/public/home.png"
                />

                <Item.Content>
                  <Item.Header>{item.home_name}</Item.Header>
                  <Item.Meta>{item.home_desc}</Item.Meta>
                  <Item.Description>{item.home_tags}</Item.Description>
                  <Item.Description>
                    <span>{item.home_price}</span>
                  </Item.Description>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      </div>
    )
  }
}
