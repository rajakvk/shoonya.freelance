import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_NAMETITLE } from '../../../gql/user'
import Loader from '../../common/Loader'

interface UserObj {
  name: string
  title: string
}

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
    savecancelbtn: {
      marginRight: '.5rem',
    },
  })
)

const UserNameTitle = ({ data }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [nameTitle, setNameTitle] = useState<UserObj>(data)
  const [updatedNameTitle, setUpdatedNameTitle] = useState<string | null>(null)

  const [updateUserNameTitle, { loading, error }] = useMutation(UPDATE_USER_NAMETITLE, {
    onCompleted(val) {
      const newUserNameTitle = val.updateUserNameTitle
      setNameTitle(newUserNameTitle)
      setUpdatedNameTitle(newUserNameTitle)
      setEdit(false)
    },
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setNameTitle({
      ...nameTitle,
      [evt.target.name]: evt.target.value,
    })
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserNameTitle({
      variables: { name: nameTitle.name, title: nameTitle.title },
    })
  }

  const cancelUpdateUser = () => {
    const revertUserNameTitle = updatedNameTitle || data
    setNameTitle(revertUserNameTitle)
    setEdit(false)
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="flex flex-col justify-center p-4 bg-resume md:p-6">
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <TextField
            name="name"
            label="Name"
            onChange={handleChange}
            value={nameTitle.name}
            color="primary"
            margin="dense"
            variant="outlined"
            required
          />
          <TextField
            name="title"
            label="Title"
            onChange={handleChange}
            value={nameTitle.title}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <div className="self-end pt-1">
            <Button className={classes.savecancelbtn} type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              className={classes.savecancelbtn}
              onClick={() => cancelUpdateUser()}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex justify-between">
            <h1 className="text-5xl text-black">{nameTitle.name}</h1>
            {!isReadOnly ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <EditIcon />
              </button>
            ) : null}
          </div>
          <h3>{nameTitle.title} </h3>
        </div>
      )}
    </div>
  )
}

export default UserNameTitle
