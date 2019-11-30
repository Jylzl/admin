import Vue from 'vue'
import Vuex from 'vuex'

import user from "@/store/module/user"
import system from '@/store/module/system'

import getters from '@/store/getters'
Vue.use(Vuex)
export const store = new Vuex.Store({

	modules: {
		user,
		system
	},
	getters
})