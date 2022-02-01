import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

import axios from "axios"

export default function Home() {

  var [tecla, setTecla] = useState("")
  var [position, setPosition] = useState([0,0])
  var [wrongLetter, setWrongLetter] = useState([])
  var [rules, setRules] = useState(rules)

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

          if (response.data === "Palavra Inválida"){

            document.getElementById("msg").setAttribute("open","true")
            document.getElementById("msg").setAttribute("style", "animation: 0.25s linear 0s 1 normal forwards running popup")

            document.getElementById("board").childNodes[position[0]].setAttribute("style", "animation: 0.75s ease-in-out 0s 1 normal none running rownope;")
                
            // setPosition([position[0]-1, position[1]])

          }

          else{

            document.getElementById("msg").removeAttribute("open","true")
            document.getElementById("msg").removeAttribute("style", "animation: 0.25s linear 0s 1 normal forwards running popup")

            document.getElementById("board").childNodes[position[0]].removeAttribute("style", "animation: 0.75s ease-in-out 0s 1 normal none running rownope;")
                


            position[0] ++
            position[1] = 0
            WordComplete = false
    
            for (var i = 0; i <= letterTam; i++){
    
              document.getElementById("board").childNodes[position[0]].childNodes[i].setAttribute("class", "letter empty")
              
            }


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
                if (!letras[i][j].exist && !letras[i][j].position ){

                  document.getElementById(`kbd_${i.toLowerCase()}`).setAttribute("class", "wrong")
                  
                  // var wrongLetterTemp = wrongLetter
                  // wrongLetterTemp.push(i)

                  // console.log(wrongLetterTemp, "temp")
                  // setWrongLetter(wrongLetterTemp)

                  if (letras[i][j].pos != -1){
                    document.getElementById("board").childNodes[position[0]-1].childNodes[letras[i][j].pos].setAttribute("class", "letter wrong")
                  
                  }

                }
            




              }



            }
            // document.getElementById("board").childNodes[position[0]-1].childNodes[pos].setAttribute("class", "letter place")
            
            // console.log(wrongLetter)

          
          }
            
        })
        .catch(function (error) {
          console.log(error);
        });
        

      }

    }


    

  }  


  // function rulesPge(){

  //   setRules(
  //     <div id="modal">
  //       <div tabindex="0" id="help" class="show">
  //         <div id="helpclose">x</div>

  //         <p tabindex="0">Descubra a palavra certa em 6 tentativas. Depois de cada tentativa, as
  //         peças mostram o quão perto você está da solução.

  //         </p><div class="example">
  //           <span tabindex="0" role="text" aria-label="letra T correta" class="letter right">T</span>
  //           <span tabindex="0" role="text" aria-label="letra U" class="letter">U</span>
  //           <span tabindex="0" role="text" aria-label="letra R" class="letter">R</span>
  //           <span tabindex="0" role="text" aria-label="letra M" class="letter">M</span>
  //           <span tabindex="0" role="text" aria-label="letra A" class="letter">A</span>
  //         </div>

  //         <p tabindex="0">A letra <span class="letter right">T</span> faz parte da palavra e está na
  //         posição correta.</p>

  //         <div class="example">
  //           <span tabindex="0" role="text" aria-label="letra V" class="letter">V</span>
  //           <span tabindex="0" role="text" aria-label="letra I" class="letter">I</span>
  //           <span tabindex="0" role="text" aria-label="letra O em outro local" class="letter place">O</span>
  //           <span tabindex="0" role="text" aria-label="letra L" class="letter">L</span>
  //           <span tabindex="0" role="text" aria-label="letra A" class="letter">A</span>
  //         </div>

  //         <p tabindex="0">A letra <span class="letter place">O</span> faz parte da palavra mas em outra posição.</p>

  //         <div class="example">
  //           <span tabindex="0" role="text" aria-label="letra P" class="letter">P</span>
  //           <span tabindex="0" role="text" aria-label="letra U" class="letter">U</span>
  //           <span tabindex="0" role="text" aria-label="letra L" class="letter">L</span>
  //           <span tabindex="0" role="text" aria-label="letra G errada" class="letter wrong">G</span>
  //           <span tabindex="0" role="text" aria-label="letra A" class="letter">A</span>
  //         </div>

  //         <p tabindex="0">A letra <span class="letter wrong">G</span> não faz parte da palavra.</p>

  //         <p tabindex="0">Os acentos são preenchidos automaticamente, e não são considerados nas dicas.</p>

  //         <p tabindex="0">As palavras podem possuir letras repetidas.</p>

  //         <br>

  //         <p tabindex="0">Uma palavra nova aparece a cada dia.</p>

  //       </div>

  //       <div tabindex="0" id="config">
  //         <p><label for="config_contrast">Contraste alto</label></p> <span><input id="config_contrast" class="toggle" type="checkbox" checked=""></span>
  //         <p>Comentários</p> <span>
  //           <a tabindex="0" href="mailto:fserb@fserb.com.br">E-mail</a>
  //           <a tabindex="0" href="https://twitter.com/fserb">Twitter</a>
  //         </span>
  //         <p>Estatísticas</p> <span><a tabindex="0" href="https://term.ooo/stato">Termostato</a></span>

  //         <p><b>Termo</b> é baseado em <a href="https://www.powerlanguage.co.uk/wordle">Wordle</a>.</p>
  //         <span id="config_version">#ac3f98d</span>
  //       </div>

  //       <div tabindex="0" id="stats">
  //       <h2>progresso</h2>
  //       <div id="statstable">
  //         <b id="stats_games">1</b><p>jogos</p>
  //         <b id="stats_pct">100%</b><p>de vitórias</p>
  //         <b id="stats_streak">1</b><p>sequência<br>de vitórias</p>
  //         <b id="stats_maxstreak">1</b><p>melhor<br>sequência</p>
  //       </div>

  //       <h2>distribuição de tentativas</h2>

  //       <div id="histo">
  //         <p><a tabindex="0" href="https://term.ooo/stato"><img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02MyA0M0M2MC43OTA5IDQzIDU5IDQ0Ljc5MDkgNTkgNDdWNzMuNTQyM0M1NC4zNjAyIDc1LjAyMzEgNTEgNzkuMzY5MSA1MSA4NC41QzUxIDkwLjg1MTMgNTYuMTQ4NyA5NiA2Mi41IDk2QzY4Ljg1MTMgOTYgNzQgOTAuODUxMyA3NCA4NC41Qzc0IDc5Ljc0NTcgNzEuMTE0OSA3NS42NjUyIDY3IDczLjkxMzhWNDdDNjcgNDQuNzkwOSA2NS4yMDkxIDQzIDYzIDQzWiIgZmlsbD0iI0I3QUVCNCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ2IDM3QzQ2IDI3LjYxMTEgNTMuNjExMSAyMCA2MyAyMEM3Mi4zODg5IDIwIDgwIDI3LjYxMTEgODAgMzdWNjkuODE1M0M4My43MzA4IDczLjk3NSA4NiA3OS40NzI1IDg2IDg1LjVDODYgOTguNDc4NyA3NS40Nzg3IDEwOSA2Mi41IDEwOUM0OS41MjEzIDEwOSAzOSA5OC40Nzg3IDM5IDg1LjVDMzkgNzguOTUxMyA0MS42Nzg2IDczLjAyODMgNDYgNjguNzY2OFYzN1pNNTQgMzdDNTQgMzIuMDI5NCA1OC4wMjk0IDI4IDYzIDI4QzY3Ljk3MDYgMjggNzIgMzIuMDI5NCA3MiAzN1Y3My4yNTE2Qzc1LjY1MDggNzYuMDg3MyA3OCA4MC41MTkzIDc4IDg1LjVDNzggOTQuMDYwNCA3MS4wNjA0IDEwMSA2Mi41IDEwMUM1My45Mzk2IDEwMSA0NyA5NC4wNjA0IDQ3IDg1LjVDNDcgODAuMDc4MiA0OS43ODM4IDc1LjMwNjUgNTQgNzIuNTM2NFYzN1oiIGZpbGw9IiNCN0FFQjQiLz4KPC9zdmc+Cg=="></a></p>
  //         <b>1</b><span><div class="stats_histo" style="width:10%">0</div></span>
  //         <b>2</b><span><div class="stats_histo" style="width:20%">0</div></span>
  //         <b>3</b><span><div class="stats_histo" style="width:30%">0</div></span>
  //         <b>4</b><span><div class="stats_histo" style="width:40%">0</div></span>
  //         <b>5</b><span><div class="stats_histo" style="width:60%">0</div></span>
  //         <b>6</b><span><div class="stats_histo" style="width:100%">0</div></span>
  //         <b>💀</b><span><div class="stats_histo" style="width:0%">0</div></span>
  //       </div>

  //       <div id="statsnext">
  //         <div><p>próxima palavra em</p>
  //           <b id="stats_time">-</b></div>
  //         <div><button tabindex="0" id="stats_share">compartilhe <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkFGQUZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTSAxOCAyIEMgMTYuMzU0OTkgMiAxNSAzLjM1NDk5MDQgMTUgNSBDIDE1IDUuMTkwOTUyOSAxNS4wMjE3OTEgNS4zNzcxMjI0IDE1LjA1NjY0MSA1LjU1ODU5MzggTCA3LjkyMTg3NSA5LjcyMDcwMzEgQyA3LjM5ODUzOTkgOS4yNzc4NTM5IDYuNzMyMDc3MSA5IDYgOSBDIDQuMzU0OTkwNCA5IDMgMTAuMzU0OTkgMyAxMiBDIDMgMTMuNjQ1MDEgNC4zNTQ5OTA0IDE1IDYgMTUgQyA2LjczMjA3NzEgMTUgNy4zOTg1Mzk5IDE0LjcyMjE0NiA3LjkyMTg3NSAxNC4yNzkyOTcgTCAxNS4wNTY2NDEgMTguNDM5NDUzIEMgMTUuMDIxNTU1IDE4LjYyMTUxNCAxNSAxOC44MDgzODYgMTUgMTkgQyAxNSAyMC42NDUwMSAxNi4zNTQ5OSAyMiAxOCAyMiBDIDE5LjY0NTAxIDIyIDIxIDIwLjY0NTAxIDIxIDE5IEMgMjEgMTcuMzU0OTkgMTkuNjQ1MDEgMTYgMTggMTYgQyAxNy4yNjc0OCAxNiAxNi42MDE1OTMgMTYuMjc5MzI4IDE2LjA3ODEyNSAxNi43MjI2NTYgTCA4Ljk0MzM1OTQgMTIuNTU4NTk0IEMgOC45NzgyMDk1IDEyLjM3NzEyMiA5IDEyLjE5MDk1MyA5IDEyIEMgOSAxMS44MDkwNDcgOC45NzgyMDk1IDExLjYyMjg3OCA4Ljk0MzM1OTQgMTEuNDQxNDA2IEwgMTYuMDc4MTI1IDcuMjc5Mjk2OSBDIDE2LjYwMTQ2IDcuNzIyMTQ2MSAxNy4yNjc5MjMgOCAxOCA4IEMgMTkuNjQ1MDEgOCAyMSA2LjY0NTAwOTYgMjEgNSBDIDIxIDMuMzU0OTkwNCAxOS42NDUwMSAyIDE4IDIgeiBNIDE4IDQgQyAxOC41NjQxMjkgNCAxOSA0LjQzNTg3MDYgMTkgNSBDIDE5IDUuNTY0MTI5NCAxOC41NjQxMjkgNiAxOCA2IEMgMTcuNDM1ODcxIDYgMTcgNS41NjQxMjk0IDE3IDUgQyAxNyA0LjQzNTg3MDYgMTcuNDM1ODcxIDQgMTggNCB6IE0gNiAxMSBDIDYuNTY0MTI5NCAxMSA3IDExLjQzNTg3MSA3IDEyIEMgNyAxMi41NjQxMjkgNi41NjQxMjk0IDEzIDYgMTMgQyA1LjQzNTg3MDYgMTMgNSAxMi41NjQxMjkgNSAxMiBDIDUgMTEuNDM1ODcxIDUuNDM1ODcwNiAxMSA2IDExIHogTSAxOCAxOCBDIDE4LjU2NDEyOSAxOCAxOSAxOC40MzU4NzEgMTkgMTkgQyAxOSAxOS41NjQxMjkgMTguNTY0MTI5IDIwIDE4IDIwIEMgMTcuNDM1ODcxIDIwIDE3IDE5LjU2NDEyOSAxNyAxOSBDIDE3IDE4LjQzNTg3MSAxNy40MzU4NzEgMTggMTggMTggeiIvPjwvc3ZnPgo="></button></div>
  //       </div>
  //       </div>
  //     </div>
  //     )
    
  // }

  return (
    <div className={styles.container}>

      <Head>
        <title>Termo</title>
        <meta name="description" content="Desevenlopado by PWARR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {rules}

      <header>
        <button tabIndex="0" aria-label="instruções" id="how">?</button>
        <h1 tabIndex="0">termo</h1>
      </header>  


      <div id="notify">
        {/* <div aria-live="assertive" tabIndex="0" id="msg"></div> */}
        <div aria-live="assertive" tabIndex="0" id="msg" >essa palavra não é válida</div>
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
