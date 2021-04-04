<template>
  <div>
    <h2>Iniciador</h2>

    <button @click="initiatorCreateOffer">Criar oferta</button>
    <textarea cols="60" rows="5" v-model="outputOffer"></textarea>

    <h3>Iniciador - Aceitar Resposta</h3>

    <textarea v-model="inputAnswer" cols="30" rows="10"></textarea>
    <button @click="acceptAnswer">Aceita Resposta</button>

    <h2>chat</h2>
    <Chat @send-msg="sendMessage" :messageHistory="messageHistory" />
  </div>
</template>

<script>
import Chat from '../components/Chat.vue';
import { step_1_initiator_create_offer, step_4_accept_answer, send_text, events, EVENT_TYPES } from "../services/webrtc";

export default {
  name: "Initiator",

  components: {
    Chat
  },

  data: () => ({
    outputOffer: "",
    inputAnswer: "",
    messageHistory: []
  }),

  created () {
    events.addEventListener(EVENT_TYPES.message, (evt) => this.messageReceived(evt.detail.data));
  },

  methods: {
    initiatorCreateOffer: async function() {
      const connLocalDescription = await step_1_initiator_create_offer();
      this.outputOffer = JSON.stringify(connLocalDescription);
    },
    acceptAnswer: function() {
      step_4_accept_answer(JSON.parse(this.inputAnswer));
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
