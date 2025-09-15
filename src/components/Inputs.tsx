import { useContext } from "react"
import { myContext } from "./Context"

const Inputs = () => {
  const context = useContext(myContext)
  return (
    <div>Inputs</div>
  )
}

export default Inputs