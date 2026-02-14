export const handleKeyBindings = (event, keyActions = {}) => {
  const activeElement = document.activeElement;

  // Check if the active element is a text input type (exclude inputs and textareas from key bindings)
  const isInputField =
    activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA";

  Object.entries(keyActions).forEach(([key, action]) => {
    if (event.key.toLowerCase() === key.toLowerCase()) {
      if (action.runInInputFields == true && !event.shiftKey) {
        // bypass the check isInputField, the action can run even in an input field
        event.preventDefault();
        action.action(event);
      } else {
        if (!isInputField) {
          // check if isInputField, the action can run only outside input fields
          event.preventDefault();
          action.action(event);
        }
      }
    }
  });
};
