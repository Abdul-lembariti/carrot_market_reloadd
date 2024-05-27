import AgoraRTC, { UID } from 'agora-rtc-sdk-ng'

const client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' })

export const joinChannel = async (
  appId: string,
  channel: string,
  token: string | null,
  uid: UID | null | undefined
) => {
  await client.join(appId, channel, token, uid)
  return client
}

export default client
