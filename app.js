let channelG;

const connection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

connection.ondatachannel = (event) => {
  console.log('ondatachannel', 'Data channel is created!')
  const { channel } = (event);
  channelG = channel;
  console.debug('chanel ondatachannel', channel);

  channel.onopen = (event) => {
    console.log('Data channel is open and ready to be used.');
    console.log('onopen', event)
  };

  channel.onmessage = (event) => {
    console.log('onmessage', event);
    //alert(event.data);
    addMsgInChatHistory(event.data);
  };
}

connection.onconnectionstatechange = (event) => {
  //document.getElementById("connectionState").innerText = connection.connectionState;
  console.log('onconnectionstatechange', connection.connectionState);
}

connection.oniceconnectionstatechange = (event) => {
  //document.getElementById("iceConnectionState").innerText = connection.iceConnectionState;
  console.log('oniceconnectionstatechange', connection.iceConnectionState);
}

/// Steps

async function step_1_initiator_create_offer() {
  console.debug('step_1_initiator_create_offer');

  const channel = connection.createDataChannel('data');
  channelG = channel;
  console.debug('chanel step1', channel);

  channel.onopen = (event) => {
    console.log('onopen', event);
  };

  channel.onmessage = (event) => {
    console.log('onmessage', event);
    //alert(event.data);
    addMsgInChatHistory(event.data);
  }

  connection.onicecandidate = event => {
    console.log('onicecandidate', event);

    if (!event.candidate) {
      console.info("!event.candidate:", connection.localDescription);
      setOutputOfferText(JSON.stringify(connection.localDescription));
    }
  }

  const offer = await connection.createOffer()
  await connection.setLocalDescription(offer)
}

async function step_2_accept_remote_offer() {
  console.debug('step_2_accept_remote_offer');

  const offer = JSON.parse(getInputOfferText());
  await connection.setRemoteDescription(offer);
}

async function step_3_create_answer() {
  console.debug('step_3_create_answer');

  connection.onicecandidate = event => {
    console.log('onicecandidate', event);

    if (!event.candidate) {
      console.info("!event.candidate:", connection.localDescription);
      setOutputAnswerText(JSON.stringify(connection.localDescription));
    }
  }

  const answer = await connection.createAnswer()
  await connection.setLocalDescription(answer)
}

async function step_4_accept_answer() {
  const answer = JSON.parse(getInputAnswerText());
  await connection.setRemoteDescription(answer);
}

function send_text() {
  const text = getChatMsg();
  addMsgInChatHistory(text);
  channelG.send(text)
}

// Util
function setOutputOfferText(text) {
  const outputOffer = document.querySelector('#output-offer');
  outputOffer.value = text;
}

function getInputOfferText() {
  const inputOffer = document.querySelector('#input-offer');
  return inputOffer.value;
}

function setOutputAnswerText(text) {
  const outputAnswer = document.querySelector('#output-answer');
  outputAnswer.value = text;
}

function getInputAnswerText() {
  const inputAnswer = document.querySelector('#input-answer');
  return inputAnswer.value;
}

function addMsgInChatHistory(msg) {
  const chatMsgHistory = document.querySelector('#chat-msg-history');
  const el = document.createElement('div');
  el.innerText = msg;
  chatMsgHistory.appendChild(el);
}

function getChatMsg() {
  const chatMsg = document.querySelector('#chat-msg');
  return chatMsg.value;
}

// Event Listener
const btnCreateOffer = document.querySelector('#btn-create-offer');
btnCreateOffer.addEventListener('click', () => step_1_initiator_create_offer());

const btnAcceptOffer = document.querySelector('#btn-accept-offer');
btnAcceptOffer.addEventListener('click', () => step_2_accept_remote_offer());

const btnCreateAnswer = document.querySelector('#btn-create-answer');
btnCreateAnswer.addEventListener('click', () => step_3_create_answer());

const btnAcceptAnswer = document.querySelector('#btn-accept-answer');
btnAcceptAnswer.addEventListener('click', () => step_4_accept_answer());

const btnSendChatMsg = document.querySelector('#btn-send-chat-msg');
btnSendChatMsg.addEventListener('click', () => send_text());
