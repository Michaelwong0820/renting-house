import React, { Component } from 'react'
import {
  Icon,
  Tab,
  Grid,
  Dropdown,
  Input,
  Button,
  GridColumn,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { calcAction } from '../../store/actionCreators'
import './calc.css'
// import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
class calc extends Component {
  constructor() {
    super()
    this.state = {
      types: [
        { key: '1', value: '1', text: '按贷款总额' },
        { key: '2', value: '2', text: '按房价总额' },
      ],
      type: '2',
      loanTotal: 0,
      years: [
        { key: '1', value: '1', text: '30年' },
        { key: '2', value: '2', text: '20年' },
        { key: '3', value: '3', text: '10年' },
      ],
      year: '3',
      rates: [
        { key: '1', value: '1', text: '基准利率9.5%' },
        { key: '2', value: '2', text: '8.6%' },
        { key: '3', value: '3', text: '7.3%' },
      ],
      rate: '3',
      capital:300,
      interest:500
    }
  }
  calc = () => {
    this.setState({
      capital:250,
      interest:860
    })
  }
  changeType = (e, data) => {
    this.setState({
      type: data.value,
    })
  }
  changeYear = (e, data) => {
    this.setState({
      year: data.value,
    })
  }
  changeRate = (e, data) => {
    this.setState({
      rate: data.value,
    })
  }
  getOption = () => {
    return {
      title: {
        text: '贷款计算结果',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['本金', '利息',],
      },
      series: [
        {
          name: '贷款利率',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: this.state.capital, name: '本金' },
            { value: this.state.interest, name: '利息' },
          ],
        },
      ],
    }
  }
  renderLoan = () => {
    const { types, type, loanTotal, years, year, rate, rates } = this.state
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="6">贷款方式</Grid.Column>
            <Grid.Column width="10">
              <Dropdown
                onChange={this.changeType}
                fluid
                selection
                options={types}
                value={type}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="6">贷款金额</Grid.Column>
            <Grid.Column width="10">
              <Input
                fluid
                value={loanTotal}
                onChange={(e) => {
                  this.setState({ loanTotal: e.target.value })
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="6">贷款年限</Grid.Column>
            <Grid.Column width="10">
              <Dropdown
                onChange={this.changeYear}
                fluid
                selection
                options={years}
                value={year}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="6">贷款利率</Grid.Column>
            <Grid.Column width="10">
              <Dropdown
                onChange={this.changeRate}
                fluid
                selection
                options={rates}
                value={rate}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="16">
              <Button color="green" fluid onClick={this.calc}>
                计算
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
  panes = [
    {
      menuItem: '商业贷款',
      render: () => <Tab.Pane>{this.renderLoan()}</Tab.Pane>,
    },
    {
      menuItem: '公积金贷款',
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
    { menuItem: '混合贷款', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]
  render() {
    return (
      <div className="home-calc">
        <div className="home-calc-title">
          <Icon
            name="angle left"
            size="large"
            onClick={() => {
              this.props.hidCalc()
            }}
          />
          贷款计算
        </div>
        <div className="home-calc-content">
          <Tab panes={this.panes} />
          <div className="calc-chart">
            {/* 全部导入 */}
            {/* <ReactEcharts option={this.getOption} /> */}
            {/* 按需导入 */}
            <ReactEchartsCore echarts={echarts} option={this.getOption()} />
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    hidCalc() {
      dispatch(calcAction(false))
    },
  }
}
export default connect(null, mapDispatchToProps)(calc)
