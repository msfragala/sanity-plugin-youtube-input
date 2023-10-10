import {ComponentIcon, EllipsisVerticalIcon, ResetIcon, SearchIcon} from '@sanity/icons'
import {Box, Button, Dialog, Menu, MenuItem, Popover, Stack, TextArea, TextInput} from '@sanity/ui'
import {useState} from 'react'
import {VideoSearch} from './VideoSearch'
import {YoutubeVideoData} from '../utils'
import {FormField} from 'sanity'

export function ActionsMenu(props: {
  apiKey: string
  onReplace: (data: YoutubeVideoData) => void
  onReset: () => void
  details: YoutubeVideoData
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [showReplace, setShowReplace] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Box margin={2} style={{position: 'absolute', top: 0, right: 0}}>
        <Popover
          portal
          open={showMenu}
          content={
            <Menu ref={null}>
              <MenuItem
                icon={ComponentIcon}
                text="View metadata"
                onClick={() => {
                  setShowDetails(true)
                  setShowMenu(false)
                }}
              />
              <MenuItem
                icon={SearchIcon}
                text="Replace video"
                onClick={() => {
                  setShowReplace(true)
                  setShowMenu(false)
                }}
              />
              <MenuItem
                tone="critical"
                icon={ResetIcon}
                text="Clear field"
                onClick={props.onReset}
              />
            </Menu>
          }
        >
          <Button icon={EllipsisVerticalIcon} mode="ghost" onClick={() => setShowMenu(!showMenu)} />
        </Popover>
        {showReplace && (
          <Dialog
            header="Replace YouTube video"
            onClose={() => setShowReplace(false)}
            id="youtube-video-section"
            width={1}
          >
            <Box padding={4}>
              <VideoSearch
                apiKey={props.apiKey}
                onSubmit={(data) => {
                  props.onReplace(data)
                  setShowReplace(false)
                }}
              />
            </Box>
          </Dialog>
        )}
        {showDetails && (
          <Dialog
            header="YouTube video metadata"
            onClose={() => setShowDetails(false)}
            id="youtube-video-section-details"
            width={1}
          >
            <Stack space={4} padding={4}>
              <FormField title="ID">
                <TextInput readOnly value={props.details.id} />
              </FormField>
              <FormField title="Title">
                <TextInput readOnly value={props.details.title} />
              </FormField>
              <FormField title="Description">
                <TextArea readOnly value={props.details.description} rows={10} />
              </FormField>
              <FormField title="Published Date">
                <TextInput readOnly value={formatDateTime(props.details.publishedAt)} />
              </FormField>
              <FormField title="Thumbails">
                <TextInput readOnly value={props.details.thumbnails.join(', ')} />
              </FormField>
            </Stack>
          </Dialog>
        )}
      </Box>
    </>
  )
}

function formatDateTime(datetime: string) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  }).format(new Date(datetime))
}
