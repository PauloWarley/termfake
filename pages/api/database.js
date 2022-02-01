import { createClient } from '@supabase/supabase-js'
var axios = require('axios');


export default function database(req, res){


    // console.log({ 
    //     'apikey': process.env.API_KEY_SUPABASE.replace(/"/g, "").replace(/,/g, ""), 
    //     'Authorization': process.env.AUTH_SUPABASE
    //   })

    var headers = { 
        'apikey': process.env.API_KEY_SUPABASE.replace(/"/g, "").replace(/,/g, ""), 
        'Authorization': process.env.AUTH_SUPABASE
      }

    var config = {
      method: 'get',
      url: 'https://zuwedejvszpmvxppccvp.supabase.co/rest/v1/word?select=word',
      headers: headers
    };
    
    axios(config)
    .then(function (response) {
        console.log("Gravado ", JSON.stringify(response.data[0]["word"]));

        var data = { 
            word: "11" 
        }

        var config = {
        method: 'patch',
        url: `https://zuwedejvszpmvxppccvp.supabase.co/rest/v1/word?word=eq.${response.data[0]["word"]}`,
        headers: headers,
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.status(200).json(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });

    })
    .catch(function (error) {
      console.log(error);
    });
    
  
}
 