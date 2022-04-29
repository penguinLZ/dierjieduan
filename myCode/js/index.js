//获取节点
function $(dom,a = true){
    return a?document.querySelector(dom):document.querySelectorAll(dom);
}
