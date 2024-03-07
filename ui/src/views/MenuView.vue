<script setup>
import api from '@/api'
import { ref, onMounted, computed, watch } from 'vue'
import { useJobsStore } from '@/store/jobs'
import { useI18n } from 'vue-i18n'
import ConfirmModal from '@/components/ConfirmModal'

const { t } = useI18n()
const emits = defineEmits(['closeApp'])
const jobsStore = useJobsStore()

const myJobs = ref({})
const countMaxJobs = ref(0)
const countJobs = ref(0)

const isDropdownOpen = ref([])
const showConfirmModal = ref(false)
const indexToConfirm = ref(null)

const closeApp = () => {
  emits('closeApp', false)

  api.post("updatestate", {
    state: false
  }).catch(e => {
    console.log(e.message)
  })
}

const toggleDropdown = (index) => {
  isDropdownOpen.value.forEach((value, idx) => {
    if (idx !== index) {
      isDropdownOpen.value[idx] = false
    }
  })
  isDropdownOpen.value[index] = !isDropdownOpen.value[index]
}

const selectActiveJob = (index) => {
  let job = myJobs.value[index]
  api.post("selectJob", {
    job: job,
  }).catch((e) => {
    console.log(e.message)
  })

  myJobs.value[index].selected = !myJobs.value[index].selected

  for (let i = 0; i < myJobs.value.length; i++) {
    if (i !== index) {
      myJobs.value[i].selected = false
    }
  }
}

const openConfirmModal = (index) => {
  indexToConfirm.value = index
  showConfirmModal.value = true
}

const updateCountJobs = () => {
  countJobs.value = myJobs.value.length
}

const contentHeight = computed(() => `calc(30vh + (5vh * ${countMaxJobs.value}))`)

onMounted(() => {
  myJobs.value = jobsStore.getMyJobs()
  countMaxJobs.value = jobsStore.getMaxJobsCount()
  updateCountJobs()
  for (let i = 0; i < myJobs.value.length; i++) {
    isDropdownOpen.value.push(false)
  }
})

watch(jobsStore.getMyJobs(), () => {
  myJobs.value = jobsStore.getMyJobs()
  updateCountJobs()
});
</script>


<template>
  <div>
    <ConfirmModal
      v-if="showConfirmModal === true"
      @close="showConfirmModal = false"
      :indexToConfirm="indexToConfirm"
    />
    <div id="content" class="fixed right-6 top-6" :style="{height: contentHeight }">
      <div class="background my-auto p-8">
        <div>
            <img
              :src="require(`@/assets/img/icon_cross.png`)"
              class="absolute right-6 top-4 h-6 w-6 pt-1"
              alt="icon"
              @click="closeApp"
            >
        </div>
        <div class="flex flex-col items-center h-full relative">
          <div class="font-rdrlino text-4xl text-white flex justify-center">
            {{ t('MyJobsTitle') }}
          </div>
          <div class="font-rdrlino text-xl text-white flex justify-center mt-2">
            {{ t('MyJobsSubTitle') }}
          </div>
          <div class="separator-bar mt-4 items-center"></div>

          <div class="mt-4 w-full">
            <div v-for="(job, index) in myJobs" :key="index">
              <div>
                <button 
                  class="bg-button py-2 mt-1"
                  :class="[!!job.selected ? 'bg-button-selected text-black' : 'bg-button text-white']"
                  @click="toggleDropdown(index)">
                  <div class="font-rdrlino">
                    <div>
                      {{ job.label }}
                    </div>
                  </div>
                </button>
              </div>
              <div v-if="isDropdownOpen[index]" class="w-full flex flex-col font-rdrlino text-white px-10 py-2">
                <div class="flex justify-between">
                  <div>
                    {{t('Grade') + job.grade }}
                  </div>
                  <div>
                    <button
                      :class="{ 'bg-primary': !!job.selected, 'bg-gray-400': !job.selected }"
                      @click="selectActiveJob(index)"
                      :disabled="!!job.selected"
                      class="inline-flex items-center justify-start h-6 w-12 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none"
                    >
                      <span 
                      :class="{ 
                        'translate-x-6': !!job.selected,
                        'bg-black': !!job.selected,
                        'bg-white': !job.selected
                        }"
                      class="block w-6 h-6 rounded-full shadow-md transform transition-transform"></span>
                    </button>
                  </div>
                </div>
                
                <div v-if="!job.selected" class="flex justify-center mt-2">
                  <button
                    class="w-24 btn flex justify-center pt-1 pb-2 px-20 items-baseline text-base font-rdrlino rounded-2xl border-2 bg-black bg-opacity-60
                    text-white border-primary hover:bg-primary hover:text-black hover:border-black"
                    @click="openConfirmModal(index)"
                  >
                    {{ t('DeleteJob') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="font-rdrlino text-white absolute bottom-0 w-full flex items-center justify-center flex-col">
            <div class="separator-bar mb-3"></div>
            {{ t('JobCount') + countJobs }} / {{ countMaxJobs }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
#content {
  width: 20vw;
}

.background {
  background: url('@/assets/img/menu_background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 0;
  width: 100%;
  height: 100%;
  transition: all .1s ease-out;
}

.bg-button {
  background: url('@/assets/img/button.png');
  background-repeat: no-repeat;
  border: 0;
  background-size: 100% 100%;
  width: 100%;
}

.bg-button-selected {
  background: url('@/assets/img/button_selected.png');
  background-repeat: no-repeat;
  border: 0;
  background-size: 100% 100%;
  width: 100%;
}

.separator-bar {
  background: url('../assets/img/narrow.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 0;
  width: 80%;
  height: 2px;
  transition: all .1s ease-out;
}
</style>
