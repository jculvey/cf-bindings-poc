<script setup>
  const { data } = await useFetch("/api/test");

</script>

<template>
  <div>
    <h1>The data from <code>api/test</code> is:</h1>
    <h2>{{ data }}</h2>
  </div>
</template>
