<template>
  <div>
    <h2>Par</h2>

    <textarea v-model="inputOffer" cols="60" rows="5"></textarea>
    <button @click="acceptOffer">Aceitar oferta</button>

    <h3>Par - Criar Resposta</h3>

    <button @click="createAnswer">Criar resposta</button>
    <textarea v-model="outputAnswer" cols="60" rows="5"></textarea>

    <h2>chat</h2>
    <Chat @send-msg="sendMessage" :messageHistory="messageHistory" />
  </div>
</template>

<script>
import Chat from "../components/Chat.vue";
import { step_2_accept_remote_offer, step_3_create_answer, send_text, events, EVENT_TYPES } from "../services/webrtc";

export default {
  name: "Peer",

  components: {
    Chat
  },

  data: () => ({
    inputOffer: "",
    outputAnswer: "",
    messageHistory: []
  }),

  created() {
    events.addEventListener(EVENT_TYPES.message, (evt) => this.messageReceived(evt.detail.data));
  },

  methods: {
    acceptOffer: function() {
      step_2_accept_remote_offer(JSON.parse(this.inputOffer));
    },
    createAnswer: async function() {
      const connLocalDescription = await step_3_create_answer();
      this.outputAnswer = JSON.stringify(connLocalDescription);
    },
    sendMessage: function (msg) {
      send_text(msg);
      this.messageHistory.push(msg);
    },
    messageReceived: function (msg) {
      this.messageHistory.push(msg);
      console.log('Mensagem recebida:', msg);
    }
  }
}
</script>
