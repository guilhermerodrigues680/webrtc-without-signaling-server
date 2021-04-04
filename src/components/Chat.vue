<template>
  <div>
    <div>
        <div v-for="(msg, idx) of messageHistory" :key="idx">
          {{ msg }}
        </div>
    </div>
    <input type="text" v-model="message">
    <button @click="emitSendMsg">Enviar mensagem</button>
  </div>
</template>

<script>
export default {
  name: "Chat",

  props: {
    messageHistory: Array
  },

  data: () => ({
    message: ""
  }),

  methods: {
    emitSendMsg: function() {
      this.$emit('send-msg', this.message);
    }
  }
}
</script>
