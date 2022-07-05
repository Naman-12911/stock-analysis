import React,{useState} from 'react'
// import stocks from "../img/stocks2.jpg";
import "../css/searchBar.css";
import TextField from "@mui/material/TextField";
import list from "./list.json"
// import search from "../img/001-search.png"
import List from './List';
import NifyFity from './NifyFity';
import SearchIcon from '@material-ui/icons/Search';
function SearchBar() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <>
    {/* <img class="container" src ={stocks}/> */}
    <NifyFity/>
   
    <div  className="container">
    
    <div className="main">
      <h1>Search and Analysis the Company</h1>
      
      <div className="search">
      
        <TextField
        InputProps={{
          endAdornment: (
               <SearchIcon/>
          )
        }}
           id="outlined-basic"
           onChange={inputHandler}
           variant="standard"
           
           fullWidth
          label="Type company name to analysis"
        />
      </div>
      <List input={inputText} />
    </div>
    </div>
    </>
   
  )
}

export default SearchBar