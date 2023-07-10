
const request = require('request')

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}   

function formatDate(airDate) {
  const date = new Date(airDate)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let dt = date.getDate()

  if (dt < 10) {
      dt = "0" + dt
  }
  if (month < 10) {
      month = "0" + month
  }

  const formattedAirDate = `${year}-${month}-${dt}`
  return formattedAirDate
}

// function getJeopardyQuestion() {
//     request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
//       if (err) { return console.log(err) }
  
//       let cleananswer = (body[0].answer).replace(/(<([^>]+)>)/gi, "")
  
//       const questionData = {
//         question : body[0].question,
//         answer : cleananswer.toLowerCase(),
//         category : body[0].category.title,
//         value : body[0].value,
//         catNum : body[0].category.id,
//         qID : body[0].id,
//         airDate : formatDate(body[0].airdate),
//       }
  
//       let categoryMessage = createCategoryMessage(questionData.category, questionData.value)
//       questionData["categoryMessage"] = categoryMessage
  
//       // console.log(categoryMessage)
//       // console.log("question: ", questionData.question)
//       // console.log("answer: ", questionData.answer)
//       // console.log("airdate: ", questionData.airDate)
  
//       // console.log("questionData: \n", questionData)
//       // return questionData
//     }).then(() => {
//       return questionData
//     })
// }
  
function getJeopardyQuestion() {
  return new Promise(function (resolve, reject) {
    request('http://jservice.io/api/random', { json: true }, (err, res, body) => {
      if (err) { return console.log(err) }
  
      let cleananswer = (body[0].answer).replace(/(<([^>]+)>)/gi, "")
  
      const questionData = {
        question : body[0].question,
        answer : cleananswer.toLowerCase(),
        category : body[0].category.title,
        value : body[0].value,
        catNum : body[0].category.id,
        qID : body[0].id,
        airDate : formatDate(body[0].airdate),
      }
  
      let categoryMessage = createCategoryMessage(questionData.category, questionData.value)
      questionData["categoryMessage"] = categoryMessage
  
      // console.log(categoryMessage)
      // console.log("question: ", questionData.question)
      // console.log("answer: ", questionData.answer)
      // console.log("airdate: ", questionData.airDate)
  
      // console.log("questionData: \n", questionData)
      resolve (questionData)
      // return questionData
    })
  })
}

function createCategoryMessage(category, value) {
  let categoryMessage = `Category is '${category}'`

  if (value != null) {
    categoryMessage += ` for $${value}`
  }

  return categoryMessage
}


module.exports = { 
  titleCase,
  getJeopardyQuestion,
  createCategoryMessage
 }
