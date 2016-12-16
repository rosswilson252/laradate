export default {

    props: {
        initialValue: {},
        name: {
            type: String,
        },
        label: {
            type: String,
        },
        placeholder: {
            type: String
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        generalError: {
            type: Boolean,
            default: false
        },
        required: {
            default: null
        },
        groupClass: {
            default: ''
        },
        inputClass: {
            default: ''
        },
    },

    data() {
        return {
            model: ''
        }
    },

    created() {

        let _ = this._resolveUtil();

        this.model = this.initialValue

        _.extend(this.$options, {laradation: {}})

        _.defineReactive(this.$options, 'laradation', {
            valid: true,
            indexes: {},
            value: this.model,
            initialValue: this.model,
            errors: [],
            generalError: this.generalError
        })

        this.$on('laradate-reset', () => this.model = this.$options.laradation.initialValue)
    },

    mounted() {

        //Find values that require an index
        let indexes = this.name.split('.*').map(v => v.replace('.', ''))
        indexes.pop()

        //find parent laradator
        let vm = this;

        while (vm) {

            if (vm.laraindex) {

                for (let key in indexes) {
                    let index = indexes[key]
                    if (typeof vm.laraindex[index] != 'undefined') {
                        this.$options.laradation.indexes[index] = vm.laraindex[index]
                        delete indexes[key]
                    }
                }
            }

            if (vm.$options.hasOwnProperty('laradator')) {

                vm._initLaradateInput(this)
                break;
            }
            vm = vm.$parent;
        }


        this.$watch('model', (value) => {
            this.$set(this.$options.laradation, 'errors', [])
            this.$set(this.$options.laradation, 'value', value)
        })
    },

    computed: {
        hasError() {
            return typeof this.error == 'string'
        },
        error() {

            if (this.$options.laradation.errors.length) {
                return this.$options.laradation.errors[0]
            }

        },
        formGroupClass() {


            let groupClass = this.groupClass

            let obj = {
                'has-danger': this.hasError,
            }

            if (Array.isArray(groupClass)) {
                groupClass.push(obj)
                return groupClass
            }

            return [groupClass, obj]
        },
        formInputClass() {

            let inputClass = this.inputClass

            let obj = {
                'form-control-danger': this.hasError,
            }

            if (Array.isArray(inputClass)) {
                inputClass.push(obj)
                return inputClass
            }

            return [inputClass, obj]
        }
    },

    beforeDestroy() {
        //find parent laradator
        let vm = this;

        while (vm) {

            if (vm.$options.hasOwnProperty('laradator')) {

                vm._removeLaradateInput(this)
                break;
            }
            vm = vm.$parent;
        }
    }
}