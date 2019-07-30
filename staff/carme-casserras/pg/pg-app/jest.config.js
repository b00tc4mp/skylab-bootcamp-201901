module.exports = {
    testEnvironment: 'node'
  };


const listeners = window._virtualConsole.listeners("jsdomError");
const originalListener = listeners && listeners[0];

window._virtualConsole.removeAllListeners("jsdomError");

window._virtualConsole.addListener("jsdomError", (error) => {
  if (error.type !== "not implemented" && originalListener) {
    originalListener(error);
  }
  // swallow
});