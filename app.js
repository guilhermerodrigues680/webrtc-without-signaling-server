let channel = null

const connection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })

connection.ondatachannel = event => {
  console.log('ondatachannel')
  channel = event.channel
  // channel.onopen = event => console.log('onopen', event);
  // channel.onmessage = event => console.log('onmessage', event);
  channel.onmessage = event => alert(event.data)
}

connection.onconnectionstatechange = event => document.getElementById("connectionState").innerText = connection.connectionState // console.log('onconnectionstatechange', connection.connectionState)
connection.oniceconnectionstatechange = event => document.getElementById("iceConnectionState").innerText = connection.iceConnectionState // console.log('oniceconnectionstatechange', connection.iceConnectionState)

async function step_1_initiator_create_offer() {
  channel = connection.createDataChannel('data')
  // channel.onopen = event => console.log('onopen', event)
  // channel.onmessage = event => console.log('onmessage', event)
  channel.onmessage = event => alert(event.data)

  connection.onicecandidate = event => {
    // console.log('onicecandidate', event)
    if (!event.candidate) {
      document.getElementById("createdOffer").value = JSON.stringify(connection.localDescription)
      document.getElementById("createdOffer").hidden = false
    }
  }

  const offer = await connection.createOffer()
  await connection.setLocalDescription(offer)
}

async function step_2_accept_remote_offer() {
  const offer = JSON.parse(document.getElementById("remoteOffer").value)
  await connection.setRemoteDescription(offer)
}

async function step_3_create_answer() {
  connection.onicecandidate = event => {
    // console.log('onicecandidate', event)
    if (!event.candidate) {
      document.getElementById("createdAnswer").value = JSON.stringify(connection.localDescription)
      document.getElementById("createdAnswer").hidden = false
    }
  }

  const answer = await connection.createAnswer()
  await connection.setLocalDescription(answer)
}

async function step_4_accept_answer() {
  const answer = JSON.parse(document.getElementById("remoteAnswer").value)
  await connection.setRemoteDescription(answer)
}

async function send_text() {
  const text = document.getElementById("text").value

  channel.send(text)
}
