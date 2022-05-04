import React, { ReactNode, Children, useEffect, useMemo } from 'react'
import * as ST from './styled'

interface ICarousel {
  children: ReactNode
  show: number
  infiniteLoop?: boolean
  withIndicator?: boolean
}

export const Carousel = ({
  children,
  show,
  infiniteLoop,
  withIndicator,
}: ICarousel): JSX.Element => {
  const indicatorContainerRef = React.useRef<HTMLDivElement>(null)

  const length = React.useMemo(() => Children.count(children), [children])
  const isRepeating = React.useMemo(
    () => infiniteLoop && Children.count(children) > show,
    [children, infiniteLoop, show]
  )
  const [currentIndex, setCurrentIndex] = React.useState<number>(
    isRepeating ? show : 0
  )
  const [touchPosition, setTouchPosition] = React.useState<null | number>(null)
  const [isTransitionEnabled, setTransitionEnabled] =
    React.useState<boolean>(true)

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true)
      }
    }
  }, [currentIndex, isRepeating, show, length])
  useEffect(() => {
    if (withIndicator) {
      const active =
        indicatorContainerRef.current?.querySelector('.dots-active')
      if (active) {
        let index = active.getAttribute('data-index')
        if (index !== null && indicatorContainerRef.current?.scrollTo) {
          indicatorContainerRef.current?.scrollTo({
            left: ((Number(index) - 2) / 5) * 50,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [withIndicator, currentIndex])

  const nextItem = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const previousItem = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Save the first position of the touch
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Get initial location
    const touchDown = touchPosition

    // Proceed only if the initial position is not null
    if (touchDown === null) {
      return
    }

    // Get current position
    const currentTouch = e.touches[0].clientX

    // Get the difference between previous and current position
    const diff = touchDown - currentTouch

    // Go to next item
    if (diff > 5) {
      nextItem()
    }

    // Go to previous item
    if (diff < -5) {
      previousItem()
    }

    // Reset initial touch position
    setTouchPosition(null)
  }

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false)
        setCurrentIndex(length)
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false)
        setCurrentIndex(show)
      }
    }
  }

  const extraPreviousItems = useMemo(() => {
    let output = []
    for (let index = 0; index < show; index++) {
      output.push(Children.toArray(children)[length - 1 - index])
    }
    output.reverse()
    return output
  }, [children, length, show])

  const extraNextItems = React.useMemo(() => {
    let output = []
    for (let index = 0; index < show; index++) {
      output.push(Children.toArray(children)[index])
    }
    return output
  }, [children, show])

  return (
    <ST.Container>
      <ST.Wrapper>
        {isRepeating || currentIndex > 0 ? (
          <ST.ButtonSwap isRight={false} onClick={previousItem} />
        ) : null}
        <ST.ContentWrapper
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <ST.Content
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              transition: !isTransitionEnabled ? 'none' : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {length > show && isRepeating && extraPreviousItems}
            {children}
            {length > show && isRepeating && extraNextItems}
          </ST.Content>
        </ST.ContentWrapper>
        {isRepeating || currentIndex < length - show ? (
          <ST.ButtonSwap isRight={true} onClick={nextItem} />
        ) : null}
      </ST.Wrapper>
    </ST.Container>
  )
}
