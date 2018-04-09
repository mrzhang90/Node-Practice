require('./content.css');
const content={
	init(){
		new Vue({
		  el: '#app',
		  data: {
		    message: 'Hello Vue!'
		  }
		})
	}
}
export default content;