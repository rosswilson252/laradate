import Laradator from "./laradator";
import mixin from "./mixin";
import inputComponent from "./elements/input.vue";
import hiddenComponent from "./elements/hidden.vue";
import selectComponent from "./elements/select.vue";
import radioComponent from "./elements/radio.vue";
import checkboxComponent from "./elements/checkbox.vue";
import textareaComponent from "./elements/textarea.vue";
import generalErrorsComponent from "./elements/general-errors.vue";

/**
 *
 *
 * plugin
 *
 * @param {Function} Vue
 * @param {Object} options
 */

const elements = {

        'input': inputComponent,
        'hidden': hiddenComponent,
        'select': selectComponent,
        'radio': radioComponent,
        'checkbox': checkboxComponent,
        'textarea': textareaComponent,
        'general-errors': generalErrorsComponent
    }
    ;

function plugin(Vue) {

    if (plugin.installed) {

        if (window.console) {
            console.warn('[vue-validator] already installed.')
        }
        return
    }

    Laradator(Vue)

    for (let key in elements) {
        Vue.component('laradate-' + key, elements[key])
    }
}

plugin.version = 'dev'

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}
