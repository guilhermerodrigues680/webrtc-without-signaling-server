const events = new EventTarget();
const EVENT_TYPES = {
  message: 'message',
  channelStarted: 'channel-started'
}

function dispatchEvent(eventType, data) {
  events.dispatchEvent(new CustomEvent(eventType, { detail: data }));
}

///

let channelG;

const connection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

console.debug(connection);

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
    dispatchEvent(EVENT_TYPES.message, event);
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

function step_1_initiator_create_offer() {
  return new Promise(async resolve => {
    console.debug('step_1_initiator_create_offer');

    const channel = connection.createDataChannel('data');
    channelG = channel;
    console.debug('chanel step1', channel);

    channel.onopen = (event) => {
      console.log('onopen', event);
    };

    channel.onmessage = (event) => {
      console.log('onmessage', event);
      dispatchEvent(EVENT_TYPES.message, event);
      //alert(event.data);
    }

    connection.onicecandidate = event => {
      console.log('onicecandidate', event);

      if (!event.candidate) {
        console.info("!event.candidate:", connection.localDescription);
        //setOutputOfferText(JSON.stringify(connection.localDescription));
        resolve(connection.localDescription);
      }
    }

    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
  });
}

async function step_2_accept_remote_offer(offer) {
  console.debug('step_2_accept_remote_offer');

  //const offer = JSON.parse(getInputOfferText());
  await connection.setRemoteDescription(offer);
}

function step_3_create_answer() {
  return new Promise(async resolve => {
    console.debug('step_3_create_answer');

    connection.onicecandidate = event => {
      console.log('onicecandidate', event);

      if (!event.candidate) {
        console.info("!event.candidate:", connection.localDescription);
        //setOutputAnswerText(JSON.stringify(connection.localDescription));
        resolve(connection.localDescription);
      }
    }

    const answer = await connection.createAnswer()
    await connection.setLocalDescription(answer)
  });
}

async function step_4_accept_answer(answer) {
  //const answer = JSON.parse(getInputAnswerText());
  await connection.setRemoteDescription(answer);
}

function send_text(text) {
  // const text = getChatMsg();
  // addMsgInChatHistory(text);
  channelG.send(text)
}

export {
  step_1_initiator_create_offer,
  step_2_accept_remote_offer,
  step_3_create_answer,
  step_4_accept_answer,
  send_text,
  events,
  EVENT_TYPES
}
