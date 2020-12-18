import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '250px',
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: '5px',
      [theme.breakpoints.down('sm')]: {
        width: '80vw',
      },
      [theme.breakpoints.up('md')]: {
        width: '80vw',
      },
      height: 'max-content',
      alignItems: 'center',
    },
    search: {
      width: '100%'
    },
  })
);

const useSearchStyles = makeStyles({
  btn: {
    height: '40px',
    marginLeft: '5px',
    marginRight: '0px',
    width: '50px',
    minWidth: '50px'
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: '4px',
    height: 'max-content',
    margin: '0px',
  },
  inputLabel: {
    color: 'red'
  }
});

const SearchForm = ({ handleSearchClick }) => {
  const [techList, setTechList] = useState([]);
  const [didFetch, setDidFetch] = useState(false);
  const [input, setInput] = useState('');
  const textFieldRef = useRef();
  const classes = useStyles();
  const searchClasses = useSearchStyles();

  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';

    
  const handleClickOnSearchTerm = (e, option) => {
    if (option === 'blur') return;
    handleSearchClick(null, e.target.innerText)();
  }

  function fetchTech () {
    fetch(api_uri + '/technology/all-tech')
      .then(res => res.json())
      .then(data => {
        const { technologies } = data;
        setTechList(technologies);
      })
      .catch(err => console.log(err));
  }
   
  useEffect(() => {
    if (!didFetch) {
      fetchTech();
    }
  });

  useEffect(() => {
    setDidFetch(true);
  },[JSON.stringify(techList)]);


  return (
    <>
      <div className={classes.root}>
        {
          didFetch 
          ? <Autocomplete
              // onClose={((e,_)=> handleSearchClick(null, e.target.innerText)())}
              onClose={handleClickOnSearchTerm}
              open={input ? true : false}
              openOnFocus={true}
              limitTags={3}
              className={classes.search}
              id="search"
              size="small"
              freeSolo
              options={techList.map((option) => option.tech_name)}
              renderInput={(params) => (
                <TextField
                  autoComplete='false'
                  className={searchClasses.textField} 
                  {...params} 
                  margin="normal" 
                  variant="outlined"
                  ref={textFieldRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={'Search for a technology'}
                />
              )}
            />
          : <h1>Fetching Data</h1> 
        }
      <Button
        variant="contained"
        size="small"
        color="secondary"
        className={searchClasses.btn}
        onClick={handleSearchClick(textFieldRef)}
        ><SearchIcon/>
      </Button>    
      </div>
    </>
  ); 
}

export default SearchForm;