<template>

    <div class="form-group" :class="formGroupClass">

        <label v-if="showLabel" class="form-control-label">
            {{ label }}
            <span v-if="required" class="text-danger">*</span>
        </label>

        <div class="{'input-group': hasInputGroup}">

            <div v-if="hasInputGroupBefore" class="input-group-addon" v-text="inputGroupBefore"></div>

            <input v-if="type == 'text'"
                   type="text"
                   class="form-control"
                   :name="name"
                   :class="formInputClass"
                   v-model="model"
                   :required="required"
                   :placeholder="placeholder">

            <input v-if="type == 'password'"
                   type="password"
                   class="form-control"
                   :name="name"
                   :class="formInputClass"
                   v-model="model"
                   :required="required"
                   :placeholder="placeholder">

            <input v-if="type == 'email'"
                   type="email"
                   class="form-control"
                   :name="name"
                   :class="formInputClass"
                   v-model="model"
                   :required="required"
                   :placeholder="placeholder">

            <input v-if="type == 'range'"
                   type="range"
                   class="form-control"
                   :name="name"
                   :class="formInputClass"
                   v-model="model"
                   :required="required"
                   :min="min"
                   :max="max"
                   :step="step">

            <input v-if="type == 'number'"
                   type="number"
                   class="form-control"
                   :name="name"
                   :class="formInputClass"
                   v-model="model"
                   :required="required"
                   :min="min"
                   :max="max"
                   :step="step">

            <div v-if="hasInputGroupAfter" class="input-group-addon" v-text="inputGroupAfter"></div>

        </div>

        <label v-if="hasError" v-text="error" class="form-control-label"></label>
    </div>

</template>

<script type="text/ecmascript-6">

    import mixin from '../mixin'

    export default {

        mixins: [mixin],

        props: {
            type: {
                type: String,
                default: 'text'
            },
            inputGroupBefore: {
                type: String,
                default: ''
            },
            inputGroupAfter: {
                type: String,
                default: ''
            },
            min: {
                default: null
            },
            max: {
                default: null
            },
        },

        computed: {
            hasInputGroup() {
                return this.hasInputGroupBefore || this.hasInputGroupAfter
            },
            hasInputGroupBefore() {
                return this.inputGroupBefore.trim() !== ''
            },
            hasInputGroupAfter() {
                return this.inputGroupAfter.trim() !== ''
            }
        }
    }
</script>
