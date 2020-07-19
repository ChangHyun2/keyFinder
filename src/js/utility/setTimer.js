const setTimer = (duration) =>
  new Promise((res, rej) => setTimeout(() => res(), duration));
export default setTimer;
