import { TextField,Button,List, ListItem, ListItemText,Modal } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react'
import db from './firebase'
import './Todo.css'
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper : {
        position : "relative",
        width : 400,
        backgroundColor : "#211A1D",
        border : '2px solid #fff',
        boxShadow : theme.shadows[5],
        padding : theme.spacing(2,4,3)
    },
    listOfTodo : {
        background: '#6320EE',
        borderRadius: '2rem',
        width : '80vw',
        maxWidth: '1000px',
        marginTop: '1rem',
        transition: 'all 0.2s linear',
        color: 'white',
      },
      btn : {
        background : '#6320EE',
        '&:hover': {
          background: "#8075FF",
       },
      },
      underline: {
        color: '#6320EE' ,
        '&::after': {
          borderColor: '#6320EE'
        }
      },
}));

function ToDo(props) {
    const classes = useStyles()
    const [input,setInput] = useState('');
    const [open, setOpen] = useState(false);
    const updateTodo = (event) => {
      event.preventDefault()
        db.collection('todos').doc(props.todo.id).set({
            todo : input
        }, {merge : true})
        setOpen(false);
    }
    const taskCompleted = (event) => {
        db.collection('todos').doc(props.todo.id).set({
            done : event.target.checked
        }, {merge : true})
        setOpen(false);
    }
    return (
        <>
        <Modal
            open= {open}
            onClose = {() => setOpen(false)}>
            <div className={classes.paper}>
            <h1>Edit</h1>
            <form>
            <TextField 
            inputProps={{
                maxLength : '30',
                style : {
                  color : 'white',
                },
              }}
            InputProps ={{
          classes: {underline: classes.underline}}
        }
            placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
            <Button classes = {{label : 'btn2'}} onClick={updateTodo} className={classes.btn + " btn"} variant='contained' type='submit' color='primary' disabled={!input} >Update Todo</Button>
            </form>
        </div>
        </Modal>
        <List className= {'todo__list ' + classes.listOfTodo}>
            <ListItem>
              {console.log(props.todo.todo.length)}
              <input type='checkbox' checked={props.todo.done} onChange={taskCompleted} className='doneCheckbox'></input>
                <ListItemText style={{
                  overflow : 'hidden'
                }}primary={props.todo.todo} className={props.todo.done ? "done" : ""}></ListItemText>
                <Button 
                classes = {{label : 'btn2'}}
                className={classes.btn + " btn"}
                onClick={() => setOpen(true)}>Edit</Button>
            <DeleteIcon className={classes.btn} onClick={() => db.collection('todos').doc(props.todo.id).delete()}>Delete Me</DeleteIcon>
            </ListItem>
        </List>
        </>
    )
}

export default ToDo
