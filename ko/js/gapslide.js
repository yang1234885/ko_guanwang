/*
function:   ueLevelGapSlide
author:     jin
depends:    jquery-1.4.pack.js
			
firstTime:  2010-02-01
lastTime:   2010-03-18
*/
(function($) {
	$.fn.ueLevelGapSlide=function(opt){
		//settings
		var settings=jQuery.extend(
			{
				gsProductScrollWitch:"ul",//相对this选择器，产生滚动条的大div
				gsList:"ul > li",//相对this选择器，list对象
				gsStep:1,//滚动步长
				gsColumn:1,//可视范围分列数目
				speed:"normal",//滚动速度
				timer:3000,//间隔时间
				orientation:"right",//默认滚动方向，只有左右，left,right
				gsBtnLeft:"#left",//向左按钮
				gsBtnRight:"#right",//向右按钮
				gsBugD1Width:0//table布局情况下经常有取不到width值情况，针对此可进行的补丁操作,正常情况下无需启用该补丁
			},
			opt
		);
		//settings
		var gsProductScrollWitch=settings.gsProductScrollWitch,
			gsList=settings.gsList,
			gsStep=settings.gsStep,
			gsColumn=settings.gsColumn,
			speed=settings.speed,
			timer=settings.timer,
			orientation=settings.orientation,
			gsBtnLeft=$(settings.gsBtnLeft),
			gsBtnRight=$(settings.gsBtnRight),
			gsBugD1Width=settings.gsBugD1Width;
		//div
		var $this=$(this);
		var thisselector=$this.selector;
		var d1=$this,
			d2=d1.find(gsProductScrollWitch),
			d3=d1.find(gsList);
		//d1Width
		var d1Width=d1.width();
		if(gsBugD1Width!=0){
			d1Width=gsBugD1Width;
		}else{
			if(d1Width==0){
				alert("Err:d1Width==0");
			}
		}
		//other width size ...
		var d3OldSize=d3.size();
		var d3Size=d3OldSize*3;
		var splitWidth=d1Width/gsColumn;
		var stepWidth=gsStep*splitWidth;
		var d3OldWidth=splitWidth*d3OldSize;
		var d2Width=d3OldWidth*3;
		//fall short of nmuber,return false
		if(d3OldWidth<d1Width)return false;
		//clone for fill
		for(var i=0;i<d3OldSize;i++){
			d3.eq(i).clone(true).appendTo(d2);
			d3.eq(d3OldSize-1-i).clone(true).prependTo(d2);
		}
		//bear with
		d2.width(d2Width+100);
		//default scrollleft
		//d1.scrollLeft(d3OldWidth);
		d1.animate({scrollLeft:d3OldWidth},speed);
		//
		var flag=true;
		//left
		var left=function(e){
			if(!flag)return false;
			flag=false;
			d1.animate({scrollLeft:d1.scrollLeft()+stepWidth},speed,function(){
				for(i=1;i<=gsStep;i++){
					d2.children().eq(0).appendTo(d2);
				}
				d1.scrollLeft(d3OldWidth);
				flag=true;
			});
			orientation="left";
			return false;
		};
		//right
		var right=function(e){
			if(!flag)return false;
			flag=false;
			d1.scrollLeft(d3OldWidth);
			d1.animate({scrollLeft:d1.scrollLeft()-stepWidth},speed,function(){
				for(i=1;i<=gsStep;i++){
					d2.children().eq(d3Size-1).prependTo(d2);
				}
				d1.scrollLeft(d3OldWidth);
				flag=true;
			});
			orientation="right";
			return false;
		};
		//timer
		var timerID;
		var autoPlay=function(){
			switch(orientation)
			{
				case "left": timerID = window.setInterval(left,timer);break;
				case "right": timerID = window.setInterval(right,timer);break;
			}
			return false;
		};
		var autoStop = function(){
			window.clearInterval(timerID);
			return false;
		};
		//ready autoPlay
		$(document).ready(autoPlay);
		//
		$this.hover(autoStop,autoPlay);
		//btn
		gsBtnLeft.click(left);
		gsBtnLeft.hover(autoStop,autoPlay);
		gsBtnRight.click(right);
		gsBtnRight.hover(autoStop,autoPlay);
		return false;
	};
})(jQuery);