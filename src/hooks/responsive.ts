import { useCallback, useEffect, useState } from "react"

export const useResponsive = () => {
  const mobileMQ = window.matchMedia("(max-width: 500px)")
  const smallMQ = window.matchMedia("(max-width: 1024px)")
  const mediumMQ = window.matchMedia("(max-width: 1440px)")
  const largeMQ = window.matchMedia("(min-width: 1440px)")
  const noPointerMQ = window.matchMedia("(pointer: none)")

  const [mobileMatches, setMobileMatches] = useState(mobileMQ.matches)
  const [smallMatches, setSmallMatches] = useState(smallMQ.matches)
  const [mediumMatches, setMediumMatches] = useState(mediumMQ.matches)
  const [largeMatches, setLargeMatches] = useState(largeMQ.matches)
  const [noPointerMatches, setNoPointerMatches] = useState(noPointerMQ.matches)

  const handleMQChange = useCallback(() => {
    setMobileMatches(mobileMQ.matches)
    setSmallMatches(smallMQ.matches)
    setMediumMatches(mediumMQ.matches)
    setLargeMatches(largeMQ.matches)
    setNoPointerMatches(noPointerMQ.matches)
  }, [mobileMQ, smallMQ, mediumMQ, largeMQ, noPointerMQ])

  useEffect(() => {
    mobileMQ.addEventListener("change", handleMQChange)
    smallMQ.addEventListener("change", handleMQChange)
    mediumMQ.addEventListener("change", handleMQChange)
    largeMQ.addEventListener("change", handleMQChange)
    noPointerMQ.addEventListener("change", handleMQChange)
    return () => {
      mobileMQ.removeEventListener("change", handleMQChange)
      smallMQ.removeEventListener("change", handleMQChange)
      mediumMQ.removeEventListener("change", handleMQChange)
      largeMQ.removeEventListener("change", handleMQChange)
      noPointerMQ.removeEventListener("change", handleMQChange)
    }
  }, [handleMQChange, mobileMQ, smallMQ, mediumMQ, largeMQ, noPointerMQ])

  return {
    isMobile: mobileMatches,
    isSmall: smallMatches,
    isMedium: mediumMatches,
    isLarge: largeMatches,
    noPointer: noPointerMatches,
  }
}
