import { reactive } from "vue";
import { io } from "socket.io-client";
import randomName from "./randomName";

const URL = "http://localhost:3000";
const fakeId = Math.random();
const name = randomName();

export const state = reactive({
  connected: false,
  eventBlocked: false,
});

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;

  socket.emit(
    "askForBlocking",
    JSON.stringify({
      id: fakeId,
      name: name,
    }),
    () => {
      console.log("Event blocked");
    }
  );
});

socket.on("eventBlocked", (user) => {
  console.log("User: ", user, " Me: ", fakeId);
  const userData = JSON.parse(user);
  if (userData.id === fakeId) {
    state.eventBlocked = false;
  } else {
    state.eventBlocked = true;
  }
});

socket.on("disconnect", () => {
  state.connected = false;
});
