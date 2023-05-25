import {debounce} from "lodash/function";
import {ref} from "vue";

export default {
    delayFunction (options = {onStart:null, onEnd:null, delay:2000})
     {
        let initDebounce = ref(false)
        function startedTyping() {
            initDebounce.value = true
            options.onStart ? options.onStart() : null
          }

          function stoppedTyping() {
            //console.log('stopped typing')
            initDebounce.value = false
            options.onEnd ? options.onEnd() : null
          }

        startedTyping = debounce(startedTyping, options.delay, {
            leading: true,
            trailing: false,
        })
        stoppedTyping = debounce(stoppedTyping, options.delay, {
            leading: false,
            trailing: true,
        })

        function handleKeydown() {
            // This triggers on the leading edge
            startedTyping()

            // This triggers on the trailing edge (after 5s)
            stoppedTyping()
          }

         return {initDebounce, handleKeydown}
     },
    makeTitle(slug, separator = '-') {
      let words = slug.split(separator);

      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      return words.join(' ');
   }
}