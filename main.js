let n
initialize()

let timeId=setInterval(()=>{
  makeLeave( getImage(n))
   .one('transitionend', (e)=>{
      makeEnter($(e.currentTarget)) 
   })
  makeCurrent(getImage(n+1))
   n +=1
},2000)

document.addEventListener('visibilitychange',function(){
    if(this.visibilityState==='hidden'){ //document.hidden ===true也可以
      window.clearInterval(timeId)
    }else{
        timeId=setInterval(()=>{
            makeLeave( getImage(n))
             .one('transitionend', (e)=>{
                makeEnter($(e.currentTarget)) 
             })
            makeCurrent(getImage(n+1))
             n +=1
          },2000)
    }
})



function x(n){  
    if(n>5){
        n = n%5
        if(n===0){
            n=5
        }
    }
    return n
}
function getImage(n){
    return  $(`.imges>img:nth-child(${x(n)})`)
}

function initialize(){
    n =1
    $(`.imges > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function makeCurrent($node){
    $node.removeClass('enter leave').addClass('current')
    return $node
}
function makeEnter($node){
    return  $node.removeClass('current leave').addClass('enter')
    //$node.removeClass('current leave')的返回值就是$node，然后再运行后面的addClass('enter')
    //所以 rreturn $node可以去掉，直接将$node.removeClass('current leave').addClass('enter')return出去
}
function makeLeave($node){
    $node.removeClass('current enter').addClass('leave')

return $node //这句话很精髓，因为上面的 makeLeave( $(`.imges>img:nth-child(${x(n)})`))它的值是undefined，他是没有
            //one之类的方法的，$node从传进来又传出去
}