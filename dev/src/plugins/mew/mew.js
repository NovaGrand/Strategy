import { reactive } from "vue"

export let global = reactive({
    mobile: false,
})
{
    window.addEventListener('load',()=>{
        // 检查当前设备，包括平板，通过 window.isMobile 获取设备检测结果
        (function(a){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
                global.mobile = true;
            }
        })(navigator.userAgent||navigator.vendor||window.opera);
        setBody(global.mobile)
    })
    window.addEventListener('resize',debounce(()=>{
        global.mobile = document.body.offsetWidth < 1250
        setBody(global.mobile)
    },50))
    function setBody(val){
        if(val){
            console.log(0)
            let m = document.createAttribute("mobile")
            document.body.setAttributeNode(m)
        }
        else{
            document.body.removeAttribute('mobile')
        }
    }
    function debounce (fn, delay) {
        let timer = null
        return function () {
            let arg = arguments

            clearTimeout(timer)

            timer = setTimeout(() => {
                fn.apply(this, arg)
            }, delay)
        }
    }
}

// field 组件的共用数据
export let selecting = reactive({
    keepFocus: false,
    wrapper: null,
    target: null,
})

export let loading = reactive({
    valid: false,
    color:'white',
    image: '',
    text: 'Loading',
    icon: '',
    size: 1,
    next: null,
    target: null,
    config: null,
})

export let pending = reactive({
    valid: false,
    color:'white',
    image:'',
    text: 'Pending',
    icon: '',
    size: 1,
    next: null,
    target: null,
    config: null,
})
export let color = reactive({
    theme:'light'
})
// ------------- notify -------------
export let notes = reactive([])
export let notify = function(config){
    let obj = { id : Symbol() }
    let cfg = config instanceof Object ? config : { text: config.toString() }
    for(let key in cfg)
        obj[key] = cfg[key]
    if(!cfg.text)
        cfg.text = 'No text !'
    if(!cfg.style)
        cfg.style = ''
    notes.push(obj)
    if(notes.length > 8) notes.shift()
}
{
    notify.__proto__.flag = false
    notify.__proto__.clear = function(config){
        if(!this.flag){
            this.flag = true
            if(notes.length > 0)
                notes.shift()
            let t = setInterval(()=>{
                if(notes.length === 0){
                    this.flag = false
                    clearInterval(t)
                }
                else
                    notes.shift()
            },200)
        }
    }
    notify.__proto__.message = function(config){
        let cfg = {
            color:'blue',
            title:'消息',
            text:'这是一个消息提示！',
            icon:'state-hint-caution'
        }
        if(config instanceof Object){
            for(let key in config)
                cfg[key] = config[key]
        }
        else if(config)
            cfg.text = config
        notify(cfg)
    }
    notify.__proto__.success = function(config){
        let cfg = {
            color:'green',
            title:'成功',
            text:'这是一个成功提示！',
            icon:'state-hint-achieve'
        }
        if(config instanceof Object){
            for(let key in config)
                cfg[key] = config[key]
        }
        else if(config)
            cfg.text = config
        notify(cfg)
    }
    notify.__proto__.caution = function(config){
        let cfg = {
            color:'yellow',
            title:'注意',
            text:'这是一个注意提示！',
            icon:'state-hint-warning',
        }
        if(config instanceof Object){
            for(let key in config)
                cfg[key] = config[key]
        }
        else if(config)
            cfg.text = config
        notify(cfg)
    }
    notify.__proto__.failure = function(config){
        let cfg = {
            color:'red',
            title:'错误',
            text:'这是一个错误提示！',
            icon:'state-hint-bad',
        }
        if(config instanceof Object){
            for(let key in config)
                cfg[key] = config[key]
        }
        else if(config)
            cfg.text = config
        notify(cfg)
    }
}

// ------------- notify -------------

