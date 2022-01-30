import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

import axios from "axios"

export default function Home() {

  var [tecla, setTecla] = useState("")
  var [position, setPosition] = useState([0,0])
  var [wrongLetter, setWrongLetter] = useState([])

  const letterTam = 4 // +1
  const lines = 5 // +1

  var WordComplete = false

  function ChangePositionLetter (letter){

    if (WordComplete === false){ 
      
      
      if (position[1] <= letterTam){
        
        document.getElementById("board").childNodes[position[0]].childNodes[position[1]].textContent = letter
   
        
        if (position[1] === letterTam){
          WordComplete = true
        }
        else{
          position[1] ++
        }

      }
 
    
    }
       
  

  }

  function Type(letter){

    // console.log("2 -", wrongLetter, wrongLetter.indexOf(letter.toLowerCase()))

    if (wrongLetter.indexOf(letter.toLowerCase()) != -1){
      console.log("Letra inutilizada!")
      return
    }


    if (letter === "BACKSPACE" || letter === "⌫"){
      deleteLetter(letter)
    }
      
    if (letter === "ENTER" || letter === "⌫"){
      sendWord(letter)
    }
  
    // console.log()

    if (letter.length === 1 && position[1] <= letterTam && letter != "⌫"){
      console.log("Digitando... ", position[0], position[1])
      console.log(letter)
      ChangePositionLetter (letter)
     
    }

    

  }

  function deleteLetter (letter){

    if (document.getElementById("board").childNodes[position[0]].childNodes[position[1]].textContent === ""){
      if(position[1] != 0){
        position[1] --
      }
    }

    // document.getElementById("board").childNodes[position[0]].childNodes[position[1]-1].textContent = ""
    
    if (position[1] <= letterTam){
      console.log("Deletando Tecla 1 ", position[0], position[1])
      // position[1] --
      // document.getElementById("board").childNodes[position[0]].childNodes[position[1]].textContent = ""
      document.getElementById("board").childNodes[position[0]].childNodes[position[1]].textContent = ""
      document.getElementById("board").childNodes[position[0]].childNodes[position[1]].setAttribute("class", "letter empty edit")
    }



    if (position[1] > 0){

      // position[1] --
      WordComplete = false

    }


  }

  function sendWord(letter){

    var word = ""

    // console.log("onSendWord",  position[1], letterTam)

    var lastLetter = document.getElementById("board").childNodes[position[0]].childNodes[letterTam].textContent
    
    if (letter === "ENTER" && lastLetter != "" && position[0] <= lines){
      
      if (position[1] === letterTam){

        // document.getElementById("board").childNodes[position[0]].childNodes[position[1]].textContent = letter
        for (var i = 0; i <= letterTam; i++){

          word = word + document.getElementById("board").childNodes[position[0]].childNodes[i].textContent
          document.getElementById("board").childNodes[position[0]].childNodes[i].setAttribute("class", "letter")
          
          
        }

        console.log(word)

        // word = "PASTO".toLowerCase()
        
        var data = JSON.stringify({
          "word": word.toLowerCase()
        });
        
        var config = {
          method: 'post',
          url: '/api/',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(response.data);

          var letras  = response.data

          // letter wrong
          // letter place
          // letter right
          // Não Encontrados

          var finded = []

          for (var i in letras){

            

            for (var j in letras[i]){

              console.log(i, letras[i][j])

              if (letras[i][j].exist && letras[i][j].position){

                document.getElementById("board").childNodes[position[0]-1].childNodes[letras[i][j].pos].setAttribute("class", "letter right")
          
              }
              if (letras[i][j].exist && !letras[i][j].position){

                document.getElementById("board").childNodes[position[0]-1].childNodes[letras[i][j].pos].setAttribute("class", "letter place")
          
              }
              if (!letras[i][j].exist && !letras[i][j].position){

                document.getElementById("board").childNodes[position[0]-1].childNodes[letras[i][j].pos].setAttribute("class", "letter wrong")
                
                document.getElementById(`kbd_${i.toLowerCase()}`).setAttribute("class", "wrong")
                
                var wrongLetterTemp = wrongLetter
                wrongLetterTemp.push(i)

                console.log(wrongLetterTemp, "temp")
                setWrongLetter(wrongLetterTemp)


              }

            }



          }
          // document.getElementById("board").childNodes[position[0]-1].childNodes[pos].setAttribute("class", "letter place")
          
          console.log(wrongLetter)
            


        })
        .catch(function (error) {
          console.log(error);
        });
        

        position[0] ++
        position[1] = 0
        WordComplete = false

        for (var i = 0; i <= letterTam; i++){

          document.getElementById("board").childNodes[position[0]].childNodes[i].setAttribute("class", "letter empty")
          
        }

        
      }

    }


    

  }  



  return (
    <div className={styles.container}>
      <Head>
        <title>Termo</title>
        <meta name="description" content="Desevenlopado by PWARR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <button tabIndex="0" aria-label="instruções" id="how">?</button>
        <h1 tabIndex="0">termo</h1>
      </header>  


      <div id="notify">
        <div aria-live="assertive" tabIndex="0" id="msg"></div>
      </div>

      <main onKeyDown={e => Type(e.nativeEvent.key.toUpperCase())}>
        <div aria-live="polite" id="board" role="group">
          <div tabIndex="0" role="group" className="row" aria-label="palavra 1">
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter empty" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter empty" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter empty" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter empty" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter empty" tabIndex="0"></div>
          </div>
          <div tabIndex="0" role="group" className="row" aria-label="palavra 2">
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
          </div>
          <div tabIndex="0" role="group" className="row" aria-label="palavra 3">
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
          </div>
          <div tabIndex="0" role="group" className="row" aria-label="palavra 4">
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
          </div>
          <div tabIndex="0" role="group" className="row" aria-label="palavra 5">
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
          </div>
          <div tabIndex="0" role="group" className="row" aria-label="palavra 6">
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
            <div role="img" aria-label="" aria-live="polite" aria-roledescription="letra" className="letter" tabIndex="0"></div>
          </div>
        </div>
      </main>

      <div onClick={e => (Type(e.target.innerHTML))} id="kbd">
        <button id="kbd_q">Q</button>
        <button id="kbd_w">W</button>
        <button id="kbd_e">E</button>
        <button id="kbd_r">R</button>
        <button id="kbd_t">T</button>
        <button id="kbd_y">Y</button>
        <button id="kbd_u">U</button>
        <button id="kbd_i">I</button>
        <button id="kbd_o">O</button>
        <button id="kbd_p">P</button>
        <button id="kbd_a">A</button>
        <button id="kbd_s">S</button>
        <button id="kbd_d">D</button>
        <button id="kbd_f">F</button>
        <button id="kbd_g">G</button>
        <button id="kbd_h">H</button>
        <button id="kbd_j">J</button>
        <button id="kbd_k">K</button>
        <button id="kbd_l">L</button>
        <button id="kbd_backspace">⌫</button>
        <button id="kbd_z">Z</button>
        <button id="kbd_x">X</button>
        <button id="kbd_c">C</button>
        <button id="kbd_v">V</button>
        <button id="kbd_b">B</button>
        <button id="kbd_n">N</button>
        <button id="kbd_m">M</button>
        <button id="kbd_enter">ENTER</button>
      </div>


    </div>
  )
}
