class Foo {
    name='haha'
    age=18

    sayHi() {
        console.log('helle',this.name)
    }

}
function foo(className) {
    return new Proxy(className,{
        construct(target, argArray, newTarget) {
            console.log('aaaaa')
            return new className(...argArray)
        }
    })
}
export default foo(Foo)