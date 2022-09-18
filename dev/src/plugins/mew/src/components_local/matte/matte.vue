<template>
    <teleport v-if="loading.target" :to="loading.target">
        <transition name="fade">
            <div class="mew-matte" v-if="loading.valid">
                <div class="mew-matte-loading"
                     :class="{ nudge: loading.target === body, steady: loading.next }"
                     :style="'--CLR:' + loading.color + ';--SCL:' + loading.size"
                     @click="next('loading')"
                >
                    <div class="partten" :class="{ border: loading.image, foo: tink_loading === 1, bar: tink_loading === 2 }">
                        <i v-if="(loading.next && loading.icon) || !loading.icon && !loading.image" class="text">
                            <ico class="inlineIco" dense v-if="loading.next && loading.icon">{{ loading.icon }}</ico> {{ loading.text }}
                        </i>
                        <img v-else-if="loading.image" :src="loading.image">
                        <ico v-else dense style="font-size: 58px;">{{ loading.icon }}</ico>
                    </div>
                    <spinner :color="loading.color" style="width: 164px;height: 164px"/>
                </div>
            </div>
        </transition>
    </teleport>

    <teleport v-if="pending.target" :to="pending.target">
        <transition name="fade">
            <div class="mew-matte" v-if="pending.valid" @click="next('pending')">
                <div class="mew-matte-pending"
                     :class="{ nudge: pending.target === body }"
                     :style="'--CLR:' + pending.color + ';--SCL:' + pending.size"
                >
                    <div class="mew-matte-pending-box" v-if="!pending.next" column ac>
                        <div class="partten" :class="{ border: pending.image, foo: tink_pending === 1, bar: tink_pending === 2 }">
                            <i v-if="!pending.icon && !pending.image" class="text">{{ pending.text }}</i>
                            <img v-else-if="pending.image" :src="pending.image">
                            <ico v-else dense style="font-size: 58px;">{{ pending.icon }}</ico>
                        </div>
                        <div class="ellipsis"><i></i><i></i><i></i><i></i></div>
                    </div>
                    <div class="mew-matte-pending-next" v-else>
                        <img v-if="pending.image" :src="pending.image">
                        <ico class="icon" dense v-else-if="pending.icon" style="font-size: 58px;">{{ pending.icon }}</ico>
                        <i class="steady">{{ pending.text }}</i>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { loading, pending } from '../../../mew'
import spinner from '../utils/spinner'
import ico from '../../components/ico'
export default {
    name: "mew-matte",
    mounted(){
        if(!this.loading.target)
            this.loading.target = this.body
        if(!this.pending.target)
            this.pending.target = this.body
    },
    components:{
        ico, spinner
    },
    data(){
        return {
            loading, pending,
            body: document.body,
            tink_loading: 0,
            tink_pending: 0
        }
    },
    computed:{
        stat_loading(){
            let l = this.loading
            return l.image + l.text + l.icon
        },
        stat_pending(){
            let p = this.pending
            return p.image + p.text + p.icon
        },
    },
    watch:{
        stat_loading(){
            this.tink_loading = this.tink_loading === 1 ? 2 : 1
        },
        stat_pending(){
            this.tink_pending = this.tink_pending === 1 ? 2 : 1
        },
        'loading.config':function(val){
            this.reset('loading')
        },
        'pending.config':function(val){
            this.reset('pending')
        },
        'loading.valid':function(val){
            if(!val) this.reset('loading')
        },
        'pending.valid':function(val){
            if(!val) this.reset('pending')
        },
    },
    methods:{
        next(name){
            if(this[name].next)
                this[name].next()
        },
        reset(name){
            let cfg = this[name].config ? this[name].config : { color:'white', image:'', text:'Pending', icon:'', size:1,  next: null, target: null }
            for(let key in cfg)
                this[name][key] = cfg[key]
        }
    },
}
</script>

