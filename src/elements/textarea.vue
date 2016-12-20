<template>

    <div class="form-group"
         :class="{ 'has-danger' : hasError }">

        <label v-if="showLabel" class="form-control-label">
            {{ label }}
            <span v-if="required" class="text-danger">*</span>
        </label>

        <textarea :type="type"
                  :name="name"
                  class="form-control"
                  :class="{ 'form-control-danger' : hasError }"
                  v-model="model"
                  :required="required"
                  :rows="rows"></textarea>

        <label v-if="hasError"
              v-text="error"
              class="form-control-label">
        </label>

    </div>

</template>

<script type="text/ecmascript-6">

    import mixin from '../mixin'

    export default {
        mixins: [mixin]
    }
</script>