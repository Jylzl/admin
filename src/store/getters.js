
const getters = {
	permission_routes: state => state.user.routers,
	getUser: state => state.user.user,
	getAsideWidth: state => state.system.asideWidth,
	getCollapse: state => state.system.collapse,
	getTree:state=>state.system.leftTree
}
export default getters