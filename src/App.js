import { Button, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Todo from './Todo';


const useStyles = makeStyles(() => ({
  underline: {
    color: '#6320EE' ,
    '&::after': {
      borderColor: '#6320EE'
    }
  },
    list : {
      marginTop : '2rem',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textInput : {
      color : 'white'
    },
    form : {
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'space-evenly',

    },
    btn : {
      background : '#6320EE',
      '&:hover': {
        background: "#8075FF",
     },
    }
    
}));

function App() {
  const classes = useStyles()
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection('todos').orderBy('timestamp' , 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo : doc.data().todo,done : doc.data().done})))
    })
  }, [input])


  const addTodo = (event) => {
    event.preventDefault()
    db.collection('todos').add({
      todo : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      done : false
    })
    setInput('')
  } 
  return (
    <div className="App">
      <h1>
        Todo
      </h1>
      <h3>Made by Samyak Jain</h3>
      <form className={classes.form} style={{margin : '0 2rem'}}>
        <FormControl >
        <TextField  
        foucused label="Write a todo"
        underline
        value={input} 
        onChange={event => setInput(event.target.value)}  
        autoFocus={true} 
        inputProps={{
          maxLength : '30',
          style : {
            color : 'white',
          },
        }}
        InputProps ={{
          classes: {underline: classes.underline}}
        }
        InputLabelProps={{
          style : {
            color : '#6320EE',
          }
        }}
        />
        </FormControl>
        <Button variant='contained' color='primary'
        onClick={addTodo} type='submit' disabled={!input} className={classes.btn + " btn"}
        classes={{ label : 'btn2'}}>Add todo</Button>
      </form>
      <ul className={classes.list}>
        {todos.map((todo,done) => 
          <Todo todo={todo} done={done} />)}
      </ul>
    </div>
  );
}
 
export default App;
