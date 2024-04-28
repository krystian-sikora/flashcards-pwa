<script setup>

  function data() {
    return {
      easyFlashcards: [],
      mediumFlashcards: [],
      hardFlashcards: [],
      nextFlashcard: null,
      currentStreak: 0,
    };
  };
  function chooseRandomFlashcard(this: any, nextFlashcard: any) {
    const categoriesWeights = [1, 3, 5]; // Wagi dla easyFlashcards, mediumFlashcards, hardFlashcards
    const randomCategoryIndex = getRandomWeightedIndex(categoriesWeights);
    const randomCategory = this.flashcardCategories[randomCategoryIndex];
    if (randomCategory.length > 0) {
      const randomIndex = Math.floor(Math.random() * randomCategory.length);
      nextFlashcard = randomCategory[randomIndex];
      randomCategory.splice(randomIndex, 1);
    }
  };

  function getRandomWeightedIndex(weights) {
    let totalWeight = 0;
    for (const weight of weights) {
      totalWeight += weight;
    }

    const randomValue = Math.random() * totalWeight;
    let currentWeight = 0;
    for (let i = 0; i < weights.length; i++) {
      currentWeight += weights[i];
      if (randomValue < currentWeight) {
        return i;
      }
    }

    return weights.length - 1; // Domyślnie zwraca indeks ostatniej kategorii
  }
</script>

<template>



</template>