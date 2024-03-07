<script setup>
import { useJobsStore } from '../store/jobs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const emits = defineEmits(['close'])
const props = defineProps(['indexToConfirm'])

const jobsStore = useJobsStore()

const closeModal = () => {
  emits('close')
}

const removeJob = () => {
  jobsStore.removeJob(props.indexToConfirm)
  emits('close')
};
</script>

<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-100 w-screen overflow-y-auto">
      <div class="flex min-h-full justify-center text-center sm:items-center sm:p-0" >
        <div id="contentModal" class="relative bg-modal w-full p-8">
          <div>
            <img
              :src="require(`@/assets/img/icon_cross.png`)"
              class="absolute right-6 top-4 h-8 w-8 pt-1"
              alt="icon"
              @click="closeModal"
            >
          </div>
          <h1 class="font-rdrlino text-white text-lg xl:text-2xl">{{ t('AreYouSure') }}</h1>
          <div class="flex justify-center pt-2 xl:pt-8">
            <div class="flex flex-col">
              <div class="flex justify-center">
                <button 
                  class="mr-2 w-24 btn flex justify-center pt-1 pb-2 text-xl font-rdrlino rounded-2xl border-2
                  text-white border-primary hover:bg-primary hover:text-black"
                  @click="removeJob"
                >
                  {{ t('Yes') }}
                </button>
                <button
                  class="ml-2 w-24 btn flex justify-center pt-1 pb-2 text-xl font-rdrlino rounded-2xl border-2
                  text-white border-primary hover:bg-primary hover:text-black"
                  @click="closeModal"
                >
                  {{ t('No') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #contentModal {
    height: 20vh;
    width: 30vw;
  }

  .bg-modal {
    background: url('../assets/img/background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: 0;
    width: 100%;
    height: 50%;
  }

  .button-with-image .image {
    display: block;
  }

  .button-with-image .text,
  .button-with-image-active .text {
    display: none;
  }

  .button-with-image:hover .image,
  .button-with-image-active .image {
    display: none;
  }

  .button-with-image:hover .text,
  .button-with-image-active .text {
    display: block;
  }

  .button-with-image-active .image {
    display: none;
  }

  @media (min-width: 1280px) {
    #contentModal {
      width: 20vw;
      height: 20vh;
    }
  }
</style>
