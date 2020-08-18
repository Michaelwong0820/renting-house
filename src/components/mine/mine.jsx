import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import './Mine.css'
import { Button, Grid, Icon, Modal } from 'semantic-ui-react'
import avatar from '../../static/image/avatar.jpg'

class ClipImg extends Component {
    constructor() {
        super ()
        this.state = {
            scale:1
        }
        this.clipRef = React.createRef()
    }
    changeScale = e => {
      this.setState({
        scale: parseFloat(e.target.value)
      })
    }
    clipAvatar = () => {
      const baseImg = this.clipRef.current.getImage().toDataURL()
      this.props.callback(baseImg)
    }
  render() {
    return (
      <Modal
        size="small"
        open={this.props.open}
        onClose={() => {
          this.props.callback(null)
        }}
      >
        <Modal.Header>图片裁剪</Modal.Header>
        <Modal.Content>
          <AvatarEditor
            image={this.props.image}
            ref= {this.clipRef}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={this.state.scale}
            rotate={0}
          />
          <br />
          <span className="avatar-zoom">缩放</span>
          <input min='1' max='2' step='0.01' value={this.state.scale} onChange={this.changeScale} type="range"/>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              this.props.callback(null)
            }}
          >
            取消
          </Button>
          <Button positive onClick={this.clipAvatar}>
            确定
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

class ImageModal extends Component {
  getImg = () => {
    const file = this.refs.imgRef.files[0]
    // console.log(file);
    this.props.callback(file)
  }
  render() {
    return (
      <Modal
        size="small"
        open={this.props.open}
        onClose={() => {
          this.props.callback(null)
        }}
      >
        <Modal.Header>图片选择</Modal.Header>
        <Modal.Content>
          <input ref="imgRef" type="file" />
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              this.props.callback(null)
            }}
          >
            取消
          </Button>
          <Button positive onClick={this.getImg}>
            确定
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
export default class mine extends Component {
  constructor() {
    super()
    this.state = {
      info: {
        avatar:
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2633831631,220951720&fm=26&gp=0.jpg',
        id: 1,
        mobile: '123',
        password: '123',
        username: 'tom',
      },
      avatarImg:null,
      isShowImageModal: false, //是否展示选择图片
      isClipImageModal: false, //是否展示裁剪图片
      clipImg:null
    }
  }
  componentWillMount() {
    // this.loadData()
  }

  loadData = async () => {
    const res = await this.axios.post('my/info', {
      user_id: localStorage.getItem('uid'),
    })
    this.setState({
      info: res.data.data,
    })
  }
  closeModal = (file) => {
    console.log(file)
    this.setState({
      isShowImageModal: false,
    })
    if (file) {
      this.setState({
        isClipImageModal: true,
        clipImg:file
      })
    }
  }
  clipImage = (base64) => {
    if(base64) {
      this.setState({
        isClipImageModal:false,
        avatarImg:base64
      })
    }
  }
  render() {
    return (
      <div className="my-container">
        <div className="my-title">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597763949212&di=ff7f56509cefb120a8f5694d672776b5&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-23%2F59ed5b6a37b4d.jpg"
            alt=""
          />
          <div className="info">
            <div className="myicon">
              {this.state.avatarImg?  <img
                src={this.state.avatarImg || avatar}
                style={{ height: 80 }}
                onClick={() => {
                  this.setState({ isShowImageModal: true })
                }}
                alt=""
              />:<img
                src={this.state.info.avatar || avatar}
                style={{ height: 80 }}
                onClick={() => {
                  this.setState({ isShowImageModal: true })
                }}
                alt=""
              />}
             
            </div>
            <div className="name">{this.state.info.username}</div>
            <Button size="mini" color="green">
              已认证
            </Button>
            <div className="edit">编辑资料</div>
          </div>
        </div>
        <Grid padded className="my-menu">
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name="clock outline" size="large" />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="yen sign" size="big" />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="bookmark outline" size="big" />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="user outline" size="big" />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="home" size="big" />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="microphone" size="big" />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="my-ad">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597763949210&di=75991a2fe3b34c011e8fabf7402487e4&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fa%2F59ccdde5ccd61.jpg"
            alt=""
          />
        </div>
        <ImageModal
          open={this.state.isShowImageModal}
          callback={this.closeModal}
        />
        <ClipImg open={this.state.isClipImageModal} callback={this.clipImage} image={this.state.clipImg}/>
      </div>
    )
  }
}
