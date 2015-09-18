/***********************
@author :livi
@description:右侧栏导航
调用方法
     var m=new moreTab({
          id:tablist,
          itemList:[{'name':'财经','hLink':'www.baidu.com'},{'name':'体育','hLink':'http://news.qq.com/'},{'name':'娱乐','hLink':'www.baidu.com'},{'name':'房产','hLink':'www.baidu.com'},{'name':'科技','hLink':'www.baidu.com'},{'name':'汽车','hLink':'www.baidu.com'},{'name':'数码','hLink':'www.baidu.com'},{'name':'时尚','hLink':'www.baidu.com'},{'name':'教育'],
          tabItemLen:7
        });
});
************************/
  function moreTab(o){
      this.init(o);
  }
  moreTab.prototype = {
      /*创建右导航*/
      init:function(o){
        this.obj=$(o.id);
        this.itemList=o.itemList;
        this.itemLen=this.itemList.length;
        this.tabItemLen=o.tabItemLen;
        this.build(o);
        this.tabItemClick();
      },
      build:function(o){
        var contentStr='<div class="tab-list"><ul class="card f-clearfix"><li class="active tab-li"><a target="_blank" href="'+this.itemList[0].hLink+'">'+this.itemList[0].name+'</a></li>';
        var itemLen=(this.tabItemLen>=this.itemLen)?this.itemLen:this.tabItemLen;
        if(this.itemLen==1){
          contentStr+="</ul></div>";
        }
        else{
          for(var i=1;i<itemLen-1;i++){
            contentStr+='<li class="tab-li"><a target="_blank" href="'+this.itemList[i].hLink+'">'+this.itemList[i].name+'</a></li>';
          }
          if(this.tabItemLen>=this.itemLen){
            var itemClass=(this.tabItemLen==this.itemLen)?'f-noborder tab-li':'tab-li';
            contentStr+='<li class="'+itemClass+'"><a target="_blank" href="'+this.itemList[i].hLink+'">'+this.itemList[i].name+'</a></li></ul></div>';
          }
          else{
            contentStr+='</ul></div>'+
              '<div class="more-tab">'+
              '<div class="channelNavMore">更多</div>'+
              '<ul>';
              for(var i=this.tabItemLen-1;i<this.itemLen;i++){
                contentStr+='<li><a target="_blank" href="'+this.itemList[i].hLink+'">'+this.itemList[i].name+'</a></li>'
              }
            contentStr+='</ul></div>';
            this.moreBtnHover();
          }
        }
        this.obj.append(contentStr);
      },
      moreBtnHover:function(){
        $('.m-tab-hd').on('mouseover mouseout','.more-tab',function() {
          if(event.type == "mouseover"){
           $(this).children('ul').show();
          }else if(event.type == "mouseout"){
            $(this).children('ul').hide();
          }
        });
      },
      tabItemClick:function(){
        $('.m-tab-hd').on('click', '.tab-li', function(event) {
           var elem=$(this);
           $('.m-tab-hd .more-tab ul li').removeClass('active').closest('ul').siblings('.channelNavMore').removeClass('active');
           elem.siblings('.tab-li').removeClass('active').end().addClass('active');
        });
        $('.m-tab-hd').on('click', '.more-tab ul li', function(event){
          var elem=$(this);
          var elemText=elem.children('a').text();
          $('.m-tab-hd .tab-li').removeClass('active');
          elem.siblings('li').removeClass('active').end().addClass('active').closest('ul').siblings('.channelNavMore').text(elemText).addClass('active');
        });
      }
  }