// Utility component for managing usable item highlighting

export function getUsableItemsForPage(currentPage, choices) {
  const usableItems = [];
  
  choices?.forEach(choice => {
    if (choice.usableItem) {
      usableItems.push({
        itemId: choice.usableItem,
        choiceText: choice.text
      });
    }
  });
  
  return usableItems;
}

export function isItemUsableOnPage(itemId, currentPage, choices) {
  return choices?.some(choice => choice.usableItem === itemId);
}

export function getChoiceWithUsableItem(choice, inventory) {
  if (!choice.usableItem) return null;
  
  const item = inventory.find(item => item.id === choice.usableItem);
  return item;
}

export function formatChoiceTextWithItem(choiceText, itemName) {
  return `${choiceText} [ Use the ${itemName} ]`;
}
