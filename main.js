let n
initialize()

setInterval(()=>{
  makeLeave( getImage(n))
   .one('transitionend', (e)=>{
      makeEnter($(e.currentTarget)) 
   })
  makeCurrent(getImage(n+1))
   n +=1
},3000)

function x(n){
    if(n>3){
        n = n%3
        if(n===0){
            n=3
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