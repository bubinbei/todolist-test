import React from 'react'
import { SelecktTasksType } from '../App'
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

type ButtonType = {
name: string
collback: () => void
titleSeleckt: SelecktTasksType
}

export const ButtonUniversal:React.FC<ButtonType> = (props) => {
    const {name, collback, titleSeleckt} = props

  return (
    <Button 
      variant="outlined" 
      data-testid="DeleteIcon"
      // если название кнопки совпадает с селектором, она меняет цвет
      className={titleSeleckt===name ? 'active-filter' : ''} 
      onClick={collback}
      color={titleSeleckt===name ? 'secondary' : 'info'}
      >
      { name==='Delete' ? <DeleteOutlinedIcon /> : name }
    </Button>
  )
}
