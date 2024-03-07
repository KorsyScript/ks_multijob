<script setup>
import api from '@/api'
import JobCard from '@/components/JobCard'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useJobsStore } from '@/store/jobs'

const { t } = useI18n()
const emits = defineEmits(['closeApp'])
const jobsStore = useJobsStore()

const jobList = ref([])

const closeApp = () => {
  emits('closeApp', false)

  api.post("updatestate", {
    state: false
  }).catch(e => {
    console.log(e.message)
  })
}

onMounted(() => {
  jobList.value = jobsStore.getBoardJobs()
});
</script>

<template>
  <div id="content" class="relative left-0 right-0 mt-13-vh mx-auto">
    <div class="background  my-auto p-8 xl:p-10">
      <div>
        <img
          :src="require(`@/assets/img/icon_cross.png`)"
          class="absolute right-6 top-4 h-8 w-8 pt-1"
          alt="icon"
          @click="closeApp"
        >
      </div>
      <div class="h-[5%]">
        <h1 class="font-chinese_rocks text-stone-50 text-center text-5xl ">{{ t('BoardTitle') }}</h1>
      </div>
      <div class="h-[90%]">
        <div class="list h-[98%] mt-14">
          <div class="h-full w-full flex">
            <div class="h-[95%] w-full overflow-y-auto scrollbar-hidden rounded-2xl px-2 pt-2 pb-1
              bg-opacity-10 bg-gray-50 border-2 border-black border-opacity-60"
            >
              <div class="grid grid-cols-5 max-h-[96%] overflow-y-auto m-1 scrollbar-hidden">
                
                <div v-for="(job, index) in jobList" :key="index">
                  <JobCard :job="job" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#content {
  width: 70vw;
  height: 75vh;
}

.mt-13-vh {
  margin-top: 11vh;
}

.background {
  background: url('@/assets/img/background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 0;
  width: 100%;
  height: 100%;
  transition: all .1s ease-out;
}

.scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }

.scrollbar-hidden {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

@media (min-width: 1600px) {
  #content {
    width: 60vw;
    height: 80vh;
  }
}
</style>