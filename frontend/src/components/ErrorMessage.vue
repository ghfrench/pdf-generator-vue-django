<script setup lang="ts">
defineProps({ message: String });
</script>

<template>
	<span v-if="message" class="text-red-700 text-sm">{{ message }}</span>
</template>
