
const Add = ({onClick, label}) => {
  return (
    <button onClick={onClick} className="border border-black p-4">{label}</button>
  )
}

export default Add