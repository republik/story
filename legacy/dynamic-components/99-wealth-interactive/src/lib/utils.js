import { useEffect, useRef } from 'react'

export const useEventListener = (eventName, handler, element = window) => {
  // Create a ref that stores handler
  const savedHandler = useRef()

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event)

      // Add event listener
      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element] // Re-run if eventName or element changes
  )
}

// This is an adopted polyfill for CustomEvent, ought to used by Internet Explorer >= 9
// @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill
export const createCustomEvent = (name, params = {}) => {
  if (typeof window.CustomEvent !== "function") {
    const evtParams = { bubbles: false, cancelable: false, detail: null, ...params }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(name, evtParams.bubbles, evtParams.cancelable, evtParams.detail)
    return evt
  }

  return new CustomEvent(name, params)
}

export const toNumber = (value) =>
  String(value).length
    ? Math.max(0, parseInt(value, 10)) || 0
    : 0