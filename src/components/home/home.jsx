import React, { Component } from 'react'
import { Input, Dimmer, Loader, Grid, Icon } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
// 引入第三方样式
import './home.css'
import "react-image-gallery/styles/css/image-gallery.css";
export default class home extends Component {
    constructor() {
        super()
        this.state = {
            swipe: [
                {
                    original: 'https://picsum.photos/id/1018/1000/600/',
                    thumbnail: 'https://picsum.photos/id/1018/250/150/',
                },
                {
                    original: 'https://picsum.photos/id/1015/1000/600/',
                    thumbnail: 'https://picsum.photos/id/1015/250/150/',
                },
                {
                    original: 'https://picsum.photos/id/1019/1000/600/',
                    thumbnail: 'https://picsum.photos/id/1019/250/150/',
                },
            ],
            menu: [],
            infos: [],
            faqs: [],
            house: [],
            isLoading: true
        }
    }
    async componentWillMount() {
        // const res = await Promise.all([
        //     this.axios.post('homes/swipe'),
        //     this.axios.post('homes/menu'),
        //     this.axios.post('homes/infos'),
        //     this.axios.post('homes/faqs'),
        //     this.axios.post('homes/house')
        // ])
        // this.setState({
        //     swipe: res[0].data.data.list,
        //     menu: res[1].data.data.list,
        //     infos: res[2].data.data.list,
        //     faqs: res[3].data.data.list,
        //     house: res[4].data.data.list,

        // })
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 200)
    }
    // 渲染菜单
    renderMenu = menu => {
        return <Grid padded>
            <Grid.Row columns={4}>
                {menu.map(item => {
                    return <Grid.Column key={item.id}>
                        <div className="home-menu-item">
                            <Icon name="home" size='big' />
                            <div style={{ marginTop: 5 }}>{item.menu_name}</div>
                        </div>
                    </Grid.Column>
                })}
            </Grid.Row>
        </Grid>
    }
    render() {
        const { isLoading, swipe, menu } = this.state
        return (
            <div className="home-container">
                {/* 导入蒙版 */}
                <Dimmer active={isLoading} inverted>
                    <Loader inverted>数据加载中...</Loader>
                </Dimmer>
                <div className="home-topbar">
                    {/* 搜索框 */}
                    <Input fluid
                        icon={{ name: 'search', circular: true, link: true }}
                        placeholder='搜房源...'
                    />
                </div>
                <div className="home-content">
                    {/* 轮播图 */}
                    <ImageGallery showThumbnails={false} showFullscreenButton={false} showPlayButton={false} showBullets={true} items={swipe} />
                    {/* 栅格菜单 */}
                    {this.renderMenu(menu)}
                </div>
            </div>
        )
    }
}
