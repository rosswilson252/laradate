export default function (Vue) {

    const _ = Vue.util

    Vue.mixin({

            props: {
                laraindex: {}
            },


            created() {

                if (this.$options.laradator) {
                    var copy = Object.assign({}, this.$options.laradator);

                    copy.inputs = {}
                    copy.inputErrors = {}
                    copy.generalErrors = []

                    _.defineReactive(this.$options, 'laradator', copy)

                }
            },

            methods: {

                _resolveUtil() {

                    return _;
                },

                _initLaradateInput(scope) {

                    if (this.$options.laradator) {

                        if (!this.$options.laradator.inputs.hasOwnProperty(scope.name)) {
                            this.$options.laradator.inputs[scope.name] = [];
                        }

                        Vue.set(this.$options.laradator.inputs[scope.name],
                            this.$options.laradator.inputs[scope.name].length,
                            scope.$options.laradation)

                        this.$watch(() => scope.$options.laradation.value, () => Vue.set(this.$options.laradator, 'generalErrors', []))
                    }
                },

                _removeLaradateInput(scope) {
                    if (this.$options.laradator) {

                        if (!this.$options.laradator.inputs.hasOwnProperty(scope.name)) return

                        delete this.$options.laradator.inputs[scope.name]
                    }
                },

                $submit(e) {

                    !e || e.preventDefault()

                    this.initInputErrors();

                    let method = (this.$options.laradator.method)

                    method = (typeof method == 'function')
                        ? method.call(this).toLowerCase()
                        : method.toLowerCase();


                    let action = this.$options.laradator.action;

                    if (typeof action == 'function') {
                        action = action.call(this)
                    }

                    let data = this.getRequestData();

                    this.$http[method](action, data)
                        .then(this.$options.laradator.success)
                        .catch(this.onError)
                },

                getRequestData() {

                    var $return = {};

                    let inputs = this.$options.laradator.inputs
                    for (let name in inputs) {
                        let input = inputs[name]

                        let indexNames = name.split('.*').map(v => {
                            return (v.indexOf('.') === 0) ? v.substr(1) : v
                        })

                        let finalName = indexNames.pop()

                        input.forEach(v => {

                            let obj = indexNames.reduce((a, b, i) => {

                                a[b] = Array.isArray(a[b]) ? a[b] : []

                                if (typeof a[b][v.indexes[b]] == 'undefined') {
                                    Vue.set(a[b], v.indexes[b],
                                        (finalName.trim() == '' && i == indexNames.length - 1)
                                            ? v.value
                                            : {})
                                }

                                return a[b][v.indexes[b]]

                            }, $return)

                            if (finalName.trim() != '') {

                                obj[finalName] = v.value
                            }
                        })
                    }

                    for (var key in $return) {

                        let fragments = key.split('.')

                        if (fragments.length > 1) {

                            fragments.reduce((a, b, i) => {

                                if ((fragments.length - 1) == i) {
                                    a[b] = $return[key]

                                } else if (!a.hasOwnProperty(b)) {
                                    a[b] = {}
                                }

                                return a[b]
                            }, $return)

                            delete $return[key]
                        }
                    }

                    return $return;
                },

                initInputErrors() {
                    this.$options.laradator.inputErrors = {}

                    let inputs = this.$options.laradator.inputs

                    for (let name in inputs) {

                        let input = inputs[name]

                        let indexNames = name.split('.*')
                        let finalName = indexNames.pop()

                        input.forEach(v => {

                            //Check to see if errors should be output to general errors 
                            if (!v.generalError) {

                                let key = indexNames.length
                                    ? indexNames.reduce((a, b) => a + b + '.' + v.indexes[b.replace('.', '')], '') + finalName
                                    : finalName

                                Vue.set(this.$options.laradator.inputErrors, key, v.errors);
                            }
                        })
                    }
                },

                onError(response) {
                    switch (response.status) {
                        case 422:

                            for (let key in response.data) {

                                let messages = response.data[key]


                                if (this.$options.laradator.inputErrors.hasOwnProperty(key)) {


                                    for (let i in messages) {
                                        this.$options.laradator.inputErrors[key].push(messages[i])
                                    }
                                    // Vue.set(this.$options.laradator.inputErrors[key], 0, messages)
                                } else {
                                    messages.forEach((error) => this.$options.laradator.generalErrors.push(error))
                                }
                            }
                            break;
                    }

                    if (typeof this.$options.laradator.error === 'function') {
                        this.$options.laradator.error.call(this, response)
                    }
                }
            },
        }
    )
}
