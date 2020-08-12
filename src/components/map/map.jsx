import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import './map.css'
import { mapAction } from '../../store/actionCreators'
import { connect } from 'react-redux'

class Map extends Component {
  componentDidMount() {
    const BMap = window.BMapGL
    // 地图实例
    var map = new BMap.Map('container')
    // 创建中心点
    var point = new BMap.Point(113.36, 23.039)
    var top_left_control = new BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_BOTTOM_LEFT,
    }) // 左上角，添加比例尺
    var top_right_navigation = new BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT,
      type: window.BMAP_NAVIGATION_CONTROL_SMALL,
    })
    map.addControl(top_left_control)
    map.addControl(top_right_navigation)
    // 设置到地图实例上,缩放级别
    map.centerAndZoom(point, 15)
    var marker = new BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
    marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) //跳动的动画
  }
  render() {
    return (
      <div className="map-house">
        <div className="map-house-title">
          <Icon name="angle left" size="large" onClick={this.props.hiddenMap} />
          地图找房
        </div>
        {/* <div className="map-house-content" id="container" /> */}
        <div id="container" className="map-house-content"></div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hiddenMap() {
      dispatch(mapAction(false))
    },
  }
}

export default connect(null, mapDispatchToProps)(Map)
