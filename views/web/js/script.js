window.onload=function(){


const express = require('express');
const connection = require("../../../connection");
}
  function changeColor(value){
    console.log(value);
    let buttonInfo = value;

    if(buttonInfo.style.color != 'red'){
        buttonInfo.style.color = 'red';
       let h5 = buttonInfo.getElementsByTagName('h5');
      let oldVotes = h5.votes.textContent;
      let newVotes =  h5.votes.textContent++;     

    }
    else{
        buttonInfo.style.color = 'black';
        let h5 = buttonInfo.getElementsByTagName('h5');
        h5.votes.textContent--;
 
    }

}