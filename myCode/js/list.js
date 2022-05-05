window.onload=function()
{
    var aid=document.getElementById('id_a');
    var odiv=document.getElementById('h2_d');
    var bdiv=document.getElementById('proinfo'); 
    aid.onmouseover=function()
    {
        bdiv.style.display='block';
    };
    aid.onmouseout=function()
    {
        bdiv.style.display='none';
    };

};

class ListInfo{
    constructor(){
        //添加 信息
        this.addInfo();
        //绑定事件
        this.$('.shnagp_list_v1 ul').addEventListener('click',this.jGou);
    }
    //获取节点
    $(dom,a = true){
        return a?document.querySelector(dom):document.querySelectorAll(dom);
    }
    async addInfo(){
        // 等待promise 对象解包完成
        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=1')
        // console.log(data, status);
        //判断返回值的状态,追加数据
        if (status == 200) {
        console.log(data);
        let html = '';
        data.list.forEach(goods => {
            html+=`<li>
            <div class="lieb_neir_kuang">
                <div class="lieb_img">
                    <a href="#"><img src="${goods.img_big_logo}"></a>
                    <div class="p_focus"><a class="J_focus" href="#"><i></i>喜欢</a></div>
                </div>
                <div class="lieb_text">
                    <div class="p_price">
                          <strong class="J_price"><em>¥</em><i>${goods.current_price}</i><em class="shangp_yuanj zuo_ji">¥</em><i class="shangp_yuanj">${goods.price}</i></strong> 
                    </div>
                </div>
                <div class="shangp_biaot_"><a href="#">${goods.title}</a></div>
                <div class="lieb_dianp_mingc">
                    <div class="zuo_mingc" >
                        <p data-id="${goods.goods_id}"><a class="lianpu_minc" href="#">点我加入购物车</a></p>
                    </div>
                    <div class="you_pingj">
                        <span>已售${goods.sale_type}&nbsp<span>
                        <p>剩余件数${goods.goods_number}</p>
                        <span><a href="#"><em>100+</em></a> 人</span>
                    </div>
                </div>
            </div>
        </li>`
        });
        this.$('.shnagp_list_v1 ul').innerHTML = html;
        }
    }

    //跳转到 购物车界面
    async jGou(event){//加入购物车的方法
        // console.log('wolaile'); 
        //判断用户 是否登录  ，获取到token 则表示登录 ，获取 不到则表示 没登录
        let token = localStorage.getItem('token');
        if(!token) location.assign('./dengl.html?ReturnUrl=./list.html');
        let eventTag = event.target;
        let lisObj =eventTag.parentNode;
        // console.log(lisObj)
        let goodsId = lisObj.dataset.id;
        let userId = localStorage.getItem('user_id');
        //有两个id同时发送请求
        if (!userId || !goodsId) throw new Error('两个id存在问题,请打印...');
        axios.defaults.headers.common['authorization'] = token;//拿到token 凭证
        // 必须设置内容的类型,默认是json格式,server 是处理不了
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        //拼接传入的数据
        let param = `id=${userId}&goodsId=${goodsId}`;
        //如果用户登录，则添加 信息到购物车中
        let { data, status } = await axios.post('http://localhost:8888/cart/add', param);
        console.log(data,status);
        if (status == 200) {
            console.log(data.code);
            if (data.code == 1) {  //购买成功
            layer.open({
                content: '加入购物成功',
                btn: ['去购物车结算', '留在当前页面']
                    , yes: function (index, layero) {
                    // 按钮【按钮一】的回调
                    location.assign('./gouw_che.html')
                    }
                    , btn2: function (index, layero) {
                    //按钮【按钮二】的回调
                    //return false 开启该代码可禁止点击该按钮关闭
                }
                })
            }

          }
        axios.post('http://localhost:8888/cart/add',param)
    }
}
let LisObj = new ListInfo;