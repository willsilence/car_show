import React from "react";
import { connect } from "dva";
import FilterTag from './FilterTag.js'
import "./FilterIndicator.less";
class FilterIndicator extends React.Component{
	constructor({carpicker}){
		super();
		console.log(carpicker.filter)
	}
	componentDidMount(){
		
	}
	log(e){
	  console.log(e);
	}
	render(){
		return <div>
		 	{
		 		this.props.carpicker.filters.length == 0
		 		?
		 		<div></div>
		 		:
		 		<div>
		 			<b>当前的筛选：</b>
		 			{" "}
		 			{
		 				this.props.carpicker.filters.map((item,index)=>{
		 					return <FilterTag key={index} item={item}></FilterTag>
		 				})
		 			}
		 		</div>
		 	}
		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(FilterIndicator);