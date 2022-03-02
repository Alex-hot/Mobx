//修改可观测数据
//mobx提出了action的概念，可以将多次对状态数据的赋值合并为一次，从而减少触发autorun或reaction的次数。
import { observable,isArrayLike,computed,autorun,when,reaction,action,runInAction } from 'mobx';
 
class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();
 
    @observable string = 'Hello';
    @observable number = 20;
    @observable bool = false;
 
    @computed get mixed() {
        return store.string + '/' + store.number;
    }
    @action.bound bar1(){
        this.string = 'world';
        this.number = 30;
    }
    @action bar(){
        this.string = 'world';
        this.number = 30;
    }
}
 
var store = new Store();
 
reaction(() => [store.string,store.number],arr => console.log(arr.join('/')));
 
store.bar();   //只运行一次  world/30



//action.bound 相比与action多了把被修饰的方法的上下文强制绑定到该对象上。
var bar = store.bar1;
bar();


//runInAction 允许随时定义匿名的action方法，并运行它

runInAction(() => {
    store.string = 'world';
    store.number = 30;
})
//对于有多处重复调用的状态修改逻辑，建议用action来实现复用，否则用runInAction即可