const correct_word = "asnos"

export default function handler(req, res) {
  
  console.log(req.body)

  var word = req.body.word

  var correct_word_split = correct_word.split("")

  var word_slipt = word.split("")

  var result = {}

  for (var i in word_slipt){

    for (var j in correct_word_split){


      if (correct_word.indexOf(word_slipt[i]) != -1){

        console.log(word_slipt[i], correct_word_split[j])
        if (word_slipt[i] === correct_word_split[j]){

          

          if(result[word_slipt[i]] === undefined) result[word_slipt[i]]=[];
          
          var obj = {}
          obj[i] = {
                  
            "exist": true,
            "position": true

          }

          for (var k in result[word_slipt[i]]){

            // console.log(result[word_slipt[i]][k])

            if (result[word_slipt[i]][k] === obj){

              console.log(k)
              // result[word_slipt[i]].splice(k, 1)

            }

          }

          result[word_slipt[i]].push(obj)


        }
        else{

          if(result[word_slipt[i]] === undefined) result[word_slipt[i]]=[];

          // var obj = {}
          // obj[i] = {
                  
          //   "exist": true,
          //   "position": false

          // }
          // result[word_slipt[i]].push(obj)

        }
      }
    }
  }


  res.status(200).json(result)



}
