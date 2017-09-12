
Depict=(function(){

  Object.prototype.Canvas=function(prop){

    var body=document.getElementsByTagName("body").item(0);
    var canvas=document.createElement("canvas");
    var canvasContainer=document.createElement("div");
    var ctx=canvas.getContext("2d");
    var self=this;

    if(prop.width==="maximum"){
      //regulate the size of the canvas maximum
      window.addEventListener("load",defineW);
      window.addEventListener("resize",defineW);
    }else{
      canvas.width=prop.width;
    }

    if(prop.height==="maximum"){
      //regulate the size of the canvas maximum
      window.addEventListener("load",defineH);
      window.addEventListener("resize",defineH);
    }else{
      canvas.height=prop.height;
    }

    function defineW(){  canvas.width=window.innerWidth;  }

    function defineH(){  canvas.height=window.innerHeight; }


    canvasContainer.width=canvas.width;
    canvasContainer.height=canvas.height;
    canvas.style.border=prop.border+"px solid";
    canvasContainer.align="center"
    body.appendChild(canvasContainer);
    canvasContainer.appendChild(canvas);

    Object.defineProperty(this,"prop",{
      writable:true,
      value:prop
    })


    Object.defineProperty(this,"canvas",{
      writable:true,
      value:canvas
    })

    Object.Canvas.prototype.instances=[]


    Object.defineProperty(this,"setter",{
      set:function(instance){
        Object.Canvas.prototype.instances.push(instance)
      }
    })

    setInterval(function(){

      ctx.clearRect(0,0,canvas.width,canvas.height)

      for(var i=0; i<self.instances.length; i++){
        self.instances[i].draw()
      }

  },10)

}

  Object.prototype.Circle=function(prop){

    prop.width=prop.radius
    prop.height=prop.radius

    Object.defineProperty(this,"prop",{
      writable:true,
      value:prop
    })

  }

  Object.prototype.Rectangle=function(prop){

    Object.defineProperty(this,"prop",{
      writable:true,
      value:prop
    })

  }

  Object.prototype.Line=function(prop){

      prop.width=Math.abs(prop.x[1]-prop.x[0])!=0 || 1;
      prop.height=Math.abs(prop.y[1]-prop.y[0]);
      

    Object.defineProperty(this,"prop",{
      writable:true,
      value:prop
    })


  }


  Object.prototype.Text=function(prop){

    prop.width=prop.fontSize/2;
    prop.height=prop.fontSize/2;

    Object.defineProperty(this,"prop",{
      writable:true,
      value:prop
    })

  }

  Object.prototype.Image=function(prop){

    Object.defineProperty(this,"prop",{
      writable:true,
      value:prop
    })


  }

  Object.prototype.Image.prototype.draw=function(canvas){

    if(!this.canvas)this.canvas=canvas;
    if(canvas)canvas.setter=this;
    var ctx=this.canvas.canvas.getContext("2d");
    var prop=this.prop
    var img=new Image();
    img.src=prop.src;

    ctx.beginPath();
    ctx.drawImage(img,prop.x-prop.width/2,prop.y-prop.height/2,prop.width,prop.height);
    ctx.globalAlpha=prop.transprancy;
    ctx.closePath();
  }



  Object.prototype.Text.prototype.draw=function(canvas){

    if(!this.canvas)this.canvas=canvas;
    if(canvas)canvas.setter=this;
    var ctx=this.canvas.canvas.getContext("2d");
    var prop=this.prop

    ctx.beginPath();
    ctx.fillStyle=prop.fill;
    ctx.lineWidth=prop.strokeWidth;
    ctx.strokeStyle=prop.stroke;
    ctx.shadowBlur=prop.shadowBlur;
    ctx.shadowColor=prop.shadow
    ctx.shadowOffsetX=prop.shadowX;
    ctx.shadowOffsetY=prop.shadowY;
    ctx.globalAlpha=prop.transprancy;
    ctx.font=prop.fontSize+"px "+prop.font;
    ctx.textAlign="center";
    ctx.textBaseline="center";
    ctx.fillText(prop.text,prop.x,prop.y,prop.limit);
  }


  Object.prototype.Line.prototype.draw=function(canvas){

    if(!this.canvas)this.canvas=canvas;
    //if the object is not in instances it pushes in.
    if(canvas)canvas.setter=this;
    var ctx=this.canvas.canvas.getContext("2d");
    var prop=this.prop

    ctx.beginPath();
    ctx.lineCap=prop.cap;
    ctx.strokeStyle=prop.fill;
    ctx.miterLimit=prop.limit;
    ctx.shadowBlur=prop.shadowBlur;
    ctx.shadowColor=prop.shadow;
    ctx.shadowOffsetX=prop.shadowX;
    ctx.shadowOffsetY=prop.shadowY;
    ctx.globalAlpha=prop.transprancy;
    ctx.moveTo(prop.x[0],prop.y[0]);
    ctx.lineTo(prop.x[1],prop.y[1]);
    ctx.stroke();
  }

  Object.prototype.Circle.prototype.draw=function(canvas){

    if(!this.canvas)this.canvas=canvas;
    if(canvas)canvas.setter=this;
    var ctx=this.canvas.canvas.getContext("2d");
    var prop=this.prop
    this.width=this.radius;

    ctx.beginPath();
    ctx.fillStyle=prop.fill;
    ctx.lineWidth=prop.strokeWidth;
    ctx.strokeStyle=prop.stroke;
    ctx.shadowBlur=prop.shadowBlur;
    ctx.shadowColor=prop.shadow
    ctx.shadowOffsetX=prop.shadowX;
    ctx.shadowOffsetY=prop.shadowY;
    ctx.globalAlpha=prop.transprancy;
    ctx.arc(prop.x,prop.y,prop.width,0,360);
    ctx.fill();
    ctx.stroke();
    ctx.closePath()
}

  Object.prototype.Rectangle.prototype.draw=function(canvas){

    if(!this.canvas)this.canvas=canvas;
    if(canvas)canvas.setter=this;
    var ctx=this.canvas.canvas.getContext("2d");
    var prop=this.prop

    ctx.beginPath();
    ctx.fillStyle=prop.fill;
    ctx.lineWidth=prop.strokeWidth;
    ctx.strokeStyle=prop.stroke;
    ctx.shadowBlur=prop.shadowBlur;
    ctx.shadowColor=prop.shadow;
    ctx.shadowOffsetX=prop.shadowX;
    ctx.shadowOffsetY=prop.shadowY
    ctx.globalAlpha=prop.transprancy;
    ctx.rect(prop.x-prop.width/2,prop.y-prop.height/2,prop.width,prop.height);
    ctx.fill()
    ctx.stroke();
    ctx.closePath()
}


var objectgroup=[Circle,Rectangle,Text,Line,Image]

for(var i in objectgroup){
  //for Line
  Object.prototype.migrate=function(x,y,speed,fn){
    var prop=this.prop;
    var self=this;

    if(typeof prop.x==="object"){
      console.log("A");
      if(!lengthX0){
        var lengthY0=y[0]-prop.y[0];
        var lengthX0=x[0]-prop.x[0];
        var lengthY1=y[1]-prop.y[1];
        var lengthX1=x[1]-prop.x[1];

      }

      var interval=setInterval(function(){

        prop.x[0]+=lengthX0/speed*10;
        prop.y[0]+=lengthY0/speed*10;
        prop.x[1]+=lengthX1/speed*10;
        prop.y[1]+=lengthY1/speed*10;

        if(Math.abs(x[0]-prop.x[0])<1 && Math.abs(y[0]-prop.y[0])<1){
          Math.ceil(prop.y[0]);
          Math.ceil(prop.x[0]);
          if(typeof fn==="function" &&
        self.canvas.instances.includes(self)){
            fn();
          }

          clearInterval(interval);

        }

      },1)
    }else{
      //for other objects.
    if(!lengthX){
      var lengthY=y-prop.y;
      var lengthX=x-prop.x;
    }

    var interval=setInterval(function(){

      prop.x+=lengthX/speed*10;
      prop.y+=lengthY/speed*10;

      if(Math.abs(x-prop.x)<1 && Math.abs(y-prop.y)<1){
        Math.ceil(prop.y);
        Math.ceil(prop.x);
        if(typeof fn==="function" &&
      self.canvas.instances.includes(self)){
          fn();
        }

        clearInterval(interval);

      }

    },1)
  }
}

  Object.prototype.remove=function(canvas){
    //clears all objects drawn in the canvas
    canvas.instances.splice(canvas.instances.indexOf(this),1);

  }


  Object.prototype.fadeIn=function(canvas,speed){

      var prop=this.prop;
      this.prop.transprancy=0;
      this.draw(canvas)
      var interval=setInterval(function(){

        if(prop.transprancy<1){

          prop.transprancy+=10/speed;

      }else{

        prop.transprancy=1;
        clearInterval(interval)
      }

    },1)

  }

  Object.prototype.fadeOut=function(canvas,speed){

    var prop=this.prop;
    var self=this;
    if(!prop.transprancy)prop.transprancy=1

    if(!fadeout){
      var fadeout=prop.transprancy/speed
    }
    var interval=setInterval(function(){

      if(prop.transprancy>0.1){

        prop.transprancy-=fadeout*10;

      }else{
        self.remove(canvas)
        clearInterval(interval)
    }

  },1)
  }

  Object.prototype.observeCollision=function(object2,fn){

    var self=this;
    var prop1=this.prop;
    var prop2=object2.prop;

    var prop1X=function(){
      if(typeof prop1.x==="object"){
        // for lines
        return Math.abs(prop1.x[0]-prop1.width);
      }else{
        return prop1.x;
      }
    }

    var prop1Y=function(){
      if(typeof prop1.y==="object"){
        // for lines
        return Math.abs(prop1.y[0]-prop1.height);
      }else{
        return  prop1.y;
      }
    }

    var prop2X=function(){
      if(typeof prop2.x==="object"){
        // for lines
        return Math.abs(prop2.x[0]-prop2.width);
      }else{
        return prop2.x;
      }
    }

    var prop2Y=function(){
      if(typeof prop2.y==="object"){
        // for lines
        return Math.abs(prop2.y[0]-prop2.height);
      }else{
        return prop2.y;
      }
    }


    interval1()
      function interval1(){

        var interval1=setInterval(function(){

          var p1x=prop1X();
          var p2x=prop2X();
          var p1y=prop1Y();
          var p2y=prop2Y();

          if(Math.abs(p1x-p2x)>prop1.width/2+prop2.width/2 ||
              Math.abs(p1y-p2y)>prop1.height/2+prop2.height/2
            ){
              interval2()
              clearInterval(interval1)
            }
          },1)
        }

    function interval2(){

      var interval=setInterval(function(){

        var p1x=prop1X();
        var p2x=prop2X();
        var p1y=prop1Y();
        var p2y=prop2Y();

       if(Math.abs(p1x-p2x)<prop1.width/2+prop2.width/2){
          if(Math.abs(p1y-p2y)<prop1.height/2+prop2.height/2){
            //if "clearAll()" method is called do not call fn().
            if(self.canvas.instances.includes(self) &&
            self.canvas.instances.includes(object2)
          )fn();
          interval1()
          clearInterval(interval)

          }
        }
      },100)
      }
    }

    Object.prototype.scale=function(w,h,speed){

      var self=this;
      if(!this.prop.fontSize){

    var scaleW=w-this.prop.width;
    var scaleH=h-this.prop.height;


    var interval1=setInterval(function(){
      if(Math.abs(w-self.prop.width)>1 || Math.abs(h-self.prop.height)>1){
      self.prop.width+=scaleW/speed*10;
      self.prop.height+=scaleH/speed*10;
      self.prop.radius+=scaleW/speed*10;
    }else{

      clearInterval(interval1)
    }
  },1)

  }else{
    var scale=w-this.prop.radius
    var interval2=setInterval(function(){
      if(Math.abs(w-self.prop.fontSize)>1){
      self.prop.fontSize+=scale/speed*10;
    }else{
      clearInterval(interval2)
    }
    },1)
  }
    }

    var observeCollision=function(e,fn,self){

      var rect=e.target.getBoundingClientRect();
      var x=e.clientX-rect.left;
      var y=e.clientY-rect.top;

      if(Math.abs(self.prop.x-x)<self.prop.width/2 &&
          Math.abs(self.prop.y-y)<self.prop.height/2){
            if(typeof fn==="function")fn();
          }
      }

    var observeCollision2=function(e,fn,self){

      var rect=e.target.getBoundingClientRect();
      var x=e.clientX-rect.left;
      var y=e.clientY-rect.top;
      if(Math.abs(self.prop.x-x)>self.prop.width/2 ||
          Math.abs(self.prop.y-y)>self.prop.height/2){
            if(typeof fn==="function")fn()
          }
    }

    Object.prototype.onclick=function(fn){

      var canvas=this.canvas.canvas;
      var self=this;

      //execute function when the object is clicked
      canvas.addEventListener("click",function(e){
        //check if the "clearAll" method is not called.
        if(self.canvas.instances.includes(self)){
        observeCollision(e,fn,self)
      }
      })
    }

    Object.prototype.mouseover=function(fn){

      var canvas=this.canvas.canvas;
      var self=this;

      //execute function when mousemove is called.
      canvas.addEventListener("mousemove",function(e){
        //check if the "clearAll" method is not called.
        if(self.canvas.instances.includes(self)){
        observeCollision(e,fn,self);
      }
      })
    }

    Object.prototype.mouseout=function(fn){

      var canvas=this.canvas.canvas;
      var self=this;

      //execute function when mousemove is called.
      canvas.addEventListener("mousemove",function(e){
        //check if the "clearAll" method is not called.
        if(self.canvas.instances.includes(self)){
        observeCollision2(e,fn,self)
      }
      })
}
}
  function _CreateElement(element,prop){

    var instance=new Object[element](prop);
    return instance;

  }

  function _clearAll(Canvas){
    Canvas.instances.splice(0,Canvas.instances.length);

    }

return{

  CreateElement:_CreateElement,
  clearAll:_clearAll
}

}())
