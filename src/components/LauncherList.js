import React, { useState, useEffect } from 'react';

const LauncherList = (props) => {
  const [launchers, setLaunchers] = useState([])
  useEffect(() => {

  }, [])

  const launcherList = launchers.map((launcher) => {
    return(
      <li key={launcher.id}>
        {launcher.name}
      </li>
    )
  })

  return(
    <div>
      <ul>
        {launcherList}
      </ul>
    </div>
  )
}

export default LauncherList;
