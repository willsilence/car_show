import React from "react";
import { connect } from "dva";
import './PicNav.less';
import classnames from 'classnames';
class PicNav extends React.Component{
	constructor({picshow}){
		super();
		this.state = {
			"imagesAmount":27,
			"pageAmount" : 0,
			// 当前分页条的值
			"pagecur":0
		}
	}
	// 当props改变的时候
	componentWillReceiveProps(nextProps) {
		// 此处的验证是点击不是第一个ul的图片集带的时候，unit会自动拉到0。
		// 我们加验证。nowcolor ，nowtype 
		if( nextProps.picshow.nowcolor != this.props.picshow.nowcolor || nextProps.picshow.nowtype != this.props.picshow.nowtype  ){
			this.setState({
				...this.state,
				"pagecur":0
			});
			var $unit = $(this.refs.unit);
			$unit.stop(true).animate({"left":0})
		};
		if(  parseInt(nextProps.picshow.nowidx / 6) != this.state.pagecur ){
			this.setState({
				"pagecur": parseInt(nextProps.picshow.nowidx / 6)
			});
			var $unit = $(this.refs.unit);
			$unit.stop(true).animate({"left":-320 * parseInt(nextProps.picshow.nowidx / 6)},400)
			
		}
		
	}
	componentDidMount(){
		// 计算下总页数s
		var pageAmount = Math.ceil(this.state.imagesAmount / 6);
		this.setState({
			pageAmount
		});
		// 我们给分页导航加事件委托
		var $unit = $(this.refs.unit);
		var self = this;
		$(this.refs.pager).delegate("li","mouseenter",function(){
			$unit.stop(true).animate({"left":-320 * $(this).index()},500);
			// 改变当前的页数
			self.setState({
				...self.state,
				"pagecur":$(this).index()
			})
		})

	}
	// 渲染分页条
	showPagerLis(pageAmount){
		// page 的 li的操作
		// 计算宽度
		var w = (279 - 4 *pageAmount ) /pageAmount;
		// 我们用填充数组的方法上树
		// 创建一个数组
		var arr = [];
		var count = 0;
		while( count != pageAmount){
			arr.push(<li 
				className= { classnames({"cur": this.state.pagecur == count})}
				key = {count}
				style={{"width":`${w}px`}}
				></li>)
			count++;
		}

		return arr;
	}

	render(){
		// 获取到指定的所有的图片
		if(this.props.picshow.data.colors){
			var picshow = this.props.picshow;
			var images = picshow.data.colors[picshow.colors[picshow.nowcolor]].types[picshow.types[picshow.nowtype]];
			// 我们现在获取到了图片，要把图片每6张图片儿放到ul中；
			// 生成ul的个数
			var pageAmount = Math.ceil(images.length / 6 );
			var picarr = [];
			for (var i = 0; i < pageAmount; i++) {
				picarr.push(images.slice(6*i,6*(i+1)));
			}
		}
		// 我们现在需要得到图片的绝对路径
		// 需要获取： 汽车的名字 ， 当前的颜色 ，图片类型 
		var carname =  this.props.picshow.data.name;
		var color = this.props.picshow.colors[this.props.picshow.nowcolor];
		var type = this.props.picshow.types[this.props.picshow.nowtype];
		return <div className="picnavwrap">
			<div className="images">
				<div className="unit" ref="unit">
					{
						picarr && picarr.map((item,index1)=>{
						return <ul key = {index1} >
							{
								item.map((item,index2)=>{
									return <li 
												key={index2}
												className = {classnames({"cur":index1 * 6 + index2 == this.props.picshow.nowidx})}
												onClick = {()=>{this.props.dispatch({"type":"picshow/changepic","n":index1 * 6 + index2})}}
											>
										<img src={`carpic/${carname}/${color}/${type}/${item}`} alt=""/>
									</li>
								})
							}
						</ul>
					})
					}
				</div>
			</div>
			<div className="pager" ref="pager">
				<ul>
					{pageAmount && this.showPagerLis(pageAmount)}
				</ul>
			</div> 
		</div>
	}
}
export default connect(
	({picshow})=>{
		return {
			picshow
		}
	}
)(PicNav);