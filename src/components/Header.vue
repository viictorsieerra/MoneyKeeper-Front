<template>
    <header class="header">
        <div class="header__logo"><img src="../assets/images/LogoCinezar.png" alt="LogoCine"></div>
        <h1 class="header__title" onclick="window.location.href='../html/index.html'">CineZar</h1>

    </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Header',
});
</script>

<style lang="scss">
.header {
    background-color: $secondary-color
}
</style>