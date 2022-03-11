<template>
  <div
    class="image-select"
    :class="{'has-image': previewUrls.length, 'no-image': !previewUrls.length, droppable: droppable}"
    @drop="onDrop"
    @dragover="onDragover"
    @dragleave="onDragleave">
    <div class="drop-target"></div>
    <div>
      <label>
        <input type="file" style="display: none" @change="onFileSelect" accept="image/*" />
        <span class="button is-small">Add File</span>
      </label>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const previewUrls = ref([] as string[])
    const droppable = ref(false)

    return {
      previewUrls,
      droppable,
    }
  },
  methods: {
    reset(): void {
      this.previewUrls = []
      this.droppable = false
    },
    onFileSelect (evt: Event) {
      const target = (evt.target as HTMLInputElement)
      if (!target.files) return;
      const items = []
      for (let i = 0; i < target.files.length; i++) {
        items.push(target.files[i])
      }
      this.preview(items)
    },
    async preview (files: File[]) {
      let promises = [] as Promise<string>[]
      for (let file of files) {
        promises.push(new Promise((resolve) => {
          const r = new FileReader()
          r.readAsDataURL(file)
          r.onload = (ev: any) => {
            resolve(ev.target.result)
          }
        }))
      }
      this.previewUrls = await Promise.all(promises)
      this.$emit('selected', this.previewUrls)
    },
    imagesFromDragEvt (evt: DragEvent): DataTransferItem[] {
      const items = evt.dataTransfer?.items
      if (!items || items.length === 0) {
        return []
      }
      const filteredItems = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          filteredItems.push(items[i])
        }
      }
      return filteredItems
    },
    onDrop (evt: DragEvent): boolean {
      this.droppable = false
      const images = this.imagesFromDragEvt(evt)
      if (images.length === 0) {
        return false
      }
      const files = []
      for (const img of images) {
        const f = img.getAsFile()
        if (f) {
          files.push(f)
        }
      }
      if (files.length === 0) {
        return false
      }

      this.preview(files)
      evt.preventDefault()
      return false
    },
    onDragover (evt: DragEvent): boolean {
      const images = this.imagesFromDragEvt(evt)
      if (images.length === 0) {
        return false
      }
      this.droppable = true
      evt.preventDefault()
      return false
    },
    onDragleave () {
      this.droppable = false
    },
  },
})
</script>
