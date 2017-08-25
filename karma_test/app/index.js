class PraiseButton {
    constructor(){
		this.count=0;
		this.y=-100;
		this.scale=3;
    }
    fabulous(){
        if(this.count>10){
            return this.disabled();
        }
        $('title').text('点赞'+(++this.count));
		let add1=$('<span class="add1">+'+this.count+'</span>');
		this.element.append(add1);
		return this.animation(add1,this.y,this.scale);
	}
    animation(element,y,scale){
        let t=0,s=0;
        let timer=setInterval(function(){
            // console.log(t,y , s,scale)
            if(t>y && s<scale){
                t-=2;
                s+=0.06;
                element.css({'transform':'scale('+s+') translateY('+t+'px)'})
            }else{
                clearInterval(timer);
            }
        },20)
    }
    disabled(){
        this.element.addClass('gray');
        return false;
    }
}
class Thumb extends PraiseButton{
		constructor(element){
            super();
            this.element=element;
		}
		plus1(){
            super.fabulous();
		}
}

$.extend({
    thumb:Thumb
})
