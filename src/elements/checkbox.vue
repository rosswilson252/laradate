<template>

    <label class="custom-control custom-checkbox">
        <input type="checkbox"
               :name="name"
               :class="{ 'form-control-danger' : hasError }"
               v-model="model">
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description" v-text="label"></span>
    </label>

</template>

<script type="text/ecmascript-6">

    import mixin from '../mixin'

    export default {
        mixins: [mixin]
    }
</script>