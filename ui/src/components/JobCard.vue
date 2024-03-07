<script setup>
import { useI18n } from 'vue-i18n'
import { useJobsStore } from '@/store/jobs'

const jobsStore = useJobsStore()

const { t } = useI18n();
const props = defineProps(['job'])

const getImageSource = (jobName) => {
  const imageName = jobName.toLowerCase() + '.png'
  try {
    require(`@/assets/img/${imageName}`)
    return require(`@/assets/img/${imageName}`)
  } catch (error) {
    return require(`@/assets/img/default.png`)
  }
}

const selectJob = () => {
  jobsStore.addJob(props.job)
};
</script>

<template>
  <button class="mt-1 ml-2 mb-6" @click="selectJob()">
    <div class="rounded-2xl h-44 w-44
      box border-4 border-primary border-opacity-60 bg-black bg-opacity-60"
    >
      <div class="box-inner flex flex-col justify-between items-center">
        <div class="box-front  flex flex-col justify-between items-center">
          <img :src="getImageSource(props.job.name)" class="h-20 w-20 mt-2" alt="icon" />
          <div class="font-chinese_rocks text-white text-xl">{{ props.job.label }}</div>
          <div class="font-chinese_rocks text-white mb-2">Grade <span>{{ props.job.grade }}</span></div>
        </div>
        <div class="box-back h-full rounded-2xl flex items-center justify-center bg-primary bg-opacity-60 text-black border-4 border-black">
          <div class="font-chinese_rocks text-black text-3xl">
            {{ t('Select') }}
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.box {
  perspective: 1000px;
}

.box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.4s;
  transform-style: preserve-3d;
}
.box:hover .box-inner {
  transform: rotateY(180deg);
}

.box-back, .box-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.box-back {
  color: #eeeeee;
  transform: rotateY(180deg);
}
</style>
