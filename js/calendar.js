function calendar(){

    var $id=function(id){
        return document.getElementById(id)
    }

    var addNum = function(num){
        return num<10?'0'+num:num;
    }
    var weekDayList={
        zh:['周日','周一','周二','周三','周四','周五','周六'],
        En:['Su','Mo','Tu','We','Th','Fr','Sa']
    };
    var calendarFn=function(){
        this.warpBox=$id('calendar');
    }
    calendarFn.prototype={
        init:function(){
            this.nowTime=this.getNowTime();
            this.setHeader();
            this.setBody();
        },
        setHeader:function(){ //设置日历头部
            this.calendarHeader=document.createElement('div');
            // this.calendarHeader.id='canlendarHeader';
            this.calendarHeader.className='calendar-title-box';
            this.warpBox.appendChild(this.calendarHeader);
            this.createYearMonthBox();
            this.setHeaderTime();
            this.createLeft();
            this.createRight();
        },
        createYearMonthBox:function(){
            this.yearsMonthBox=document.createElement('div');
            this.calendarHeader.appendChild(this.yearsMonthBox);
        },
        createLeft:function(){
            var leftMonth=document.createElement('div');
            leftMonth.className='prev-month';
            this.calendarHeader.appendChild(leftMonth);
            this.prevMonth()
        },
        createRight:function(){
            var rigthMonth=document.createElement('div');
            rigthMonth.className='next-month';
            this.calendarHeader.appendChild(rigthMonth);
            this.nextMonth()
        },
        prevMonth:function(){
            var oLeft=this.warpBox.querySelector('.prev-month');
            var _this=this;
            oLeft.onclick=function(){
                if(_this.nowTime.m <=1){
                    _this.nowTime.y--;
                    _this.nowTime.m=12
                }else{
                    _this.nowTime.m--;
                }
                console.log(_this.nowTime,'=====');
                _this.setHeaderTime();
                _this.addTdText();
            };

        },
        nextMonth:function(){
            var oLeft=this.warpBox.querySelector('.next-month');
            var _this=this;
            oLeft.onclick=function(){
                if(_this.nowTime.m == 12){
                    _this.nowTime.y++;
                    _this.nowTime.m=1
                }else{
                    _this.nowTime.m++;
                }
                console.log(_this.nowTime,'=====');
                _this.setHeaderTime();
                _this.addTdText();
            };
        },
        setHeaderTime:function(){
            this.yearsMonthBox.innerHTML=this.nowTime.y+'年'+addNum(this.nowTime.m)+'月';
        },
        getNowTime:function(){ //获取当前时间
            var time=new Date();
            var y=time.getFullYear();
            var m=time.getMonth()+1;
            var d=time.getDate();
            return {
                y:y,
                m:m,
                d:d
            };
        },
        setBody:function(){
            this.calendarBody=document.createElement('div');
            this.calendarBody.className='calendarBody'
            this.setDay();
        },
        getFirstLastDay:function(){ //获取前月的第一天和最后一天，和第一天的周几，当前是几号

            var firstDay = new Date(this.nowTime.y, this.nowTime.m-1, 1);
            var lastDay = new Date(this.nowTime.y, this.nowTime.m, 0);
            var prevMonthLastDay=new Date(this.nowTime.y, this.nowTime.m-1, 0)
            return {
                first:firstDay.getDate(),
                last:lastDay.getDate(),
                firstWeek:firstDay.getDay(),
                lastWeek:lastDay.getDay(),
                // nowDay:d
                prevMonthLastDay:prevMonthLastDay.getDate()
            }
        },
        setDay:function(){//生成日历格式
            this.oTab=document.createElement('table');
            var result='';
            //一周七天
            result="<thead><tr>";
            for(var t=0; t<7; t++){
                result+='<th>'+weekDayList.zh[t]+'</th>';
            }
            result+='</tr></thead><tbody><tr>';
            for(var a=0; a<42; a++){
                if(a%7==0 && a!=0){
                    result+='</tr><tr>';
                }
                result+='<td></td>'
            }
            result+="</tr></tbody>";
            this.oTab.innerHTML=result;
            this.calendarBody.appendChild(this.oTab);
            this.warpBox.appendChild(this.calendarBody);
            this.addTdText();
        },
        addTdText:function(){  //往表里面排天数
            var nowMonthFirstLast=this.getFirstLastDay();
            var oTd=this.oTab.getElementsByTagName('td');
            for(var t=0,n=oTd.length; t<n; t++){
                if(t<nowMonthFirstLast.firstWeek){
                    oTd[t].className='notNowMonthDay';
                    oTd[t].innerHTML= nowMonthFirstLast.prevMonthLastDay-(nowMonthFirstLast.firstWeek -t-1);
                    continue;
                }
                if((t-nowMonthFirstLast.firstWeek)>=nowMonthFirstLast.last){
                    oTd[t].innerHTML=(t-nowMonthFirstLast.firstWeek-nowMonthFirstLast.last)+1;
                    oTd[t].className='notNowMonthDay';
                    continue;
                }

                if(((t-nowMonthFirstLast.firstWeek)+1)==nowMonthFirstLast.nowDay){
                    oTd[t].innerHTML='<a href="javascript:;">'+((t-nowMonthFirstLast.firstWeek)+1)+'</a>'
                }else{
                    oTd[t].className='';
                    oTd[t].innerHTML=(t-nowMonthFirstLast.firstWeek)+1
                }
            }
        }
    }

    return new calendarFn().init();
}
calendar();


















