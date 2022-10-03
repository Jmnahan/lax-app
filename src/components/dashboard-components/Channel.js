
export default function Channel(props) {
  const { channels, onChannelClick } = props
  return(
    <>
      {channels?.map((channel) => (
        <button className="hover:bg-fuchsia-800 m-0.5 text-left w-fit p-0.5 rounded px-1" key={channel.name} onClick={onChannelClick}>
        # <span className="text-sm">{channel.name}</span>
        </button>
    ))}
  </>
  )
}