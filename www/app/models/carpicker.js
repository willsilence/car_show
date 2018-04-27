export default {
	namespace : "carpicker" ,
	state : {
		filters:[
		
		],
		brandoptions:[],
		filternames:[

		],
		cars:[

		]
	} ,
	reducers : {
		init_sync(state,{brandoptions}){
			return {
				...state,
				brandoptions
			}
		},
		addfilter_sync(state,{name,value,brandoptions=state.brandoptions}){
			return {
				...state,
				filters :[
					...state.filters,
					{name,value}
				],
				filternames:[
					...state.filternames,
					name
				],
				brandoptions
			}
		},
		delfilter_sync(state,{name,brandoptions=state.brandoptions}){
			return {
				...state,
				filters:state.filters.filter((item)=>{
					return item.name != name
				}),
				filternames:state.filternames.filter((item)=>{
					return item != name
				}),
				brandoptions
			}
		},
		fetchCarData_sync(state,{cars}){
			return {
				...state,
				cars
			}
		}	
	},
	effects : {
		init:function*(action,{put}){
			const brandoptions = yield fetch("/api/brands.json").then((data)=>{return data.json()});

			yield put({"type":"init_sync","brandoptions":Object.values(brandoptions).reduce((a,b)=>{
				return a.concat(b);
			})});
			yield put({"type":"fetchCarData"});
		},
		addfilter:function*({name,value},{put}){
			if(name == "country"){
				const data = yield fetch("/api/brands.json").then((data)=>{return data.json()});

				var brandoptions = [];

				value.forEach((item)=>{
					brandoptions = brandoptions.concat(data[item]);
				})
				// yield put({"type":"addfilter_sync",name,value,brandoptions});
				// return;
				
			}
			yield put({"type":"addfilter_sync",name,value,brandoptions})
			yield put({"type":"fetchCarData"});
		},
		delfilter:function*({name},{put}){
			if( name == "country"){
				// 如果更改的是国家。此时要拉取数据库中的品牌列表
				const data = yield fetch("/api/brands.json").then((data)=>{
					return data.json();
				})
				var brandoptions = Object.values(data).reduce((a,b)=>{
					return a.concat(b)
				});
				// yield put({"type":"delfilter_sync",name,brandoptions});
				// return;
			}
			yield put({"type":"delfilter_sync",name,brandoptions})
			yield put({"type":"fetchCarData"});
		},
		fetchCarData:function*({},{put,select}){
			// alert("这里是拉取数据的地方")
			// 在异步的函数中，我们通过select函数，获取state数据
			const filters = yield select((state)=>{ return state.carpicker.filters});
			// console.log(filters)
			const {cars} = yield fetch("/cars",{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify({"filters":JSON.stringify(filters)})
			}).then((data)=>{
				return data.json();
			});
			yield put({"type":"fetchCarData_sync",cars})
		}
	}
};
