import {Box} from '@sanity/ui'
import {useState} from 'react'

export function VideoPreview(props: {id: string; title: string}) {
  const [loadEmbed, setLoadEmbed] = useState(false)
  return (
    <Box style={{aspectRatio: '16 / 9', position: 'relative', isolation: 'isolate'}}>
      <Box
        className="absolute -z-10"
        style={{position: 'absolute', zIndex: -1, height: '100%', width: '100%'}}
      >
        <picture>
          <source
            type="image/webp"
            srcSet={[
              `https://i.ytimg.com/vi_webp/${props.id}/mqdefault.webp 320w`,
              `https://i.ytimg.com/vi_webp/${props.id}/hqdefault.webp 480w`,
              `https://i.ytimg.com/vi_webp/${props.id}/sddefault.webp 640w`,
            ].join(', ')}
          />
          <img
            style={{width: '100%', height: '100%'}}
            src={`https://i.ytimg.com/vi/${props.id}/sddefault.jpg`}
            srcSet={[
              `https://i.ytimg.com/vi/${props.id}/mqdefault.jpg 320w`,
              `https://i.ytimg.com/vi/${props.id}/hqdefault.jpg 480w`,
              `https://i.ytimg.com/vi/${props.id}/sddefault.jpg 640w`,
            ].join(', ')}
            alt={props.title}
          />
        </picture>
        <button
          type="button"
          onClick={() => setLoadEmbed(true)}
          aria-label="Play"
          style={{
            border: '0',
            background: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'grid',
            width: '100%',
            height: '100%',
            placeItems: 'center',
          }}
        >
          <svg version="1.1" viewBox="0 0 68 48" height="48" width="68">
            <path
              d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              fill="#f00"
            />
            <path d="M 45,24 27,14 27,34" fill="#fff" />
          </svg>
        </button>
      </Box>
      {loadEmbed && (
        <iframe
          style={{height: '100%', width: '100%', border: 0}}
          src={`https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1&fs=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={props.title}
        />
      )}
    </Box>
  )
}
