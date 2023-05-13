import React, { useState } from 'react'

const SignIn = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div onClick={handleClick}>
        {count}
    </div>
  )
}

export default SignIn