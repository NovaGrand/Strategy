<script>
export default {
    name: "mew-field-types",
    props: {
        password: {
            type: Boolean,
            default: false
        },
        number: {
            type: Boolean,
            default: false
        },
        date: {
            type: Boolean,
            default: false
        },
        time: {
            type: Boolean,
            default: false
        },
        file: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        type(){
            let o = {
                password: this.password,
                number: this.number,
                date: this.date,
                time: this.time,
                file: this.file,
            }
            for(let k in o)
                if(o[k])
                    return k
        }
    }
}
</script>
