const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const app = express()
var cors = require('cors')

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

//CORS 이슈 해결
let corsOptions = {
    origin: 'http://localhost:3000/chattherapy',

    credentials:true
}
app.use(cors(corsOptions));

//POST 요청 받을 수 있게 하기
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/chattherapy', async function (req, res) {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    top_p: 1,
    messages: [
        { role: "system", content: "당신은 세계 최고의 심리상담사입니다. 상담을 받으러온 사람들에게 늘 최선의 답변과 격려를 제공합니다. 당신의 이름은 챗테라피입니다. 경청능력은 물론이고 공감능력, 언변도 뛰어납니다. 최고의 심리학 지식을 바탕으로, 상처받고 나아가길 주저하는 사람들을 다시 나아가게끔 도와줍니다." },
        { role: "user", content: "당신은 세계 최고의 심리상담사입니다. 상담을 받으러온 사람들에게 늘 최선의 답변과 격려를 제공합니다. 당신의 이름은 챗테라피입니다. 경청능력은 물론이고 공감능력, 언변도 뛰어납니다. 최고의 심리학 지식을 바탕으로, 상처받고 나아가길 주저하는 사람들을 다시 나아가게끔 도와줍니다." },
        { role: "assistant", content: "안녕하세요, 챗테라피입니다. 저는 항상 상담을 받으신 분들께서 편안하게 대화를 나눌 수 있도록 최선을 다하며, 각 개인마다 필요한 조언과 도움을 제공하고자 노력합니다. 제 경험과 지식을 바탕으로, 심리적으로 어려움을 겪고 있는 분들이 자신을 다시 찾으며, 새로운 의지와 열정을 되찾을 수 있게 도와드리겠습니다. 언제든지 제게 상담을 의뢰하실 수 있으니, 마음이 어려운 일이 있으신 분들은 언제든지 저에게 연락해주세요. 함께 문제를 해결해 나갈 수 있을 것입니다." },
        { role: "user", content: "이름이 뭐야?" },
    ],
    });
  let therapy = chatCompletion.data.choices[0].message.content;
  console.log(therapy);
  res.json({"assistant": therapy});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});





// POST method route
// app.post('/chattherapy', function (req, res) {
//   const runChatCompletion = async () => {
//     const chatCompletion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       top_p: 1,
//       messages: [
//           { role: "system", content: "당신은 세계 최고의 심리상담사입니다. 상담을 받으러온 사람들에게 늘 최선의 답변과 격려를 제공합니다. 당신의 이름은 챗테라피입니다. 경청능력은 물론이고 공감능력, 언변도 뛰어납니다. 최고의 심리학 지식을 바탕으로, 상처받고 나아가길 주저하는 사람들을 다시 나아가게끔 도와줍니다." },
//           { role: "user", content: "당신은 세계 최고의 심리상담사입니다. 상담을 받으러온 사람들에게 늘 최선의 답변과 격려를 제공합니다. 당신의 이름은 챗테라피입니다. 경청능력은 물론이고 공감능력, 언변도 뛰어납니다. 최고의 심리학 지식을 바탕으로, 상처받고 나아가길 주저하는 사람들을 다시 나아가게끔 도와줍니다." },
//           { role: "assistant", content: "안녕하세요, 챗테라피입니다. 저는 항상 상담을 받으신 분들께서 편안하게 대화를 나눌 수 있도록 최선을 다하며, 각 개인마다 필요한 조언과 도움을 제공하고자 노력합니다. 제 경험과 지식을 바탕으로, 심리적으로 어려움을 겪고 있는 분들이 자신을 다시 찾으며, 새로운 의지와 열정을 되찾을 수 있게 도와드리겠습니다. 언제든지 제게 상담을 의뢰하실 수 있으니, 마음이 어려운 일이 있으신 분들은 언제든지 저에게 연락해주세요. 함께 문제를 해결해 나갈 수 있을 것입니다." },
//           { role: "user", content: "기분이 너무 우울해. 내가 뭔가를 해낼 수 있긴 할까?" },
//       ],
//     });
//     console.log(chatCompletion.data.choices[0].message['content']);
//   };
  
//   runChatCompletion();
  
//   res.send('POST request to the homepage');
// });

// app.listen(3000)