const state = {
	// 是否加载新的计划列表
	updatePlan:true
}
const getters = {
	getUpdatePlan(state){
		return state.updatePlan
	}
}
const mutations = {
	setUpdatePlan(state,flag){
		state.updatePlan = Boolean(flag);	
	}
}
const actions = {}
export default{
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}
