import Button from '@mui/material/Button'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      textAlign: 'center',
      padding: '1rem',
      border: '2px solid #282828',
    },
    selectedOption: {
      background: '#dfe5cb',
    },
  })
)

const WizardProjectSizeOption = ({ children, handleOptionChange, parentkey, nestedkey, value, state }) => {
  const classes = useStyles()
  return (
    <Button
      onClick={() => handleOptionChange(parentkey, nestedkey, value)}
      className={`${classes.btn} ${state[parentkey][nestedkey] === value && classes.selectedOption}`}
    >
      {children}
    </Button>
  )
}
export default WizardProjectSizeOption
