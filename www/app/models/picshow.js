export default {
	namespace : "picshow" ,
	state : {
		"nowcolor":0 , //当前的颜色
		"nowtype":0,  //当前的类型
		"nowidx":0, //当前图片的序列号
		"colors":[],//颜色的数组
		"types":[],
		"data":{}
	} ,
	reducers : {
		init_sync(state,{data}){
			var colorarr = Object.keys(data.colors);
			var types = getNewType(data,0);
			return {
				...state,
				data,
				colors:colorarr,
				types:types
			}
		},
		// 点击图片变图 
		//切换类型
		changetype(state,{typename}){
			return {
				...state,
				"nowtype":state.types.indexOf(typename),
				"nowidx":0
			}
		},
		// 改变颜色
		changecolor(state,{n}){
			var types = getNewType(state.data,n);
			return {
				...state,
				types:types,
				nowcolor:n,
				"nowtype":0,
				"nowidx":0
			}
		},
		// 点击图片变图
		changepic(state,{n}){
			return {
				...state,
				nowidx:n
			}
		},
		// 切换下一张
		gonext(state){
			var types = state.data.colors[state.colors[state.nowcolor]].types;
			var imagesarr =  types[state.types[state.nowtype]];
			var typesArr = Object.keys(types);
			// 我们到该图集的末尾了
			if( state.nowidx + 1 == imagesarr.length){
					// alert("你猜对了，我是最后一张了")
					// 判断是不是最后的类型了
					if( state.nowtype + 1 == typesArr.length){
						var n = state.nowcolor+1;
						// 判断是不是到了最后一种颜色了
						if( n == Object.keys(state.data.colors).length){
							alert("您好，老弟没图了")
							return state;
						}
						var types = getNewType(state.data,n);
						return{
							...state,
							nowidx:0,
							nowtype:0,
							nowcolor: state.nowcolor + 1,
							types:types
						}
					}
					return{
						...state,
						nowidx:0,
						nowtype:state.nowtype + 1
					}
			}
			return{
				...state,
				nowidx:state.nowidx + 1
			}
		},
		// 上一张
		goprev(state){
			// 判断是不是到该图集的第零张图了
			if(  state.nowidx == 0){
				// 判断是不是到改颜色的第一个类型的图集的第零张
				if( state.nowtype == 0){
					// 该车图集的第一张
					if( state.nowcolor == 0 ){
						alert("到头了!别点了，再点就爆炸了")
						return state;
					}
					// 在切换颜色的时候，需要获取上一个图集的图片张数
					let types = state.data.colors[state.colors[state.nowcolor - 1]].types;
					let typesArr = getNewType(state.data,state.nowcolor - 1);
					let imagesarr = types[typesArr[typesArr.length - 1]];

					return {
						...state,
						nowtype:typesArr.length - 1,
						nowidx: imagesarr.length - 1,
						nowcolor:state.nowcolor - 1,
						types:typesArr

					}
				}
				let types = state.data.colors[state.colors[state.nowcolor]].types;
				let imagesarr =  types[state.types[state.nowtype]];
				let typesArr = Object.keys(types);
				return{
					...state,
					nowidx:types[state.types[state.nowtype - 1]].length - 1,
					nowtype : state.nowtype - 1
				}
			}
			return {
				...state,
				nowidx:state.nowidx - 1
			}
		}
	},
	effects : {
		// 拉取数据
		init : function* (action,{put}){
			var data = yield fetch("/api/car/VolksWagenwerk_Lavida").then((data)=>{
				return data.json();
			});

			yield put({"type":"init_sync",data})
		}	
	}
};

function getNewType(data,n){

	var colorarr = Object.keys(data.colors);
	// type的顺序我们需要控制
	var types = [];
	if(Object.keys(data.colors[colorarr[n]].types).includes("view")){
		types.push("view");
	}
	if(Object.keys(data.colors[colorarr[n]].types).includes("center")){
		types.push("center");
	}
	if(Object.keys(data.colors[colorarr[n]].types).includes("detail")){
		types.push("detail");
	}
	return types;
};