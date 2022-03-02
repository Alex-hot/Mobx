import {observable,isArrayLike,extendObservable} from 'mobx'

//通过observable将变量转换为可观察的对象
//mobx对任意变量对处理方式有两种：

// 1 :数组、对象以及es6中的map 
	//直接把observable作为函数来将变量转换为可观察对对象，之后对数组、以及map中的数据进行合理的操作。
//1.1 数组(array)

const arr = observable(['a','b','c'])
console.log(arr[0],arr.push('d'))
//如果直接用observable函数赶回的结果不是数组，而引入isArrayLike模块后，返回的就相当于数组
//可以用一些数组的方法，但注意不能通过数组越界的方式访问或改变数据数据，mobx不回监视越界的访问


//1.2 对象
const obj = observable({a:1,b:1})
console.log(obj.a,obj.b)
//mobx只能对已有的数据进行监视，如果要监视新增的属性，需要使用mobx的extendObservable()方法，因此最好在程序初始化时就说明所有程序会用的属性

//1.3 map

const map = observable(new Map())
map.set('a',1)
console.log(map.has('a'))
map.delete('a')
console.log(map.has('a'))
//和数组类型相似，返回的结果不是真正的map。但表现的足够接近map，可以调用一些map的方法

// 2 :其他类型
//　　一些原始类型数据，如String、Number、Boolean等，需要调用observable.box来将变量包装为可观察的对象，之后对该变量的直接赋值将会被监视。

const num = observable.box(20)
const str = observable.box('hello')
const bool = observable.box(true)
console.log(num.get(),str.get(),bool.get())
num.set(1)
str.set('hi')
bool.set(false)
//使用get方法得到原始类型的值，使用set方法修改原始类型的值

//3: 使用deacorators修饰器声明可观察的对象
//decorator只能修饰类或类的成员，因为此我们要创建一个类

class Store {
    @observable num = 20
	@observable str = 'hello'
	@observable bool = true
}
const store = new Store()

console.log(store.num)  //20
//这个时候不需要用.box来包装可观察的对象，访问直接使用 store.num等，内部方法可以使用this.num获取
