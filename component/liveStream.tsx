'use client'
import { useEffect } from 'react'
import client, { joinChannel } from '../lib/mux'

interface LiveStreamProps {
  appId: string
  channel: string
  token: string | null
  uid: string
}

export default function LiveStream({
  appId,
  channel,
  token,
  uid,
}: LiveStreamProps) {
  useEffect(() => {
    const init = async () => {
      await joinChannel(appId, channel, token, uid)
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack
          remoteVideoTrack?.play('remote-video')
        }
      })
    }
    init()
  }, [appId, channel, token, uid])

  return <div id="remote-video" style={{ width: '100%', height: '100%' }} />
}
