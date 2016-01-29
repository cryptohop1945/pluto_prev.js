/*!
 * PLUTO IMAGE PREVIEWER (RESPONSIVE) ver. 1.0 - 2015-10-20 by mars :)
 * FREE FOR PERSONAL & COMMERCIAL USE 
 */

/*
SAMPLE*****
<div class="img-list" >
    <img src="_pl_plugin/pluto-prev/test-pic/1.jpg"/>
    <img src="_pl_plugin/pluto-prev/test-pic/2.jpg"/>
    <img src="_pl_plugin/pluto-prev/test-pic/3.jpg"/>
    <img src="_pl_plugin/pluto-prev/test-pic/4.jpg"/>
</div>

<script>
    $(document).ready(function(){
        pluto_prev._index({"div-holder" : $(".img-list") });
        });
</script>

*/

var pluto_prev = new function()
{
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._vars = {
        "initial-count" : 0,
        "div-holder": null,
        "imgs" : null,
        "form" : [
                  "<div class='pluto-prev-main'>",
                        
                    "<div class='pluto-prev-sub'>",
                    //******************************
                        "<div class='pluto-prev-option'>",
                            "<a title='Close Preview Window' class='pluto-prev-button exit pluto-exit' href='#'></a>",
                        "</div>",
                        "<div class='pluto-prev-tmb-holder'>",
                            "<div class='pluto-prev-tmb'>",
                            
                                 "<div class='clear-fix'>",
                                 "</div>",
                            "</div>",
                           
                        "</div>",
                    //******************************
                    
                    "</div>",
                  "</div>"
                  ].join("")
        };
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._default_bind = function(array_params)
    {
        $.each(pluto_prev._vars['div-holder'],function(){
            
            pluto_prev._vars['imgs'] = $(this).find("img");
        
      

        
        pluto_prev._vars['imgs'].unbind().bind({
            click: function()
            {
                
                
                //+++++++++++ RESETTING IMG
                
                pluto_prev._vars['imgs'] = $(this).parent().parent().find("img");
                var index = 0;
                $.each(pluto_prev._vars['imgs'],function(key,val)
               {
                  index++;
                  $(this).attr("data-index",index);
                });
                //+++++++++++ RESETTING IMG
                
                var current_img = ($(this).clone());
                var current_index = $(this).attr("data-index");
               // alert(current_index);
                pluto_prev._initial_count_set({"initial-count" : current_index});
                pluto_prev._show({"current-img" : current_img});
                
                return false;
            }
        });
            
            });
        
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._initial_count_set = function(array_params)
    {
        var initial_count = parseInt(array_params['initial-count']);
        pluto_prev._vars['initial-count'] = initial_count;
        
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._initial_count_get = function(array_params)
    {
        return pluto_prev._vars['initial-count'];
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._move_back = function(array_params)
    {
        
        //this._vars['initial-count']
    
        var current_count = pluto_prev._initial_count_get({});
        current_count-=1;
   
        if (current_count<=0)
        {
            current_count = pluto_prev._vars['imgs'].length;
        }
        
        var count = 0;
     
        
        $.each(pluto_prev._vars['imgs'],function()
               {
                    count++;
   
                    if (current_count==count)
                    {
                             
                       pluto_prev._initial_count_set({"initial-count" :  count});
                        var current_img = ($(this).clone());
                        pluto_prev._show({"current-img" : current_img});
                        return false;
                    }
                });
        
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._move_next = function(array_params)
    {
        var current_count = pluto_prev._initial_count_get({});
     //   alert(current_count);
        current_count+=1;
   
        if (current_count>pluto_prev._vars['imgs'].length)
        {
            current_count = 1;
        }
   
        var count = 0;
        $.each(pluto_prev._vars['imgs'],function()
               {
                    count++;
                    if (current_count==count)
                    {
                        pluto_prev._initial_count_set({"initial-count" : count});
                        
                        var current_img = ($(this).clone());
                        pluto_prev._show({"current-img" : current_img});
                        return false;
                    }
                });
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._custom_show = function(array_params)
    {
        //"current-count" : current_count
        var current_count = array_params['current-count'];
       // current_count-=1;
        
        var count = 0;
        $.each(pluto_prev._vars['imgs'],function()
               {
                    count++;
                    if (current_count==count)
                    {
                         pluto_prev._initial_count_set({"initial-count" : count});
                        var current_img = ($(this).clone());
                        pluto_prev._show({"current-img" : current_img});
                        return false;
                    }
                });
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._show = function(array_params)
    {
        pluto_prev._hide({"fast-close":true});
        var current_img = array_params['current-img'];
        current_img.addClass("current");
        current_img.css({"display" : "none"});
        

        var body = $("body");
        
        body.append(pluto_prev._vars['form']);
        body.unbind().bind({
            keydown: function(event)
            {
                var evt = event.which;
                //37,39
                if (evt==27)
                {
                   $(".pluto-exit").click();
                }
                
                if (evt==37)
                {
                    pluto_prev._move_back({});
                }
                
                if (evt==39)
                {
                    pluto_prev._move_next({});
                }
            },
        });
        $(".pluto-prev-main").unbind().bind({
            
            click: function()
            {
               $(".pluto-exit").click();
                return false;
            }
        });
        $(".pluto-exit").unbind().bind({
            click: function()
            {
                pluto_prev._hide({});
                return false;
            }
        })
        $(".pluto-prev-sub").unbind().bind({
            click: function()
            {
                return false;
            }
        });
       $(".pluto-prev-sub").append(current_img);
        var img_w = current_img.css("width");
        var img_h = current_img.css("height");
       //"width" : img_w,

       $(".pluto-prev-tmb-holder").hide();
       $(".pluto-prev-option").hide();


       $(".pluto-prev-sub").css({"width" : img_w,"height" : img_h});
        

       // alert($(".pluto-prev-sub").css("width") + " - " + img_w);
     
       current_img.fadeIn(150,function(){

         $(".pluto-prev-tmb-holder").show();
         $(".pluto-prev-option").show();
       });
       
       current_img.unbind().bind({
            load: function()
            {
                $(".pluto-prev-sub").css({"background" : "transparent"});
            },
            click: function()
            {
     
                pluto_prev._move_next({});
                return false;
            }
       });
       

        var clone_img = Array();
        var count = 0;
        
         var current_count = pluto_prev._initial_count_get({});
         
       
        $.each(pluto_prev._vars['imgs'],function()
               {
                count++;
                var img = $(this).clone();
                clone_img.push(img);
                
                img.addClass("sub-current");
                
                if (current_count==count)
                {
                    img.addClass("sub-current-real");
                }
                
                img.attr("data-count",count);
                
                $(".pluto-prev-tmb").append(img);
                });
        var img_tmb = $(".pluto-prev-tmb").find("img");
        
        img_tmb.unbind().bind({
            click: function()
            {
                var current_count = $(this).attr("data-count");
                pluto_prev._custom_show({"current-count" : current_count});
                return false;
            }
        })
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._hide = function(array_params)
    {
         
        if (typeof array_params['fast-close']!='undefined')
        {
            $(".pluto-prev-tmb").hide();
            $(".pluto-prev-main").fadeOut(800,function(){
               $(this).remove();
                return false;
                });
            
        }
        $(".pluto-prev-main").fadeOut(300,function(){
             pluto_prev._initial_count_set({"initial-count" :  0 });
            $(this).remove();
            });
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    this._index = function(array_params)
    {
        pluto_prev._vars['div-holder'] = array_params['div-holder'];
        pluto_prev._default_bind({});
    }
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
}