import { View, Text } from 'react-native'
import React from 'react'
import SearchComponent from './searchComponent';

const SearchContainer = (props) => {
  return (
    <>
     <SearchComponent title={props.title}/>
    </>
  )
}

export default SearchContainer;