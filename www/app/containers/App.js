import React from "react";
import { connect } from "dva";
import Picshow from './Picshow.js';
import CarPicker from './CarPicker.js';

class App extends React.Component{
	constructor({carpicker}){
		super();
	}
	componentDidMount(){
		
	}
	render(){
		return <div>
		 	<CarPicker></CarPicker>
		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(App);