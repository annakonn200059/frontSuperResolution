import React, { ReactNode, Children, useEffect } from 'react'
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
  const mod = Children.toArray(children).length
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
    if (isRepeating) {
      setCurrentIndex((prevState) => (prevState + 1) % mod)
    }
  }

  const previousItem = () => {
    if (isRepeating) {
      if (currentIndex !== 0) setCurrentIndex((prevState) => prevState - 1)
      else setCurrentIndex(mod - 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Save the first position of the touch
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX

    const diff = touchDown - currentTouch

    if (diff > 5) {
      nextItem()
    }
    if (diff < -5) {
      previousItem()
    }

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
              transition: !isTransitionEnabled ? 'none' : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {Children.toArray(children)[currentIndex]}
          </ST.Content>
        </ST.ContentWrapper>
        {isRepeating || currentIndex < length - show ? (
          <ST.ButtonSwap isRight={true} onClick={nextItem} />
        ) : null}
      </ST.Wrapper>
    </ST.Container>
  )
}
