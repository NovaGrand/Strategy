<script>
export default {
    name: "mew-vid-codec",
    mounted(){
        if(!window.HlsLoaded){
            let script = document.createElement("script")
                script.type = "text/javascript"
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.2.3/hls.min.js"
            document.body.appendChild(script)
            script.onload = () => {
                window.HlsLoaded = true
                this.init().load(this.src)
            }
        }
        else
            this.init().load(this.src)

    },
    beforeUnmount(){
        this.wipe()
    },
    data(){
        return {
            codec: null,
        }
    },
    props:{
        // 当非m3u8视频时，默认通过 fetch -> blob 的路径获取资源，如果 raw 为真，则会直接将资源地址赋值给视频标签
        raw:{
            type: Boolean,
            default: false
        },
        src:{
            type: String,
            default: "",
        }
    },
    watch:{
        src(val){
            this.wipe()
            this.init().load(val)
        }
    },
    methods:{
        init(){
            this.codec = this.src.includes('.m3u8') ? new Hls() : null
            return {
                load: this.load
            }
        },
        load(src){
            if(this.codec)
                this.bind(src)
            else if(!this.raw && !this.$global.mobile)
                this.blob(src)
            else
                this.$el.getElementsByTagName('video')[0].src = src
        },
        blob(src){
            fetch(src).then(res => res.blob()).then(res => {
                this.$el.getElementsByTagName('video')[0].src = URL.createObjectURL(res)
            })
        },
        bind(src){
            this.codec.attachMedia(this.$el.getElementsByTagName('video')[0])
            this.codec.on(Hls.Events.MEDIA_ATTACHED,  () => {
                this.codec.loadSource(src)
            })
            // 错误处理
            this.codec.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    alert('Video is not available now! We are testing and fixing this kind of problem, we are very sorry about this!')
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log('Hls.ErrorTypes.NETWORK_ERROR')
                            this.codec.startLoad()
                            break
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            this.codec.recoverMediaError()
                            break
                        default:
                            this.codec.destroy()
                            break
                    }
                }
            })
        },
        wipe(){
            URL.revokeObjectURL(this.$el.src)
            if(this.codec) this.codec.destroy()
        },
    }
}
</script>
