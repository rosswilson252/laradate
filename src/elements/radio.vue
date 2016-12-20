<template>

    <div class="form-check">
        <label class="form-check-label">
            <input type="radio"
                   :name="name"
                   class="form-check-input"
                   :class="{ 'form-control-danger' : hasError }"
                   v-model="model"
                   :value="value">
            {{ label }}
        </label>
    </div>

</template>

<script type="text/ecmascript-6">

    import mixin from '../mixin'

    export default {

        mixins: [mixin],

        props: {
            value: {
                required: true
            }
        }

    }
</script>