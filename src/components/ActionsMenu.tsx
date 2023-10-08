import {EllipsisVerticalIcon, ResetIcon, SearchIcon} from '@sanity/icons'
import {Box, Button, Dialog, Menu, MenuItem, Popover} from '@sanity/ui'
import {useState} from 'react'
import {VideoSearch} from './VideoSearch'
import {YoutubeVideoData} from '../utils'

export function ActionsMenu(props: {
  apiKey: string
  onReplace: (data: YoutubeVideoData) => void
  onReset: () => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [showReplace, setShowReplace] = useState(false)

  return (
    <>
      <Box margin={2} style={{position: 'absolute', top: 0, right: 0}}>
        <Popover
          portal
          open={showMenu}
          content={
            <Menu ref={null}>
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
      </Box>
    </>
  )
}
