import './App.css';
import React, { useState } from 'react';
// import { ReactComponent as ShuffleSVG } from "./assets/img/shuffle.svg"

import Balance from './assets/img/Balance.jpg';
import Comet from './assets/img/Comet.jpg';
import Dungeon from './assets/img/Dungeon.jpg';
import Euryale from './assets/img/Euryale.jpg';
import Fates from './assets/img/Fates.jpg';
import Flames from './assets/img/Flames.jpg';
import Fool from './assets/img/Fool.jpg';
import Gem from './assets/img/Gem.jpg';
import Idiot from './assets/img/Idiot.jpg';
import Jester from './assets/img/Jester.jpg';
import Key from './assets/img/Key.jpg';
import Knight from './assets/img/Knight.jpg';
import Moon from './assets/img/Moon.jpg';
import Rogue from './assets/img/Rogue.jpg';
import Ruin from './assets/img/Ruin.jpg';
import Skull from './assets/img/Skull.jpg';
import Star from './assets/img/Star.jpg';
import Sun from './assets/img/Sun.jpg';
import Talons from './assets/img/Talons.jpg';
import Throne from './assets/img/Throne.jpg';
import Vizier from './assets/img/Vizier.jpg';
import Void from './assets/img/Void.jpg';

export default function App() {
  const [cardName, setCardName] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [Shuffle, setShuffle] = useState("")
  const [toggleDelete, settoggleDelete] = useState(false)
  const [delFilColor, setdelFilColor] = useState("white")
  const [mainH1, setmainH1] = useState("Draw, if you dare!")


  function toggleDeleteFunc() {
    settoggleDelete(!toggleDelete);
    if( delFilColor == "Red"){
      setdelFilColor("white")
    }else{
      setdelFilColor("Red")
    }
  }

  const cardImages = {
    balance: Balance,
    comet: Comet,
    dungeon: Dungeon,
    euryale: Euryale,
    fates: Fates,
    flames: Flames,
    fool: Fool,
    gem: Gem,
    idiot: Idiot,
    jester: Jester,
    key: Key,
    knight: Knight,
    moon: Moon,
    rogue: Rogue,
    ruin: Ruin,
    skull: Skull,
    star: Star,
    sun: Sun,
    talons: Talons,
    throne: Throne,
    vizier: Vizier,
    void: Void,
  };

  function handleCards() { 
    fetch('http://localhost:3001/getCard')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCardName(data.name.toLowerCase());
        setCardDesc(data.description);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function handleCards_Delete(){
    fetch('http://localhost:3001/getCard_Delete')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCardName(data.name.toLowerCase());
        setCardDesc(data.description);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function handleShuffle(){
    fetch('http://localhost:3001/shuffle')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setShuffle()
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  return (
    <main>
      <h1>{cardName ? (cardName) : (mainH1)}</h1>
      
    <div id='Del_Shuff_conatiner'>
      <svg 
        onClick={toggleDeleteFunc} 
        id="del_svg"
        width="10%" 
        height="auto" 
        viewBox="0 0 490.646 490.646"
        fill={delFilColor}
      >
        <g>
          <g>okji
            <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z
              M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z"/>
            <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z
              M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z"/>
          </g>
        </g>
      </svg>

      {toggleDelete ? (
        <button id="draw" onClick={handleCards_Delete}>I challenge The Fates</button>
      ) : (
        <button id="draw" onClick={handleCards}>I challenge The Fates</button>
      )}

      <svg id='shuffle_svg'
        onClick={handleShuffle} 
        title="Shuffle The Deck"
        height="auto"
        viewBox="0 0 16 16"
        width="10%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m12 11h-1.586l-2.5-2.5 2.5-2.5h1.586v2.5l3.5-3.5-3.5-3.5v2.5h-2c-.265 0-.52.105-.707.293l-2.793 2.793-2.793-2.793c-.188-.188-.442-.293-.707-.293h-3v2h2.586l2.5 2.5-2.5 2.5h-2.586v2h3c.265 0 .52-.105.707-.293l2.793-2.793 2.793 2.793c.188.188.442.293.707.293h2v2.5l3.5-3.5-3.5-3.5z" />
      </svg>
    </div>
    {/* <p className="cardName">{cardName}</p> */}
      <div className="img_container">
        {cardName && <img src={cardImages[cardName]} alt={cardName} />}
        {/* {cardDesc && <div className="overlay">{cardDesc}</div>      } */}

      </div> 
    {cardDesc && <div className="overlay">{cardDesc}</div>      }
      
    </main>
  );
}