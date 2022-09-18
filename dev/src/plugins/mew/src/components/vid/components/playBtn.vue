<template>
    <div class="mew-vid-playBtn" ac jc>
        <i @click="v.playing = !v.playing" :title="v.playing ? 'Pause (space)' : 'Play (space)'">
            <transition name="tikLeft">
                <svg v-if="!v.playing" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M11.446 10.302C11.446 7.10226 15.0164 5.1977 17.6739 6.97978L38.1548 20.7141C40.5203 22.3004 40.5171 25.7807 38.1485 27.3626L17.6676 41.0413C15.0096 42.8165 11.446 40.9112 11.446 37.7149V10.302Z" fill="white"/>
                </svg>
                <svg v-else width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M11.9189 8.96134C11.9189 7.30449 13.2621 5.96134 14.9189 5.96134H17.7406C19.3975 5.96134 20.7406 7.30448 20.7406 8.96134V39.0387C20.7406 40.6955 19.3975 42.0387 17.7406 42.0387H14.9189C13.2621 42.0387 11.9189 40.6955 11.9189 39.0387V8.96134Z" fill="white"/>
                    <path d="M27.2594 8.96134C27.2594 7.30449 28.6025 5.96133 30.2594 5.96133H33.0811C34.7379 5.96133 36.0811 7.30448 36.0811 8.96133V39.0387C36.0811 40.6955 34.7379 42.0387 33.0811 42.0387H30.2594C28.6025 42.0387 27.2594 40.6955 27.2594 39.0387V8.96134Z" fill="white"/>
                </svg>
            </transition>
        </i>

    </div>
</template>

<script>
export default {
    name: "playBtn",
    inject: ['v'],
    watch:{
        'v.playing':function(val){
            this.v.el[val ? 'play' : 'pause']()
        }
    }
}
</script>

<style lang="scss">
div.mew-vid-playBtn{
    .tikLeft-move {
        transition: all 0.3s ease;
    }
    .tikLeft-enter-active,
    .tikLeft-leave-active {
        transition: all 0.3s cubic-bezier(0.84, -1.13, 0.16, 1.5);
    }
    .tikLeft-enter-from,
    .tikLeft-leave-to {
        opacity: 0;
        transform: translateX(-4px);
    }
    .tikLeft-leave-active {
        position: absolute;
    }
    flex-grow: 0;
    width: 42px;height: 42px;
    i{
        cursor: pointer;
        width: 25px;height: 25px;
        transition: transform .1s linear;
        &:hover{
            transform: scale(1.1);
        }
    }
}

</style>