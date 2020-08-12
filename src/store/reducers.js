import {IS_SHOW_MAP,IS_SHOW_CALC} from './actionType'
const initalState = {
    isShowMap :false,
    isShowCalc: false
}
export function reducers(prevState=initalState,action) {
    switch(action.type) {
        case IS_SHOW_MAP: 
            const mapObj = JSON.parse(JSON.stringify(prevState))
            mapObj.isShowMap = action.isShowMap
            return mapObj
        case IS_SHOW_CALC:
            const calcObj = JSON.parse(JSON.stringify(prevState))
            calcObj.isShowCalc = action.isShowCalc
            return calcObj
        default:
            return prevState
    }
}