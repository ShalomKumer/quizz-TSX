import { useContext } from "react"
import { myContext } from "./Context"


const Body = () => {
  const context = useContext(myContext)
  return (
    <div>Body</div>
  )
}

export default Body