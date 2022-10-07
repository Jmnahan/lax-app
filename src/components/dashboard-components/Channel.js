
export default function Channel(props) {
  const { channels, onChannelClick } = props

  const channelList = channels?.map(channel => {
    return <button className="hover:bg-fuchsia-900 text-left w-fit py-1 px-1" 
            key={channel.name} 
            onClick={onChannelClick}>
            # 
            <span className="text-sm">{channel.name}</span>
           </button>
  })

  return(
    <>
    <div className="h-30 overflow-y-auto flex flex-col" id="custom-style">
      {channelList}
    </div>
  </>
  )
}