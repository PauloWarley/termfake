import { createClient } from '@supabase/supabase-js'


export default function database(req, res){

    var axios = require('axios');

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
      console.log(JSON.stringify(response.data));
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  
}
 