<template>
  <header>
    <h1>TODO-BOARD</h1>
  </header>

  <main class="board-columns">
    <section class="board-column">
      <h2>todo</h2>
      <ul id="todoColumn">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </section>
    <section>
      <h2>done</h2>
      <ul id="doneColumn">
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
      </ul>
    </section>
  </main>
</template>

<script>

</script>

<style scoped>
.board-columns {
  display: flex;
  gap: 50px;
  border: 1px solid red;
  border-radius: 5px;
}

.board-column {
  border: 1px solid grey;
  border-radius: 5px;
}
</style>