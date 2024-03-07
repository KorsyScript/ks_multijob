<script setup>
import api from "./api"
import { ref, onMounted, onUnmounted } from "vue"
import { useJobsStore } from './store/jobs'
import router from './router'
import "@/assets/styles/main.css"
import "@/assets/typo/typo.css"

const jobsStore = useJobsStore()

const devmode = ref(false)
const visible = ref(false)

const isVisible = () => {
  visible.value = false
  jobsStore.resetStore()
}

onMounted(() => {
  window.addEventListener("message", onMessage)
})

onUnmounted(() => {
  window.removeEventListener("message", onMessage)
})

const onMessage = (event) => {
  switch (event.data.type) {
    case "board":
      visible.value = event.data.visible
      jobsStore.setBoardJobs(event.data.jobList)
      jobsStore.setMyJobs(event.data.myJobs)
      jobsStore.setMaxJobsCount(event.data.maxJobsCount)

      router.push({ name: 'board' }).catch(err => {
        console.error('error:', err);
      });

      api.post("updatestate", {
        state: visible.value,
      }).catch((e) => {
        console.log(e.message)
      });
      break;

    case "menu":
      visible.value = event.data.visible
      jobsStore.setMyJobs(event.data.myJobs)
      jobsStore.setMaxJobsCount(event.data.maxJobsCount)

      router.push({ name: 'menu' }).catch(err => {
        console.error('error:', err);
      });

      api.post("updatestate", {
        state: visible.value,
      }).catch((e) => {
        console.log(e.message)
      });
      break;

    default:
      break;
  }
};
</script>

<template>
  <div v-if="visible || devmode">
    <router-view  @closeApp="isVisible" />
  </div>
</template>
