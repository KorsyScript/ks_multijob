import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'

export const useJobsStore = defineStore('jobs', () => {
  const myJobs = ref([])
  const jobList = ref([])
  const maxJobsCount = ref(0)

  const setMyJobs = (data) => {
    data.forEach(job => {
        myJobs.value.push(job)
    })
  }

  const setBoardJobs = (data) => {
    data.forEach(job => {
      jobList.value.push(job)
    })
  }

  const setMaxJobsCount = (data) => {
    maxJobsCount.value = data
  }

  const getMyJobs = () => { return myJobs.value }
  const getBoardJobs = () => { return jobList.value }
  const getMaxJobsCount = () => { return maxJobsCount.value }

  const removeJob = (elementToDelete) => {
    if (myJobs.value.length > 1) {
      const jobToDelete = myJobs.value[elementToDelete]; // Récupérer l'élément du tableau à supprimer

      api.post("deleteJob", {
        jobName: jobToDelete.name,
      }).catch((e) => {
        console.log(e.message)
      })

      myJobs.value.splice(elementToDelete, 1);
    }
  }

  const resetStore = () => {
    myJobs.value = []
    jobList.value = []
  }

  const addJob = (job) => {
    if (myJobs.value.length < maxJobsCount.value) {
      myJobs.value.push(job)

      api.post("addJob", {
        job: job,
      }).catch((e) => {
        console.log(e.message)
      })
    } else {
      api.post("addJobError", {
        error: true,
      }).catch((e) => {
        console.log(e.message)
      })
    }
  }

  return {
    setMyJobs,
    getMyJobs,
    setBoardJobs,
    getBoardJobs,
    setMaxJobsCount,
    getMaxJobsCount,
    addJob,
    removeJob,
    resetStore,
  }
})
