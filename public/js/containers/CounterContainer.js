import Counter from '../components/Counter'
import * as actions from '../actions/counter'
//import { increment, decrement } from '../actions/counter'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return {
    counterValue: state.counter
  }
}
//bindActionCreators(actionCreators, dispatch)
function mapDispatchToProps(dispatch) {
  // return {
  //   onIncrement: bindActionCreators(increment, dispatch),
  //   onDecrement: bindActionCreators(decrement, dispatch)
  // }

  const a = bindActionCreators(actions, dispatch)
  console.log(a)
  console.log(a)
  console.log( a  === {
    increment: bindActionCreators(actions.increment, dispatch),
    decrement: bindActionCreators(actions.decrement, dispatch)
  })
  return a
}
/*

bindActionCreators(actions, dispatch)
===
{
  onIncrement: dis
}


/*
function addTodoActionCreator(text){
    return {
        type: "add",
        text: text
    };
}

// 调用 bindActionCreators(addTodoActionCreator, dispatch) 后

function addTodoAction(text){
    dispatch({
        type: "add",
        text: text
    });
}
// 这样可以直接调用addTodoAction来派发 Action。
*/

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
