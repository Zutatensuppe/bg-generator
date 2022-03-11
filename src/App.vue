<template>
  <div>
    <image-select @selected="onImageSelected" ref="imageSelect" />
    <textarea class="textarea" v-model="inputUrl" />
    <span class="button is-small" @click="addUrlsStr">Add URL(s)</span>
    <template v-for="(url, idx) in urls" :key="idx">
      <img width="100" :src="urls[idx]" @click="removeUrl(idx)" />
    </template>

    <table>
      <tr><td>bgColor</td><td><input class="input is-small" v-model="bgColor" /></td></tr>
      <tr><td>imagesSize</td><td><input class="input is-small" v-model="imagesSize" /></td></tr>
      <tr><td>spacing</td><td><input class="input is-small" v-model="spacing" /></td></tr>
      <tr><td>canvasSize</td><td><input class="input is-small" v-model="canvasSize" /></td></tr>
      <tr><td>randomizeOrder</td><td><input type="checkbox" v-model="randomizeOrder" /></td></tr>
    </table>
    <div>
      <span class="button is-small" @click="generate">Generate!!!!</span>
    </div>
  </div>
</template>
<script lang="ts">
import ImageSelect from './ImageSelect.vue'
import { defineComponent, ref } from 'vue'

const anImg = async (src: string): Promise<HTMLImageElement> => {
  return new Promise ((resolve) => {
    const tmpImg = new Image();
    tmpImg.crossOrigin = "anonymous";
    tmpImg.onload = () => {
      resolve(tmpImg)
    }
    tmpImg.src = src
  })
}

const deg2rad = (degrees: number): number => {
  var pi = Math.PI;
  return degrees * (pi/180);
}

function shuffle<T>(a: T[]): T[] {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default defineComponent({
  components: {
    ImageSelect,
  },
  setup() {
    const urls = ref([] as string [])
    const inputUrl = ref('')
    const bgColor = ref('#000')
    const spacing = ref(150)
    const canvasSize = ref(450)
    const imagesSize = ref(50)
    const randomizeOrder = ref(true)
    return {
      urls,
      inputUrl,
      bgColor,
      spacing,
      canvasSize,
      imagesSize,
      randomizeOrder,
    }
  },
  methods: {
    removeUrl(idx: number) {
      this.urls = this.urls.filter((_url, index) => idx !== index)
    },
    addUrlsStr() {
      const urls = this.inputUrl.split(/[\n\r]+/).filter(u => !!u)
      this.urls.push(...urls)
    },
    onImageSelected (urls: string[]) {
      this.urls.push(...urls)
      this.$refs.imageSelect.reset()
    },

    async generate() {
      const spacing = parseInt(`${this.spacing}`, 10)
      const canvas = document.createElement('canvas')
      canvas.width = parseInt(`${this.canvasSize}`, 10)
      canvas.height = parseInt(`${this.canvasSize}`, 10)
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }
      ctx.fillStyle = this.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const images = []
      for (let u of this.urls) {
        images.push(await anImg(u))
      }

      let idx = 0
      let rows = 0
      for (let y = 0; y < canvas.height; y+=spacing) {
        for (let x = 0; x < canvas.width; x+=spacing) {

          const posX = x + (rows % 2 === 0 ? (spacing / 4 + spacing / 2) : (spacing / 4))
          const posY = y + (spacing / 4)


          if (idx%this.urls.length === 0) {
            if (this.randomizeOrder) {
              shuffle(images)
            }
          }

          const image = images[idx%this.urls.length]

          const width = parseInt(`${this.imagesSize}`, 10);
          const height = parseInt(`${this.imagesSize}`, 10);
          const angleInRadians = deg2rad(Math.random() * 360)

          const poses = [
            [posX, posY],
            [posX + this.canvasSize, posY],
            [posX - this.canvasSize, posY],
            [posX, posY + this.canvasSize],
            [posX, posY - this.canvasSize],
            [posX + this.canvasSize, posY + this.canvasSize],
            [posX - this.canvasSize, posY - this.canvasSize],
            [posX + this.canvasSize, posY - this.canvasSize],
            [posX - this.canvasSize, posY + this.canvasSize],
          ]
          for (let [posX, posY] of poses) {
            ctx.save();
            ctx.translate(posX, posY);
            ctx.rotate(angleInRadians);
            ctx.drawImage(image, -width / 2, -height / 2, width, height);
            ctx.rotate(-angleInRadians);
            ctx.translate(-posX, -posY);
            ctx.restore();
          }

          idx++
        }
        rows++
      }
      console.log(canvas.toDataURL())

      document.body.style.backgroundImage = `url(${canvas.toDataURL()})`
    },
  },
})
</script>

