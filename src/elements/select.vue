<template>

    <div class="form-group" :class="{ 'has-danger' : hasError }">

        <label v-if="showLabel" class="form-control-label">
            {{ label }}
            <span v-if="required" class="text-danger">*</span>
        </label>

        <select v-if="unescaped"
                :name="name"
                class="form-control"
                :class="inputClass"
                v-model="model"
                :required="required"
                :multiple="multiple">


            <option v-for="(value,key) in selectOptions"
                    :value="key"
                    :disabled="key == placeholderLabel"
                    v-html="value">
            </option>

        </select>

        <select v-if="!unescaped"
                :name="name"
                class="form-control"
                :class="inputClass"
                v-model="model"
                :required="required">

            <option v-for="(value, key) in selectOptions"
                    :value="key"
                    :disabled="key == placeholderLabel"
                    v-text="value">
            </option>

        </select>

        <label v-if="hasError"
               v-text="error"
               class="form-control-label">
        </label>

    </div>

</template>

<script type="text/ecmascript-6">

    import mixin from '../mixin'

    export default {

        mixins: [mixin],

        props: {
            options: {},
            multiple: {
                type: Boolean,
                default: false
            },
            showLabel: {
                type: Boolean,
                default: true
            },
            unescaped: {
                default: false
            }
        },

        data() {
            return {
                placeholderLabel: '_LaradateSelectPlaceHolder'
            }
        },

        created() {
        },

        computed: {

            displayPlaceholder() {

                let model = this.model

                return (typeof model == 'undefined' || model == null || model.toString().trim() === '' || model == this.placeholderLabel)
                        && typeof this.placeholder == 'string'
                        && this.placeholder.trim() != ''

            },
            selectOptions() {

                if (this.displayPlaceholder) {

                    let $return = {}

                    $return[this.placeholderLabel] = this.placeholder

                    Object.assign($return, this.options)

                    this.model = this.placeholderLabel

                    return $return
                }

                return this.options

            }
        }
    }
</script>