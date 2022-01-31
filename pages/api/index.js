import axios from "axios";

var fs = require('fs');


const correct_word_list = 
[
  "sagaz",
  "negro",
  "âmago",
  "êxito",
  "mexer",
  "termo",
  "senso",
  "nobre",
  "algoz",
  "afeto",
  "plena",
  "ética",
  "mútua",
  "sutil",
  "tênue",
  "vigor",
  "aquém",
  "audaz",
  "porém",
  "fazer",
  "sanar",
  "inato",
  "seção",
  "cerne",
  "assim",
  "desde",
  "ideia",
  "fosse",
  "moral",
  "poder",
  "torpe",
  "honra",
  "muito",
  "justo",
  "anexo",
  "fútil",
  "gozar",
  "razão",
  "quiçá",
  "ícone",
  "etnia",
  "sobre",
  "tange",
  "égide",
  "lapso",
  "mútuo",
  "sonho",
  "expor",
  "haver",
  "hábil",
  "casal",
  "amigo",
  "posse",
  "pesar",
  "ávido",
  "tempo",
  "ardil",
  "corja",
  "coser",
  "boçal",
  "então",
  "genro",
  "seara",
  "dengo",
  "detém",
  "prole",
  "causa",
  "dizer",
  "digno",
  "tenaz",
  "dever",
  "crivo",
  "óbice",
  "ânsia",
  "ápice",
  "saber",
  "brado",
  "gleba",
  "ceder",
  "porra",
  "ânimo",
  "pária",
  "assaz",
  "atroz",
  "comum",
  "culto",
  "graça",
  "temor",
  "sendo",
  "orgia",
  "censo",
  "mundo",
  "denso",
  "pauta",
  "fugaz",
  "cozer",
  "valha",
  "neném",
  "ainda",
  "vício",
  "revés",
  "forte",
  "vulgo",
  "pudor",
  "estar",
  "regra",
  "dogma",
  "louco",
  "banal",
  "criar",
  "pífio",
  "tenro",
  "impor",
  "desse",
  "apraz",
  "reaça",
  "jeito",
  "ordem",
  "atrás",
  "pedir",
  "clava",
  "round",
  "saúde",
  "viril",
  "usura",
  "manso",
  "mercê",
  "juízo",
  "sábio",
  "ontem",
  "prosa",
  "servo",
  "afago",
  "presa",
  "feliz",
  "fluir",
  "ébrio",
  "falar",
  "coisa",
  "cunho",
  "forma",
  "devir",
  "vendo",
  "sério",
  "meiga",
  "homem",
  "platô",
  "guisa",
  "pleno",
  "temer",
  "visar",
  "bruma",
  "cisma",
  "mesmo",
  "mágoa",
  "limbo",
  "acaso",
  "puder",
  "gerar",
  "êxodo",
  "óbvio",
  "herói",
  "obter",
  "afins",
  "xibiu",
  "ímpio",
  "valor",
  "matiz",
  "lugar",
  "praxe",
  "crise",
  "senil",
  "havia",
  "vênia",
  "fluxo",
  "enfim",
  "certo",
  "álibi",
  "ritmo",
  "tédio",
  "garbo",
  "reter",
  "pulha",
  "tomar",
  "parvo",
  "grato",
  "vital",
  "união",
  "posso",
  "valia",
  "visão",
  "vivaz",
  "favor",
  "laico",
  "bravo",
  "parco",
  "abrir",
  "todos",
  "prumo",
  "ameno",
  "fácil",
  "gênio",
  "reles",
  "óbito",
  "possa",
  "prime",
  "olhar",
  "falso",
  "levar",
  "anelo",
  "tecer",
  "tesão",
  "selar",
  "fator",
  "burro",
  "citar",
  "adiar",
  "rogar",
  "façam",
  "farsa",
  "casta",
  "coeso",
  "achar",
  "cisão",
  "ranço",
  "épico",
  "noção",
  "cabal",
  "legal",
  "sinto",
  "morte",
  "imune",
  "exato",
  "sábia",
  "nicho",
  "falta",
  "fardo",
  "ativo",
  "gente",
  "amplo",
  "lavra",
  "haste",
  "força",
  "ouvir",
  "gesto",
  "labor",
  "viver",
  "dúbio",
  "revel",
  "brega",
  "deter",
  "cesta",
  "sulco",
  "sonso",
  "árduo",
  "sesta",
  "leigo",
  "tendo",
  "passo",
  "único",
  "feixe",
  "atuar",
  "vemos",
  "ótica",
  "ciúme",
  "toada",
  "calma",
  "igual",
  "vadia",
  "débil",
  "humor",
  "ideal",
  "tende",
  "sonsa",
  "vácuo",
  "rever",
  "hiato",
  "ponto",
  "pobre",
  "ambos",
  "fusão",
  "terno",
  "claro",
  "probo",
  "remir",
  "cauda",
  "varão",
  "velho",
  "outro",
  "leito",
  "advém",
  "doido",
  "senão",
  "horda",
  "marco",
  "jovem",
  "inata",
  "xeque",
  "capaz",
  "relva",
  "carma",
  "tenra",
  "fonte",
  "linda",
  "algum",
  "caçar",
  "anuir",
  "ajuda",
  "ficar",
  "apoio",
  "velar",
  "dorso",
  "vimos",
  "rigor",
  "noite",
  "farão",
  "série",
  "verso",
  "botar",
  "tanto",
  "vazio",
  "morar",
  "prece",
  "cruel",
  "ambas",
  "moção",
  "peste",
  "líder",
  "casto",
  "vírus",
  "massa",
  "frase",
  "entre",
  "covil",
  "terra",
  "pouco",
  "fauna",
  "faina",
  "coesa",
  "coçar",
  "furor",
  "preso",
  "credo",
  "signo",
  "dócil",
  "sente",
  "vetor",
  "lazer",
  "feito",
  "árido",
  "aceso",
  "minha",
  "ciclo",
  "flora",
  "raiva",
  "ímpar",
  "maior",
  "beata",
  "vulto",
  "chata",
  "birra",
  "torço",
  "brisa",
  "breve",
  "vasto",
  "houve",
  "liame",
  "trama",
  "setor",
  "adeus",
  "pegar",
  "papel",
  "salvo",
  "corno",
  "ardor",
  "senda",
  "manha",
  "seita",
  "banzo",
  "morro",
  "pecha",
  "reger",
  "prado",
  "átomo",
  "visse",
  "antro",
  "avaro",
  "blasé",
  "segue",
  "livro",
  "anciã",
  "nossa",
  "ocaso",
  "plano",
  "comer",
  "peixe",
  "áureo",
  "ótimo",
  "saída",
  "rezar",
  "acima",
  "aliás",
  "chulo",
  "prono",
  "saiba",
  "junto",
  "meses",
  "fitar",
  "nunca",
  "jazia",
  "sorte",
  "opção",
  "fruir",
  "parar",
  "serão",
  "mudar",
  "puxar",
  "pajem",
  "bando",
  "chuva",
  "sinal",
  "treta",
  "fugir",
  "motim",
  "gerir",
  "prazo",
  "alude",
  "nação",
  "leite",
  "foder",
  "tosco",
  "sinhá",
  "séria",
  "norma",
  "época",
  "andar",
  "brava",
  "carro",
  "grupo",
  "arcar",
  "exame",
  "tenso",
  "avião",
  "rapaz",
  "venal",
  "soldo",
  "ídolo",
  "lenda",
  "virão",
  "tirar",
  "exijo",
  "quota",
  "parte",
  "reino",
  "praga",
  "sumir",
  "malta",
  "campo",
  "pompa",
  "aonde",
  "traga",
  "logro",
  "fixar",
  "preto",
  "vilão",
  "voraz",
  "anais",
  "corpo",
  "solto",
  "quase",
  "turva",
  "nódoa",
  "cópia",
  "antes",
  "cheio",
  "certa",
  "oásis",
  "parva",
  "turba",
  "agora",
  "alado",
  "apego",
  "messe",
  "grave",
  "índio",
  "filho",
  "risco",
  "doído",
  "caixa",
  "verve",
  "estão",
  "prova",
  "apelo",
  "perda",
  "praia",
  "pardo",
  "acesa",
  "nível",
  "fenda",
  "trupe",
  "retém",
  "ligar",
  "viria",
  "átrio",
  "tocar",
  "lindo",
  "sabia",
  "dessa",
  "texto",
  "ficha",
  "navio",
  "psico",
  "opaco",
  "alçar",
  "verba",
  "supra",
  "coito",
  "ético",
  "astro",
  "livre",
  "áurea",
  "cioso",
  "faixa",
  "afora",
  "elite",
  "fraco",
  "glosa",
  "parca",
  "autor",
  "lidar",
  "conta",
  "grata",
  "firme",
  "mente",
  "calda",
  "privê",
  "bater",
  "tinha",
  "cousa",
  "fatal",
  "fatos",
  "reses",
  "junco",
  "turvo",
  "molho",
  "verbo",
  "magia",
  "torso",
  "irmão",
  "macio",
  "douto",
  "jirau",
  "ígneo",
  "oxalá",
  "supor",
  "abriu",
  "deixa",
  "pagão",
  "asilo",
  "atual",
  "rouca",
  "salve",
  "órfão",
  "bicho",
  "light",
  "posto",
  "pique",
  "festa",
  "caber",
  "extra",
  "curso",
  "ruína",
  "paira",
  "locus",
  "besta",
  "pisar",
  "zelar",
  "finda",
  "ereto",
  "sexta",
  "vezes",
  "desta",
  "judeu",
  "abuso",
  "rádio",
  "feudo",
  "bioma",
  "vídeo",
  "combo",
  "tetra",
  "agudo",
  "manhã",
  "facto",
  "culpa",
  "baixo",
  "menos",
  "vinha",
  "urgia",
  "porta",
  "cútis",
  "surja",
  "sarça",
  "advir",
  "meigo",
  "vosso",
  "estio",
  "traço",
  "longe",
  "bônus",
  "tento",
  "autos",
  "cocho",
  "sítio",
  "museu",
  "facho",
  "pilar",
  "clean",
  "suave",
  "rumor",
  "lasso",
  "drops",
  "geral",
  "penta",
  "acolá",
  "optar",
  "gosto",
  "medir",
  "amena",
  "boato",
  "pífia",
  "ações",
  "turma",
  "rubro",
  "calão",
  "crime",
  "chama",
  "letal",
  "mosto",
  "cover",
  "ponha",
  "pacto",
  "louça",
  "cacho",
  "pódio",
  "lápis",
  "folga",
  "vetar",
  "aroma",
  "hoste",
  "finjo",
  "vigia",
  "local",
  "pasmo",
  "fazia",
  "cânon",
  "açude",
  "axila",
  "refém",
  "feroz",
  "drama",
  "rival",
  "troça",
  "brabo",
  "hobby",
  "móvel",
  "mesma",
  "monte",
  "ecoar",
  "lesse",
  "nosso",
  "poema",
  "golpe",
  "metiê",
  "riste",
  "plebe",
  "súcia",
  "peito",
  "fórum",
  "daqui",
  "ávida",
  "lição",
  "forem",
  "monge",
  "teste",
  "clima",
  "páreo",
  "coral",
  "viram",
  "aluno",
  "escol",
  "ébano",
  "carta",
  "légua",
  "sarau",
  "falha",
  "macro",
  "venha",
  "farta",
  "poeta",
  "cargo",
  "briga",
  "átimo",
  "plaga",
  "fruto",
  "tacha",
  "perco",
  "cetro",
  "passa",
  "chato",
  "conto",
  "ateia",
  "idoso",
  "calmo",
  "virar",
  "plumo",
  "assar",
  "busca",
  "vento",
  "estro",
  "arado",
  "roupa",
  "tribo",
  "chefe",
  "recém",
  "piada",
  "tarde",
  "ímpia",
  "catre",
  "grama",
  "surto",
  "seixo",
  "aviso",
  "traje",
  "swing",
  "ornar",
  "bruta",
  "verde",
  "civil",
  "deste",
  "deram",
  "arfar",
  "vedar",
  "depor",
  "fosso",
  "trato",
  "broxa",
  "irado",
  "pasma",
  "saldo",
  "tição",
  "nuvem",
  "grota",
  "beijo",
  "troca",
  "canso",
  "porte",
  "âmbar",
  "cifra",
  "silvo",
  "úteis",
  "pedra",
  "régio",
  "bazar",
  "segar",
  "gabar",
  "vazão",
  "pavor",
  "laudo",
  "amado",
  "bucho",
  "troco",
  "tiver",
  "casar",
  "bruto",
  "tutor",
  "gíria",
  "sósia",
  "perto",
  "molde",
  "vagar",
  "lesto",
  "magna",
  "rural",
  "bença",
  "mídia",
  "minar",
  "nesse",
  "tchau",
  "odiar",
  "meche",
  "vadio",
  "corso",
  "sótão",
  "fossa",
  "itens",
  "clero",
  "jejum",
  "renda",
  "única",
  "inter",
  "ileso",
  "viado",
  "aviar",
  "mangá",
  "berro",
  "manga",
  "negar",
  "largo",
  "feita",
  "paiol",
  "cinto",
  "pomar",
  "cenho",
  "pugna",
  "lesão",
  "horto",
  "pinho",
  "canto",
  "visto",
  "podar",
  "rocha",
  "ruído",
  "areia",
  "invés",
  "urdir",
  "órgão",
  "cível",
  "ufano",
  "proto",
  "bolsa",
  "marca",
  "frota",
  "mocho",
  "amiga",
  "dúbia",
  "vista",
  "canil",
  "piche",
  "vasta",
  "úmido",
  "peita",
  "penso",
  "densa",
  "bulir",
  "júlia",
  "culta",
  "morfo",
  "jogar",
  "esgar",
  "guria",
  "fazes",
  "resto",
  "artur",
  "xucro",
  "apear",
  "cheia",
  "úbere",
  "linha",
  "mamãe",
  "findo",
  "misto",
  "demão",
  "narco",
  "monta",
  "natal",
  "chula",
  "varoa",
  "campa",
  "manto",
  "close",
  "barão",
  "gemer",
  "stand",
  "fundo",
  "bunda",
  "amada",
  "chaga",
  "mover",
  "ágape",
  "símio",
  "venho",
  "jazer",
  "retro",
  "punha",
  "nessa",
  "álbum",
  "preço",
  "ardis",
  "sigla",
  "calça",
  "seiva",
  "tenha",
  "sabor",
  "folia",
  "firma",
  "cosmo",
  "tumba",
  "álamo",
  "matar",
  "cerca",
  "porca",
  "lábia",
  "banto",
  "rente",
  "salva",
  "louro",
  "míope",
  "sinta",
  "ceita",
  "torna",
  "coevo",
  "pólis",
  "ferpa",
  "arroz",
  "barro",
  "axial",
  "solta",
  "enjoo",
  "redor",
  "ousar",
  "verão",
  "zumbi",
  "fugiu",
  "lousa",
  "obtém",
  "bolso",
  "corar",
  "velha",
  "etapa",
  "áudio",
  "trago",
  "lutar",
  "cacto",
  "volta",
  "limpo",
  "queda",
  "mimar",
  "penca",
  "final",
  "fátuo",
  "reler",
  "vário",
  "quite",
  "santo",
  "nesta",
  "baixa",
  "farol",
  "veloz",
  "letra",
  "troço",
  "longo",
  "nácar",
  "vazia",
  "mania",
  "sugar",
  "farto",
  "neste",
  "staff",
  "refil",
  "folha",
  "burra",
  "forro",
  "puído",
  "bedel",
  "repor",
  "viger",
  "ultra",
  "coroa",
  "justa",
  "macho",
  "lucro",
  "dança",
  "subir",
  "passe",
  "urgir",
  "sadio",
  "custo",
  "hífen",
  "mouro",
  "gueto",
  "mimos",
  "sexto",
  "usual",
  "valer",
  "chave",
  "sócio",
  "harém",
  "lento",
  "lábil",
  "desça",
  "versa",
  "anzol",
  "abade",
  "rédea",
  "calvo",
  "árdua",
  "aéreo",
  "pavio",
  "ceifa"
]

