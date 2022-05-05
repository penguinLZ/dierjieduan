class login{
    constructor(){
        //给登录按钮绑定点击事件
        this.$('#denglu').addEventListener('click',this.clickFn.bind(this));
    }
    //获取节点
    $(dom,a = true){
        return a?document.querySelector(dom):document.querySelectorAll(dom);
    }
    clickFn(){
        // console.log(location.search.split('=')[1])
        let inpts = this.$('.txt_kuang input',false);
        //判断 是否是空的
        // console.log(inpts)
        let username = inpts[0].value;
        let password = inpts[1].value;
        // console.log(username,password)
        if(!username.trim()||!password.trim()) throw new Error('is null');
        //用户名和密码 在users.json

        //登录发送 post请求
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//传输记得 格式【content-type】修改;还要对参数进行编码
        let data = `username=${username}&password=${password}`;
        axios.post('http://localhost:8888/users/login',data).then(res=>{
            // console.log(data);
            let {status,data}=res;
            if(status ==200){
                if(data.code==1){
                    // token 是登录 的 标识符
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_id', data.user.id);
                    //从哪里来 回那里去 【location.search】拿到地址
                    location.assign(location.search.split('=')[1]);
                    // location.assign('./list.html')
                }else if(data.code==0){
                    layer.open({
                        title:'登录超时',
                        content:'用户名或者密码错误'
                    })
                }

            }
            
        })
    } 
}
new login;