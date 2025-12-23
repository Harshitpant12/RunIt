import React from 'react'
import styled from 'styled-components';

const LoadingStyle = styled.div`
  color: #111827;`

const Loading = () => {
  return (
    <div>
      <LoadingStyle>Loading...</LoadingStyle>
      </div>
  )
}

export default Loading;