import React from "react";
import { connect } from "dva";
import { Layout, Menu, Breadcrumb ,Checkbox ,Button  } from 'antd';
import _ from 'underscore';
class CheckBoxBar extends React.Component{
	constructor({carpicker}){
		super();
		// 这里储存的是复选框的值
		this.state = {
			value : []
		}
	}
	componentDidMount(){
		
	}
	changeHandler(e,option){
		// console.log(e.target.checked,option)
		// true就是把这项push进去。否则就是删除这项
		// 我们用underscore秋数据的交集，首先克隆数据
		var _value = _.clone(this.state.value);
		if(e.target.checked){
			// 把optionpush到_value中
			_value.push(option);
			this.setState({
				"value":_.intersection(this.props.options,_value)
			})
		}else{
			this.setState({
				"value": this.state.value.filter((item)=>{
					return item != option;
				})
			})
		}
	};
	submithandle(){
		if( this.state.value.length == 0){
			alert("你要至少选择一个!");
			return;
		}
		this.props.dispatch({"type":"carpicker/addfilter","value":this.state.value,"name":this.props.name})
	}

	render(){
		return <div>
		 	<b>{this.props.cname}</b>
		 	{" ： "}
		 	{
		 		this.props.options.map((option,index)=>{
		 			return <Checkbox key={index} onChange={(e)=>{this.changeHandler(e,option)}}>{option}</Checkbox>
		 		})
		 	}
		 	<Button 
		 		type="primary"
		 		onClick={this.submithandle.bind(this)}
		 	>确定</Button>
		 	<br/>
		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(CheckBoxBar);