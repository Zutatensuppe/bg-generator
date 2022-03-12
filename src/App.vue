<template>
  <div class="card">
    <div class="panel-block">
      Add files by clicking <image-select @selected="onImageSelected" ref="imageSelect" />,
      dragging images on the browser, or by adding urls to the textarea (urls in
      textarea may not always work for all external urls).
    </div>
    <div class="fake-panel-block">
      <textarea class="textarea is-small mb-1" v-model="inputUrl" />
      <span class="button is-small" @click="addUrlsStr">Add URL(s)</span>
    </div>
    <div class="panel-block">
      Click on an image to remove it.
    </div>
    <div class="panel-block">
      <img v-for="(url, idx) in urls" :key="idx" width="100" :src="urls[idx]" @click="removeUrl(idx)" class="is-clickable mr-1" />
    </div>
    <div class="panel-block">
      <table>
        <tr><td>bgColor</td><td><input class="input is-small" type="color" v-model="bgColor" /></td></tr>
        <tr><td>imagesSize</td><td><input class="input is-small" v-model="imagesSize" /></td></tr>
        <tr><td>spacing</td><td><input class="input is-small" v-model="spacing" /></td></tr>
        <tr><td>canvasSize</td><td><input class="input is-small" v-model="canvasSize" /></td></tr>
        <tr><td>randomizeOrder</td><td><input type="checkbox" v-model="randomizeOrder" /></td></tr>
        <tr><td>randomizeAngle</td><td><input type="checkbox" v-model="randomizeAngle" /></td></tr>
      </table>
    </div>
    <div class="panel-block">
      <span class="button is-small" @click="generate">Generate!!!!</span>
    </div>
  </div>
  <canvas ref="canvas"></canvas>
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
    const bgColor = ref('#000000')
    const spacing = ref(150)
    const canvasSize = ref(600) // 4x spacing makes things look ok
    const imagesSize = ref(50)
    const randomizeOrder = ref(true)
    const randomizeAngle = ref(true)
    return {
      urls,
      inputUrl,
      bgColor,
      spacing,
      canvasSize,
      imagesSize,
      randomizeOrder,
      randomizeAngle,
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
      const canvas = this.$refs.canvas as HTMLCanvasElement
      if (!canvas) {
        return
      }
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }

      const spacing = parseInt(`${this.spacing}`, 10)
      const imageWidth = parseInt(`${this.imagesSize}`, 10);
      const imageHeight = parseInt(`${this.imagesSize}`, 10);

      canvas.width = parseInt(`${this.canvasSize}`, 10)
      canvas.height = parseInt(`${this.canvasSize}`, 10)

      ctx.fillStyle = this.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const images = []
      for (let u of this.urls) {
        images.push(await anImg(u))
      }

      let idx = 0
      let rows = 0
      const posOffset = spacing / 4
      for (let y = 0; y < canvas.height; y+=spacing) {
        const posY = y + posOffset
        const posXOffset = (rows % 2 === 0) ? (spacing / 2) : 0

        for (let x = 0; x < canvas.width; x+=spacing) {
          const posX = x + posXOffset + posOffset

          if (idx%this.urls.length === 0) {
            if (this.randomizeOrder) {
              shuffle(images)
            }
          }

          const image = images[idx%this.urls.length]
          const angleInRadians = this.randomizeAngle ? deg2rad(Math.random() * 360) : 0

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
            ctx.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
            ctx.rotate(-angleInRadians);
            ctx.translate(-posX, -posY);
            ctx.restore();
          }

          idx++
        }
        rows++
      }
      // console.log(canvas.toDataURL())

      // document.body.style.backgroundImage = `url(${canvas.toDataURL()})`
    },
  },
})
</script>

