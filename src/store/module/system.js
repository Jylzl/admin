/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 08:32:28
 * @LastEditTime: 2019-09-02 15:45:34
 * @LastEditors: Please set LastEditors
 */
/**
 * @Description: Description
 * @Author: lizlong<94648929@qq.com>
 * @Date: 2019-06-03 18:19:28
 * @LastAuthor: lizlong
 * @lastTime: 2019-08-09 11:39:04
 */
const systemConfig = {
	state: {
		collapse: false,
		asideWidth: '220px',
		leftTree:'',
	},
	mutations: {
		CHANGE_SET: (state, value) => {
			if (value == undefined) {
				state.collapse = !state.collapse;
			} else {
				state.collapse = value ? true : false;
			}
			state.asideWidth = state.collapse ? '88px' : '220px';
		},
		CHANGE_TREE:(state,value)=>{
			state.leftTree = value
		}
	},
	actions: {
		setCollapse({
			commit
		}, value) {
			commit('CHANGE_SET', value);
		},
		setTree({
			commit
		}, value) {
			commit('CHANGE_TREE', value);
		}
	}
}

export default systemConfig