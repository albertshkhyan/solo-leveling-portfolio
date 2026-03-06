import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({ src, fallbackSrc, alt, style, className, ...rest }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [didFallbackError, setDidFallbackError] = useState(false)

  const handleError = () => {
    if (fallbackSrc && !didError) {
      setDidError(true)
    } else {
      setDidFallbackError(true)
    }
  }

  const showError = !src || (didError && (!fallbackSrc || didFallbackError))

  if (showError) {
    return (
      <div
        className={`inline-block bg-[#0F1A33] text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt={alt ?? 'Error loading image'} loading="lazy" decoding="async" data-original-url={src} />
        </div>
      </div>
    )
  }

  const activeSrc = didError && fallbackSrc ? fallbackSrc : src

  return (
    <img src={activeSrc} alt={alt ?? ''} className={className} style={style} loading="lazy" decoding="async" onError={handleError} {...rest} />
  )
}