<style lang="scss">
div.mew-matte{
    position: fixed;top: 0;left: 0;z-index: 9999;
    width: 100%;height: 100%;
    background-color: rgba(0,0,0,.74);
    user-select: none;
    display: flex;justify-content: center;align-items: center;
    .partten{
        @keyframes foo {
            0%{transform: scale(1.1)}
            100%{transform: scale(1)}
        }
        @keyframes bar {
            0%{transform: scale(1.1)}
            100%{transform: scale(1)}
        }
        &.foo{
            //animation: foo .4s cubic-bezier(0.84, -1.13, 0.16, 2);
            animation: foo .2s ease;
        }
        &.bar{
            animation: bar .2s ease;
        }
    }
    @keyframes flash {
        0% { opacity: .5 }
        50% { opacity: 1 }
        100% { opacity: .5 }
    }
    img{
        position: relative;z-index: 1;
        object-fit: cover;
        width: 100%;height: 100%;
        transition: all 1s;
    }
    div.mew-matte-loading{
        width: 150px;height: 150px;
        display: flex;justify-content: center;align-items: center;
        transform: translateY(0) scale(var(--SCL));
        transition: transform .1s ease;
        position: relative;
        &::before{
            content: '';
            width: 90px;height: 90px;line-height: 1.2;border-radius: 200px;
            background-color: rgba(255,255,255,.03);
            box-shadow: 0 0 0 10px rgba(0,0,0,.06), 0 0 20px rgba(0,0,0,.1);
        }
        &.nudge{
            transform: translateY(-6.4vh) scale(var(--SCL));
        }
        &.steady{
            width: auto;height: auto;
            div.partten{
                border-radius: 5px;
                border: .5px solid var(--CLR);
                width: auto;height: auto;
                padding: 12px 30px 10px 33px;
                display: flex;align-items: center;
                transition: all 400ms cubic-bezier(0.84, -1.13, 0.16, 2);
                &:hover{
                    cursor: pointer;
                    transform: scale(1.02);
                }
                i.inlineIco{
                    font-size: 1.2em;
                    margin-left: -.4em;
                    transform: translateY(0px);
                }
                i.text{
                    animation: none;
                }
            }
            div.mew-spinner{
                opacity: 0;
            }
        }
        div.partten{
            position: relative;
            display: flex;align-items: center;justify-content: center;
            font-size: 15px;text-align: center;
            width: 90px;height: 90px;line-height: 1.2;border-radius: 200px;
            overflow: hidden;
            &.tik{
                transition: transform .1s ease;
                transform: scale(1.1);
            }
            &.border{
                border: 1px solid rgba(0,0,0,.3);
            }
            i{
                color: var(--CLR);
                padding: 0 0 1px 2px;
                transition: color .3s linear;
                &.text{
                    letter-spacing: .7px;
                    font-size: 16px;
                    animation: flash 1.5s linear infinite;
                }
            }

        }
    }
    div.mew-matte-pending{
        display: flex;justify-content: center;align-items: center;flex-direction: column;
        transform: translateY(0) scale(var(--SCL));
        transition: transform .1s ease;
        &.nudge{
            transform: translateY(-7vh) scale(var(--SCL));
        }
        div.mew-matte-pending-box{
            position: relative;
            background-color: rgba(0,0,0,.2);
            padding: 24px 70px;
            border-radius: 10px;
            &.steady{
                &::after{
                    position: absolute;content:'Click to continue';
                    display: inline-block;width: 200px;height: 50px;
                    background-color: red;
                    bottom:-50px;left: 0;
                    color: var(--CLR);
                }
            }
            div.partten{
                position: relative;
                display: flex;align-items: center;justify-content: center;
                font-size: 15px;text-align: center;
                border-radius: 12px;
                line-height: 1.2;
                &.tik{
                    transition: transform .1s ease;
                    transform: scale(1.1);
                }
                &.border{
                    border: 1px solid rgba(0,0,0,.3);
                }
                i{
                    color: var(--CLR);
                    padding: 0 0 1px 2px;
                    transition: color .3s linear;
                    &.text{
                        white-space: nowrap;
                        letter-spacing: .7px;
                        font-size: 18px;
                        margin-bottom: 15px;
                    }
                }
            }
        }
        div.mew-matte-pending-next{
            color: var(--CLR);
            display: flex;flex-direction: column;align-items: center;justify-content: center;
            border-radius: 1000px;
            min-width: 150px;min-height: 150px;
            padding: 14px;
            border: 2px solid var(--CLR);
            font-size: 18px;
            animation: flash 1.5s linear infinite;
            img{
                width: 70px;height: 70px;
                border-radius: 10px;
            }
            i.icon{
                font-size: 60px!important;
                margin-bottom: -17px;
            }
            i.steady{
                margin: 6px 25px;
            }
        }

        div.ellipsis {
            display: inline-block;
            position: relative;
            width: 76px;
            height: 10px;
            i{
                position: absolute;
                top: 0;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--CLR);
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
                &:nth-child(1){
                    left: 8px;
                    animation: ellipsis1 0.6s infinite;
                }
                &:nth-child(2){
                    left: 8px;
                    animation: ellipsis2 0.6s infinite;
                }
                &:nth-child(3){
                    left: 32px;
                    animation: ellipsis2 0.6s infinite;
                }
                &:nth-child(4){
                    left: 56px;
                    animation: ellipsis3 0.6s infinite;
                }
            }
        }
        @keyframes ellipsis1 {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
        @keyframes ellipsis3 {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(0);
            }
        }
        @keyframes ellipsis2 {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(24px, 0);
            }
        }
    }

}
</style>