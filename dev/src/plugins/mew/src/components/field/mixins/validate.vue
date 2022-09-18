<script>
export default {
    name: "mew-validate",
    props:{
        disabled:{
            type: Boolean,
            default: false
        },
        invalid:{
            type: Boolean,
            default: false
        },
        require:{
            type: Boolean,
            default: false
        },
        username:{
            type: Boolean,
            default: false
        },
        email:{
            type: Boolean,
            default: false
        },
        min:{
            type: [String, Number],
            default: ''
        },
        max:{
            type: [String, Number],
            default: ''
        },
        validate:{
            type: Function,
            default: null
        }
    },
    mounted(){

    },
}
</script>
