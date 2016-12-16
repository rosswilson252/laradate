<template>
    <div v-if="errors.length" class="alert alert-danger">
        <ul class="list-unstyled m-b-0">
            <li v-for="error in errors" v-text="error"></li>
        </ul>
    </div>
</template>


<script type="text/ecmascript-6">

    export default {

        data() {
            return {
                errors: []
            }
        },

        compiled() {
            //find parent laradator
            let vm = this;

            while (vm) {

                if (vm.$options.hasOwnProperty('laradator')) {

                    this.$watch(() => vm.$options.laradator.generalErrors, errors =>this.$set('errors', errors))

                    break;
                }
                vm = vm.$parent;
            }
        }
    }

</script>