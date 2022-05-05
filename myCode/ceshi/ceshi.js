// const axios = require('axios');
class List {

    constructor(){
        this.getDate()
    }
    async getDate(){
        let res = await axios.get('http://localhost:8888/goods/list?current=1');
        console.log(res);
    }
}
new List;