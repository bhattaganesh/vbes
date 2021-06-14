import { EmojiButton } from '@joeattardi/emoji-button';

const picker = new EmojiButton();
const trigger = document.querySelector('.emoji-trigger');

picker.on('emoji', selection => {
  document.querySelector('#userText').value += selection.emoji;
});

trigger.addEventListener('click', () => picker.togglePicker(trigger));
/* window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.emoji-trigger');
    const picker = new EmojiButton();

    picker.on('emoji', emoji => {
      document.querySelector('#userText').value += emoji;
    });

    button.addEventListener('click', () => {
      picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
    });
  });

 */
