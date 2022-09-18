<template>
    <div class="mew-spinner">
        <svg fill viewBox="25 25 50 50"><circle cx="50" cy="50" r="1em" fill="none" :stroke="color"></circle></svg>
    </div>
</template>

<script>
export default {
    name: "mew-spinner",
    props:{
        color:{
            type: String,
            default: 'white'
        }
    }
}
</script>

<style lang="scss">
div.mew-spinner{
    display: block;
    position: absolute;
    pointer-events: none;
    animation: full-rotate 2s linear infinite;
    transition: opacity .1s ease;
    @keyframes full-rotate {
        0% {transform: rotate(0deg)}
        100% {transform: rotate(360deg)}
    }
    svg{
        display: block;
        transform: rotate(120deg);
        circle{
            //stroke: var(--CLR);
            stroke-width: 1.5;
            stroke-linecap: round;
            transition: stroke .2s linear;
            animation: circular 1.5s ease-in-out infinite;
            @keyframes circular {
                0% {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 90, 150;
                    stroke-dashoffset: -40;
                }
                100% {
                    stroke-dasharray: 90, 150;
                    stroke-dashoffset: -120;
                }
            }
        }
    }
}
</style>