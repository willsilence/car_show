import React from "react";
import { connect } from "dva";
import "./CarPicker.less";
import { Layout, Menu, Breadcrumb} from 'antd';
const { Header, Content, Footer } = Layout;
import FilterIndicator from "../components/carpicker/FilterIndicator.js";
import CheckBoxBar from "../components/carpicker/CheckBoxBar.js";
import RangeBar from "../components/carpicker/RangeBar.js";
import DateBar from "../components/carpicker/DateBar.js";
import Caritem from "../components/carpicker/Caritem.js";
class CarPicker extends React.Component{
	constructor({carpicker,dispatch}){
		super();
		dispatch({"type":"carpicker/init"});
	}
	
	componentDidMount(){
		
	}
	render(){
		return <div>
			<Layout className="layout">
			    <Header>
			      <div className="logo" />
			      <Menu
			        theme="dark"
			        mode="horizontal"
			        defaultSelectedKeys={['2']}
			        style={{ lineHeight: '64px' }}
			      >
			        <Menu.Item key="1">汽车筛选</Menu.Item>
			      </Menu>
			    </Header>
			    <Content style={{ padding: '0 50px' }}>
			      <Breadcrumb style={{ margin: '12px 0' }}>
			        <Breadcrumb.Item>首页</Breadcrumb.Item>
			        <Breadcrumb.Item>汽车筛选</Breadcrumb.Item>

			      </Breadcrumb>
			      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
			      	<FilterIndicator></FilterIndicator> 
			      	<div className="filterbar"
			      	style={{"display":this.props.carpicker.filternames.includes("country")?"none":"block"}}
			      	>
			      		<CheckBoxBar 
			      		name="country"
			      		cname="产地" 
			      		options={["国产","美国","日本","其他"]}
			      		>
			      		</CheckBoxBar>
			      	</div>
			      	<div className="filterbar"
			      	style={{"display":this.props.carpicker.filternames.includes("brand")?"none":"block"}}
			      	>
			      		<CheckBoxBar 
			      		name="brand"
			      		cname="品牌" 
			      		options={this.props.carpicker.brandoptions}
			      		>
			      		</CheckBoxBar>
			      	</div>
			      	<div className="filterbar"
			      	style={{"display":this.props.carpicker.filternames.includes("seat")?"none":"block"}}
			      	>
			      		<CheckBoxBar 
			      		name="seat"
			      		cname="座位数" 
			      		options={["2","5","7","其它"]}
			      		>
			      		</CheckBoxBar>
			      		
			      	</div>
			      	<div className="filterbar"
			      	style={{"display":this.props.carpicker.filternames.includes("type")?"none":"block"}}
			      	>
			      		<CheckBoxBar 
			      		name="type"
			      		cname="车型" 
			      		options={["轿车","小型SUV","中型的SUV","大型的SUV"]}
			      		>
			      		</CheckBoxBar>
			      	</div>
			      	<div className="filterbar"
			      	style={{"display":this.props.carpicker.filternames.includes("price")?"none":"block"}}
			      	>
			      		<RangeBar 
			      		name="price"
			      		cname="售价" 
			      		min = {2}
			      		max = {2000}
			      		>
			      		</RangeBar>
			      	</div>
			      	<div className="filterbar"
			      	style={{"display":this.props.carpicker.filternames.includes("date")?"none":"block"}}
			      	>
			      		<DateBar 
			      		name="date"
			      		cname="发布日期" 
			      		min = "2005-01-01"
			      		max = "2017-01-01"
			      		>
			      		</DateBar>
			      	</div>
			      </div>
			      <div style={{  background: '#fff',padding: 24, minHeight: 280 }}>
			      		{
			      			this.props.carpicker.cars.map((item,index)=>{
			      				return <Caritem key={index} item={item}></Caritem>
			      			})
			      		}
			      </div>
			    </Content>
			    <Footer style={{ textAlign: 'center' }}>
			     dayellow &copy; 2017-10-08
			    </Footer>
			  </Layout>
		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(CarPicker);