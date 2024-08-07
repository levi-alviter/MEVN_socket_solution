<template>
  <form>
    <fieldset>
      <legend>Generic Form, Status: {{ connected }}</legend>
      <div class="input">
        <label for="name">Name:</label>
        <input id="name" type="text" :disabled="disabled" />
      </div>
      <div class="input">
        <label for="surname">Surname:</label>
        <input id="surname" type="text" :disabled="disabled" />
      </div>
      <div class="input">
        <label for="surname">Phone Number:</label>
        <input id="surname" type="text" :disabled="disabled" />
      </div>
      <button type="submit" :disabled="disabled">Submit</button>
    </fieldset>
  </form>
  <router-link to="/">Go back</router-link>
</template>

<script>
import { socket, state } from "@/shared/socket";

export default {
  name: "CustomForm",
  computed: {
    connected() {
      return state.connected ? "Online" : "Offline";
    },
    disabled() {
      console.log("Disabled: ", state.eventBlocked);
      return state.eventBlocked;
    },
  },
  mounted() {
    socket.connect();
  },
  unmounted() {
    socket.disconnect();
  },
};
</script>

<style scoped>
.input {
  display: flex;
  margin: 1rem;
}
</style>
