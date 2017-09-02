

Depict=(function(){

canvas=document.createElement("canvas");
canvas.width=600;
canvas.height=600;
var body=document.getElementsByTagName("body").item(0);
var ctx=canvas.getContext("2d")
body.appendChild(canvas);




function _clearAll(){

  ctx.clearRect(0,0,canvas.width,canvas.width);
  Observer.execute.splice(0,Observer.length);
  Objects.obj.splice(0,Objects.obj.length);

}

var Observer={

  execute:[],
  wait:[],
  get ob(){return this.execute},

  set ob(result){
    this.execute.push(result);
    this.begin();
  },

  begin(){
    var exe=this.ob;
    var wait=Observer.wait;
    setInterval(function(){
    for(var i=0; i<exe.length; i++){

      if(exe[i]()!=false){
        if(exe.includes(exe[i])){
          var append=exe[i];
          exe[i]()();
          exe.splice(exe[i],1);
          wait.push(append)
          }
        }
      }
    for(var i=0; i<wait.length; i++){
      if(wait[i]()===false){
        Observer.execute.push(wait[i]);
        wait.splice(wait[i],1)
      };
    }


  },1)
  }

}

var ObjectGroup={

  "RectangleObject":Rectangle,
  "CircleObject":Circle,

}

var Objects={

  group:[],
  get obj(){return this.group},
  set  obj(obj){
    this.group.push(obj);

  }
}



setInterval(function(){
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  for(var i=0; i<Objects.obj.length; i++){
    Objects.obj[i].draw();
  }


},10)





function _addColliedeOberve(object1,object2,func){

  var obj_1=object1.prop;
  var obj_2=object2.prop;


  if(object1.name===object2.name){
      if(obj_1.name==="Rectangle"){
        Observer.ob=function(){
          if(Math.abs(obj_1.x-obj_2.x)<obj_1.width/2+obj_2.width/2 &&
            Math.abs(obj_1.y-obj_2.y)<obj_1.height/2+obj_2.height/2
          ){return func }else{return false}
        };
      }else{
        Observer.ob=function(){
          if(Math.abs(obj_1.x-obj_2.x)<obj_1.radius+obj_2.radius &&
          Math.abs(obj_1.y-obj_2.y)<obj_1.radius+obj_2.radius
        ){return func }else{return false}
        }
      }
      }else{
        if(object1.name==="Rectangle"){
          Observer.ob=function(){
            if(Math.abs(obj_1.x+Math.abs(obj_1.width/2)-obj_2.x)<obj_2.radius+obj_1.width/2 &&
            Math.abs(obj_1.y+Math.abs(obj_1.height/2)-obj_2.y)<obj_2.radius+obj_1.height/2
          ){return func }else{return false}
          }
        }else{
          Observer.ob=function(){
          if(Math.abs(Math.abs(obj_2.width/2)+obj_2.x-obj_1.x)<obj_1.radius+obj_2.width/2 &&
          Math.abs(Math.abs(obj_2.height/2)+obj_2.y-obj_1.y)<obj_1.radius+obj_2.height/2
      ){return func }else{return false}

          }
        }
      }
}



function _DefineObject(Obj,prop){

  var Type=ObjectGroup[Obj];
  var obj=new Type(prop);
  if(!obj.prop.transprancy){
    obj.prop.transprancy=1;
  }

  return obj
}


var TypeGroup=[Rectangle,Circle]

function Rectangle(prop){

  this.name="Rectangle";
  this.prop=prop;

}

function Circle(prop){

  this.name="Circle";
  this.prop=prop

}



for(var i in TypeGroup){

  TypeGroup[i].prototype.fadeOut=function(speed){

    var self=this;

    var id=setInterval(function(){

      if(self.prop.transprancy>0.1){
        self.prop.transprancy-=self.prop.transprancy*10/speed;
      }else{
      Objects.obj.splice(Objects.obj.indexOf(self),1)
      clearInterval(id)
    }

  },1)

}


  TypeGroup[i].prototype.fadeIn=function(speed){

    var self=this;
    this.prop.transprancy=0;
    Objects.obj=self;

    var id=setInterval(function(){
      if(self.prop.transprancy<1){
        self.prop.transprancy+=10/speed;

    }else{
      self.prop.transprancy=1;
      clearInterval(id);

    }
  },1)

}

  TypeGroup[i].prototype.migrate=function(x,y,speed,func){

      var prop=this.prop
      var len={
        lengthX:x-prop.x,
        lengthY:y-prop.y
      };

      var id=setInterval(function(){

        prop.x+=len.lengthX/speed*10;
        prop.y+=len.lengthY/speed*10;

        if(Math.abs(x-prop.x)<1 && Math.abs(y-prop.y)<1){
          Math.ceil(prop.x);
          Math.ceil(prop.y);
          if(typeof func==="function")func();
          clearInterval(id)
        }

      },10)

  }

}


Rectangle.prototype.draw=function(){


    if(!Objects.obj.includes(this))Objects.obj=this;
    var text=this.prop.text;
    var prop=this.prop;

    ctx.beginPath();
    ctx.rect(prop.x,prop.y,prop.width,prop.height);
    ctx.fillStyle=prop.fill;
    ctx.strokeStyle=prop.stroke;
    ctx.globalAlpha=prop.transprancy;
    ctx.fill();
    ctx.closePath();

    if(text){
    ctx.beginPath();
    ctx.fillStyle=text.fill;
    ctx.textAlign="center";
    ctx.textBaseline="center";
    ctx.font=(prop.width/2+prop.height/2)/2+"px "+"MS-Gothic"
    ctx.fillText(text.value,prop.x+prop.width/2,prop.y+prop.height*0.75,prop.width);
    ctx.closePath();
    }
  }

Circle.prototype.draw=function(){

  if(!Objects.obj.includes(this))Objects.obj=this;

    var text=this.prop.text;
    var prop=this.prop;

    ctx.beginPath();
    ctx.arc(prop.x,prop.y,prop.radius,0,360);
    ctx.fillStyle=prop.fill;
    ctx.strokeStyle=prop.stroke;
    ctx.globalAlpha=prop.transprancy;
    ctx.fill();
    ctx.closePath();

    if(text){
    ctx.beginPath();
    ctx.fillStyle=text.fill;
    ctx.textAlign="center";
    ctx.textBaseline="center";
    ctx.font=prop.radius+"px "+"MS-Gothic"
    ctx.fillText(text.value,prop.x,prop.y+prop.radius/2,prop.radius);
    ctx.closePath();
  }
  }



return {
  DefineObject:_DefineObject,
  addCollisionObserve:_addColliedeOberve,
  clearAll:_clearAll,
}

}())
