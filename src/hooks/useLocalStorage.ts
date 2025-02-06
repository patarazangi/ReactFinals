import { useState } from 'react'

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (v: T) => any] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    setStoredValue((originalValue: T) => {
      try {
        const valueToStore =
          value instanceof Function ? value(originalValue) : value
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        return valueToStore
      } catch (err) {
        console.log(err)
        return originalValue
      }
    })
  }
  return [storedValue, setValue]
}

export default useLocalStorage
