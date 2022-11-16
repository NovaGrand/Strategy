<script>
export default {
    name: "toast-props",
    props:{
        color:{
            type: String,
            default: ''
        },
        title:{
            type: [String, Boolean],
            default: ''
        },
        close:{
            type: Boolean,
            default: true
        },
        delay:{
            type: Number,
            default: 4
        },
        stick:{
            type: Boolean,
            default: false
        },
        icon:{
            type: [String, Boolean],
            default:'state-hint-achieve'
        },
        text:{
            type: String,
            default: 'This is a message'
        },
        center:{
            type: Boolean,
            default: false
        },
        class:{
            type: String,
            default: ''
        },
        css:{
            type: String,
            default: ''
        },
    }
}
</script>
