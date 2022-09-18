<template>
    <div class="mew-vid-setting" :class="{ mobile: $global.mobile }" jc ac>
        <i class="icon" title="Settings">

            <svg width="38" height="40" viewBox="0 0 38 40" fill="none" @click="toggle" @mouseenter="flag = true" @mouseleave="flag = false">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M33.4 20C33.4 20.66 33.36 21.28 33.28 21.88L37.3 25.04C37.68 25.32 37.78 25.82 37.54 26.26L33.7 32.9C33.46 33.34 32.96 33.5 32.52 33.34L27.74 31.42C26.76 32.18 25.68 32.82 24.5 33.3L23.78 38.38C23.72 38.86 23.32 39.2 22.84 39.2H15.16C14.68 39.2 14.3 38.86 14.2 38.38L13.48 33.3C12.3 32.82 11.24 32.18 10.24 31.42L5.46 33.34C5.02 33.48 4.52 33.34 4.28 32.9L0.44 26.26C0.22 25.86 0.32 25.32 0.68 25.04L4.74 21.88C4.64 21.28 4.6 20.62 4.6 20C4.6 19.38 4.68 18.72 4.78 18.12L0.72 14.96C0.32 14.68 0.24 14.16 0.48 13.74L4.3 7.1C4.54 6.66 5.04 6.5 5.48 6.66L10.26 8.58C11.24 7.84 12.32 7.18 13.5 6.7L14.22 1.62C14.3 1.14 14.68 0.8 15.16 0.8H22.84C23.32 0.8 23.72 1.14 23.8 1.62L24.52 6.7C25.7 7.18 26.76 7.82 27.76 8.58L32.54 6.66C32.98 6.52 33.48 6.66 33.72 7.1L37.56 13.74C37.78 14.14 37.68 14.68 37.32 14.96L33.26 18.12C33.36 18.72 33.4 19.36 33.4 20ZM19 26.0599C22.3468 26.0599 25.0599 23.3468 25.0599 20C25.0599 16.6532 22.3468 13.9401 19 13.9401C15.6532 13.9401 12.9401 16.6532 12.9401 20C12.9401 23.3468 15.6532 26.0599 19 26.0599Z"/>
            </svg>

            <ul v-show="valid" ref="option" tabindex="0" @blur="blur(flag)" >
                <li class="replay" :class="{ green: v.loop }" jsb ac @click="v.loop = !v.loop">
                    <i class="name">Replay</i>
                    <ico class="switch" dense>{{ v.loop ? 'setting-switch-right' : 'setting-switch-left' }}</ico>
                </li>
                <li class="info" ac jc v-if="v.info">
                    <i>
                        {{ v.info }}
                    </i>
                </li>
            </ul>
        </i>
    </div>
</template>

<script>
export default {
    name: "mew-vid-setting",
    inject: ['v'],
    mounted(){
        this.v.loop = localStorage.getItem('mew-vid-replay') !== 'false'
    },
    data(){
        return {
            valid: false,
            flag: false
        }
    },
    methods:{
        toggle(){
            this.valid = !this.valid
        },
        blur(flag){
            this.valid = flag
        }
    },
    watch:{
        valid(val){
            if(val)
                this.$nextTick(()=>{
                    this.$refs.option.focus()
                })
        },
        'v.loop':function(val){
            localStorage.setItem('mew-vid-replay',val)
        }
    }
}
</script>

<style lang="scss">
div.mew-vid-setting{
    width: 56px;height: 24px;padding-right: 2px;
    &.mobile{
        width: 46px;
        padding: 0 0 0 6px;
    }
    i.icon{
        position: relative;
        cursor: pointer;
        width: 19px;height: 19px;
        &::before{
            position: absolute;left: 5px;top: 5px;
            width: 11px;height: 11px;
            border-radius: 10px;
            box-shadow: 0 0 5px black;
            content: '';
            transition: opacity .1s linear;
        }
        svg{
            opacity: .8;
            transition: opacity .1s linear, transform .3s cubic-bezier(0.84, -1.13, 0.16, 2);
            path{
                fill: white;
            }
        }
        ul{
            cursor: default;
            position: absolute;z-index: 1;
            bottom: calc(-100% + 56px);left: -50px;
            outline: none;
            li{
                list-style: none;
                width: 120px;
                height: 38px;
                background-color:rgba(0,0,0,.5);
                backdrop-filter: blur(10px);
                color: rgba(255,255,255,.7);
                &:hover{
                    background-color:rgba(0,0,0,.2);
                }
                &:last-child{
                    border-radius: 0 0 3px 3px;
                }
                &.green{
                    color: #00ff21;
                }
                &.replay{
                    padding: 0 12px;
                    cursor: pointer;
                    border-radius: 3px 3px 0 0;
                    i.name{
                        color: white;
                        font-size: 13px;
                    }
                    i.switch{
                        font-size: 25px;
                        margin-top: 5px;
                    }
                }
                &.info{
                    font-size: 12px;
                    color: rgba(255,255,255,.6);
                    &:hover{
                        background-color: rgba(0,0,0,.3);
                    }
                    i{
                        transform: scale(.8);
                    }
                }
            }
        }
        &:hover{
            &::before{
                box-shadow: 0 0 8px black;
            }
            svg{
                opacity: 1;
               transform: rotate(30deg);
            }


        }
    }
}
</style>