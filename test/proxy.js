let obj ={
    age:18,
    name:'XIXi'
}

const proxyObj=new Proxy(obj,{
    get(target, property, receiver) {
        // console.log(target, property, receiver)
        return target[property]
    },
})
console.log(proxyObj.age);
console.log(proxyObj.color);


