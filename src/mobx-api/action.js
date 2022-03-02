//computed  可以将多个可观察数据组合成一个新的可观察数据
import { observable,isArrayLike,computed,autorun,when,reaction } from 'mobx';
class Store {
  @observable count = 10;
  @observable price = 21;
}
const store = new Store();
const desc = computed(() => {
  return "个数：" + store.count + "个; 单价：" + store.price + "元/个";
});

console.log(desc.get()); // 个数：10个；单价：21元/个

store.count = 12;
// count发生变化： 个数:12个; 单价：21元/个

store.price = 15;
// price发生变化： 个数:12个; 单价：15元/个

//autorun可观察数据发生改变后，自动执行依赖可观察数据的行为，这个行为一般指的是传入autorun的函数
autorun(() => {
  console.log(store.count + "/" + store.price);
});
stroe.count = 10; // 10/15
store.price = 20; // 10/20

//when(提供执行逻辑条件，算是一种改进后的autorun)，接收两个参数：
//- 第一个函数：根据可观察数据返回一个布尔值，当布尔值为true时，执行第二个参数，且只执行一次

//第二个函数：如果可观察数据返回的布尔值一开始就是true，那么立即同步执行第二个函数
 
class Store1 {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();
 
    @observable string = 'Hello';
    @observable number = 20;
    @observable bool = false;
 
    @computed get mixed() {
        return this.string + '/' + this.number;
    }
}
 
var store = new Store1();
 
when(() => store.bool,() => {console.log("it's true");});
store.bool = true  // it's true



//reaction：autorun的变种，对于如何追踪observable赋予了更细粒度的控制，接收两个参数
//- 第一个函数：引用可观察数据，并返回一个值，这个值会作为第二个函数的参数。
//- 第二个函数：副作用函数，当调用时会接收两个参数，第一个参数是由data函数返回的值，第二个参数是当前的reaction，可以用来在执行期间清理reaction


class Store3 {
  @observable list = [
      {
          title:'redux',
          isFunPro:true
      },{
          title:'mobx',
          isFunPro:false
      }
  ];
@observable num = 0
}
const store = new Store3()

// 对title变化做出反应
const reaction1 = reaction(
() => store.list.map(item => item.title),
  titles => console.log('reaction1:',titles.join(','))
)

const autorun1 = autorun(() => {
  console.log('autorun1:',store.map(item => item.title).join(','))
})

store.list.push({title:'flux',isFunPro:true})

//输出
// reaction1:redux,mobx,flux
 //autorun1: redux,mobx,flux

const reaction2 = reaction(
() => store.count,
  (count,reaction) => {
      console.log('store.count:',count)
      reaction.dispose()
  }
)
store.count =1 

// store.count:1

store.count = 2

//无输出,第二个参数作为清理函数使用

console.log(store.count) //2