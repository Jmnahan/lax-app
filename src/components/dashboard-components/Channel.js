
export default function Channel(props) {
  const { channels, onChannelClick } = props
  return(
    <>
      {channels.map((channel) => (
        <button className="bg-fuchsia-900 mb-1 mt-1 text-center p-0.5 rounded" key={channel.name} onClick={onChannelClick}>
          <span className="text-xs mt-4">{channel.name}</span>
        </button>
    ))}
  </>
  )
}