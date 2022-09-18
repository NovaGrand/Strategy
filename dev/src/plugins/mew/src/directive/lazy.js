// 参数说明
// el：指令绑定到的元素。这可以用于直接操作 DOM。
// binding：一个对象，包含以下 property。
//      value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
//      oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
//      arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
//      modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
//      instance：使用该指令的组件实例。
//      dir：指令的定义对象。
// vnode：代表绑定元素的底层 VNode。
export default {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode) {
        if(el.src){
            if(!vnode.mew)
                vnode.mew = {}
            vnode.mew.lazy = true
            vnode.mew.src = el.src
            el.style.opacity = '0'
            el.src = ''
        }
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding, vnode) {
        if (vnode.mew.lazy && "IntersectionObserver" in window) {
            vnode.mew.observer = new IntersectionObserver(entries => {
                const image = entries[0]
                if (image.isIntersecting) {
                    el.src = vnode.mew.src
                    vnode.mew.observer.disconnect()
                    delete vnode.mew.observer
                    delete vnode.mew.lazy
                }
            }, {
                rootMargin: '0px',// 控制(屏幕)探测边界，值越大，图片进入越深入才可触发，可为负值
                threshold: 0.6    // 图片进入程度，0.6 是 60% 进入时就触发，最大值为 1
            })
            el.onload = function(){
                el.style.opacity = '1'
            }
            vnode.mew.observer.observe(el);
        }
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate() {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated() {},
    // 绑定元素的父组件卸载前调用
    beforeUnmount() {},
    // 绑定元素的父组件卸载后调用
    unmounted() {}
}