import React, { Component } from 'react'
import './Loader.css'
import { Item, Button, Icon } from 'semantic-ui-react'
import Tloader from 'react-touch-loader'
export default class Loader extends Component {
  constructor() {
    super()
    this.state = {
      list: [],
      infoList: [
        { id: 1, name: '今天' },
        { id: 2, name: '明天' },
      ],
      questionList: [
        {
          id: 1,
          question_name: '在北京买房',
          question_tag: '学区,海淀',
          username: 'tom',
          qnum: 2,
          answer_content: '各种费用',
        },
        {
          id: 2,
          question_name: '在上海买房',
          question_tag: '学区,昌平',
          username: 'tom',
          qnum: 9,
          answer_content: '大概1个月',
        },
      ],
      type: '1', // 1.咨询 2.头条 3.问答
      startIndex: 0,
      pagesize: 2,
      total: 0, // 记录列表总条数
      hasMore: true, //是否还有更多
    }
  }
  componentWillMount() {
    // this.loadData()
    this.setState({
      list: this.state.infoList,
    })
  }
  // 父组件传值给子组件的值发生改变
  componentWillReceiveProps(props) {
    console.log(props)
    // 重置数据
    this.setState(
      {
        list: [],
        type: props.type,
        startIndex: 0,
        total: 0,
      },
      () => {
        if (props.type == 1 || props.type == 2) {
          this.setState({
            list: this.state.infoList,
          })
        } else {
          this.setState({
            list: this.state.questionList,
          })
        }
        // this.loadData()
      }
    )
  }
  loadData = async () => {
    const res = await this.axios.post('infos/list', {
      type: this.state.type,
      pagenum: this.state.startIndex,
      pagesize: this.state.pagesize,
    })
    console.log(res)
    const { data } = res.data.data
    const newArr = [...this.state.list, ...data.list.data]
    this.setState({
      list: newArr,
      hasMore: newArr.length < data.list.total,
    })
  }
  renderLoader = () => {
    const { type, list } = this.state
    if (type == 1 || type == 2) {
      return (
        <Item.Group unstackable>
          {list.map((item) => {
            return (
              <Item key={item.id}>
                <Item.Image
                  size="tiny"
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                />
                <Item.Content>
                  <Item.Header className="info-title">{item.name}</Item.Header>
                  <Item.Meta>
                    <span className="price">$1200</span>
                  </Item.Meta>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      )
    } else {
      return (
        <div>
          <Button positive fluid>
            快速提问
          </Button>
          <div className="info-ask-list">
            <ul>
              {list.map((item) => {
                return (
                  <li key={item.id}>
                    <div className="title">
                      <Icon color="green" name="users" size="small" />
                      {item.question_name}
                    </div>
                    <div className="user">
                      <Icon name="users" />
                      <span>{item.username}的回答</span>
                    </div>
                    <div className="info">{item.answer_content}</div>
                    <div className="tag">
                      {item.question_tag.split(',').map((item, index) => {
                        return <span key={item}>{item}</span>
                      })}
                      <span>{item.qnum}个回答</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }
  }
  //   下拉刷新
  handleRefresh = (resove, reject) => {
    setTimeout(() => {
      resove()
    }, 2000)
  }
  //  上拉加载更多
  handleLoadMore = (resove) => {
    setTimeout(() => {
      resove()
    }, 2000)
  }
  render() {
    return (
      <div style={{ paddingBottom: 60 }}>
        <Tloader
          initializing={0}
          onRefresh={this.handleRefresh}
          hasMore={this.hasMore}
          onLoadMore={this.handleLoadMore}
          autoLoadMore={true}
          className="tloader some class"
        >
          <div>{this.renderLoader()}</div>
        </Tloader>
      </div>
    )
  }
}
