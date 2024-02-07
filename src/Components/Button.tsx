import React from 'react'
import { SelecktTasksType } from '../App'
type ButtonType = {
name: string
collback: () => void
titleSeleckt: SelecktTasksType
}

export const Button:React.FC<ButtonType> = (props) => {
    const {name, collback, titleSeleckt} = props

  return (
    <button 
    // если название кнопки совпадает с селектором, она меняет цвет
      className={titleSeleckt===name ? 'active-filter' : ''} 
      onClick={collback}
    >
      {name}
    </button>
  )
}
