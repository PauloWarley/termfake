const correct_word = "asnol"

export default function handler(req, res) {
  
  console.log(req.body)

  var word = req.body.word

  var correct_word_split = correct_word.split("")

  var word_slipt = word.split("")

  var result = {}

  for (var i in word_slipt){

    console.log(word_slipt[i] , correct_word_split[i])

    if (correct_word.indexOf(word_slipt[i]) == -1){
      if (result[word_slipt[i]] === undefined) result[word_slipt[i]] = [];

      result[word_slipt[i]].push(
        { 
          "exist": false,
          "position": false,
          "pos" : i
        }
      )
    }
    else if (word_slipt[i] === correct_word_split[i]){
      
      if (result[word_slipt[i]] === undefined) result[word_slipt[i]] = [];

      result[word_slipt[i]].push(
        { 
          "exist": true,
          "position": true,
          "pos" : i
        }
      )

    }
    else if (correct_word.indexOf(word_slipt[i]) != -1){
      
      if (result[word_slipt[i]] === undefined) result[word_slipt[i]] = [];

      result[word_slipt[i]].push(
        { 
          "exist": true,
          "position": false,
          "pos" : i
        }
      )

    }


  }


  res.status(200).json(result)



}
