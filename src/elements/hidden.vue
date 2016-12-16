<template>

    <input type="hidden" :name="name" v-model="model">

</template>

<script>

    import mixin from '../mixin'

    export default {

        mixins: [mixin],

        props: {
            generalError: {
                type: Boolean,
                default: true
            }
        }

    }
</script>
