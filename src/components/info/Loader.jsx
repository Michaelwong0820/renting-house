import React, { Component } from 'react'

export default class Loader extends Component {
    constructor() {
        super()
        this.state = {
            list:[],
            type:'1',// 1.咨询 2.头条 3.问答
            startIndex:0 ,
            pagesize:2,
            total:0  // 记录列表总条数
        }
    }
    componentWillMount() {
        this.loadData()
    }
    // 父组件传值给子组件的值发生改变
    componentWillReceiveProps(props) {
        console.log(props);
        // 重置数据
        this.setState({
            list:[],
            type:props.type,
            startIndex:0,
            total:0
        },()=>{
            this.loadData()
        })
    }
    loadData = async() => {
        const res = await this.axios.post('infos/list',{
            type:this.state.type,
            pagenum:this.state.startIndex,
            pagesize:this.state.pagesize
        })
        console.log(res);
        const {data} = res.data.data
        this.setState({
            list:data.list.data,
            total:data.list.total
        })
    }
    render() {
        return (
            <div>
                我是子组件
            </div>
        )
    }
}
