import { ref, unref, toValue } from 'vue'

export function useFetch(name) {
  const data = ref(null)
  const error = ref(null)
  
  const load = (value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("hello:" + value)
      }, 1000)
    })
  }
  load(toValue(name))
    .then((res) => res)
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}