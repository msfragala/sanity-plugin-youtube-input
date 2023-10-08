import {Box, Button, Flex, TextInput} from '@sanity/ui'
import {KeyboardEvent, useRef, useState} from 'react'
import {FormField} from 'sanity'
import {YoutubeVideoData, deriveVideoId, fetchVideoData} from '../utils'

export function VideoSearch(props: {apiKey: string; onSubmit: (data: YoutubeVideoData) => void}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const [error, setError] = useState<string | null>(null)

  function validateInput() {
    const input = inputRef.current?.value
    if (!input) return setError(null)
    const id = deriveVideoId(input)
    if (!id) return setError('Invalid Youtube URL')
    setError(null)
    return id
  }

  function submit() {
    if (!inputRef.current?.value) {
      return setError('Missing YouTube URL')
    }

    const id = validateInput()

    if (!id) return

    fetchVideoData(id, props.apiKey)
      .then((data) => {
        if (!data) return setError('YouTube video not found')
        props.onSubmit(data)
      })
      .catch((_error) => {
        console.error(_error)
        setError('Error fetching YouTube data')
      })
  }

  function onPaste() {
    setTimeout(() => validateInput(), 0)
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    submit()
  }

  function onChange() {
    setError(null)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(validateInput, 800)
  }

  function onBlur() {
    validateInput()
  }

  return (
    <FormField
      title="Enter YouTube video link"
      validation={error ? [{level: 'error', message: error, path: []}] : []}
    >
      <Flex gap={2} width="100%">
        <Box flex={1}>
          <TextInput
            ref={inputRef}
            height="100%"
            onPaste={onPaste}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="https://www.youtube.com/watch?v=<video_id>"
          />
        </Box>
        <Button mode="ghost" text="Submit" type="button" onClick={() => submit()} />
      </Flex>
    </FormField>
  )
}