export default function handler(req, res) {
  

  var correct_word
  var word = req.body.word


  try {
    console.log("1")
    // correct_word = fs.readFileSync('word.txt', 'utf8')
    console.log("2")
  }
  catch{
      console.log("3")
      // fs.writeFile('word.txt', correct_word_list[Math.floor(Math.random() * correct_word_list.length)].normalize('NFD').replace(/[\u0300-\u036f]/g, ""), function (err) {
      //   if (err) throw err;
      //   console.log('Saved!');
      // });
      console.log("4")

      // correct_word = fs.readFileSync('word.txt', 'utf8')

      // fs.readFile("word.txt", "utf-8", (err, data) => {
      //   console.log(data);
      //   console.log("CorrectWord", data)
      //   res.status(200).json(data)
      // });

      console.log("4 - 1")
    
  }

  if(word === correct_word){
    // fs.writeFile('word.txt', correct_word_list[Math.floor(Math.random() * correct_word_list.length)].normalize('NFD').replace(/[\u0300-\u036f]/g, ""), function (err) {
    //   if (err) throw err;
    //   console.log('Saved!');
    // });
  }

  console.log("5")

  correct_word =  correct_word_list[Math.floor(Math.random() * correct_word_list.length)].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  // correct_word =  correct_word_list[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  correct_word =  "habil"
  
  

  // console.log("CorrectWord", correct_word)


  

  console.log(req.body)

  

  var config = {
    method: 'get',
    url: `https://api.dicionario-aberto.net/word/${word}`,
    headers: { }
  };
  
  axios (config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));

    
    if (word === correct_word || response.data.length != 0){

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
    else {

      // console.log(response.data)

      res.status(200).json("Palavra Inválida")

    }


  })
  .catch(function (error) {
    // console.log(error);
  });


  

}
