import React from "react";
import { connect } from "dva";
import { Row ,Col , Button} from 'antd';
import './Caritem.less'
class Caritem extends React.Component{
	constructor({carpicker,dispatch}){
		super();
	
	}
	
	componentDidMount(){
		
	}
	render(){

		return <div className="CaritemRow">
			<Row>
				<Col span={3}><img src={'/carpic/' + this.props.item.pic}  className="cimg" alt=""/></Col>
				<Col span={2}>{this.props.item.model}</Col>
				<Col span={2}>{this.props.item.country}</Col>
				<Col span={2}>{this.props.item.brand}</Col>
				<Col span={2}>{this.props.item.seat}</Col>
				<Col span={2}>{this.props.item.date}</Col>
				<Col span={2}>{this.props.item.type}</Col>
				<Col span={2}>{this.props.item.price}</Col>
				<Col span={2}><Button>查看图片</Button></Col>
			</Row>
		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(Caritem);