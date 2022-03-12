<template>
  <div class="card">
    <div class="panel-block">
      Add files by clicking <image-select @selected="onImageSelected" ref="imageSelect" />,
      dragging images on the browser, or by <span class="button is-small" @click="wantToAddUrls = !wantToAddUrls">adding urls</span>.
    </div>
    <div class="fake-panel-block" v-if="wantToAddUrls">
      Note: This may not always work for all external urls. <br />
      <textarea class="textarea is-small mb-1" v-model="inputUrl" />
      <span class="button is-small" @click="addUrlsStr">Add URL(s)</span>
    </div>
    <div class="fake-panel-block" v-if="urls.length">
      Click on an image to remove it. <br />
      <img v-for="(url, idx) in urls" :key="idx" width="100" :src="urls[idx]" @click="removeUrl(idx)" class="is-clickable mr-1" />
    </div>
    <div class="panel-block">
      <table class="table">
        <tr><td>bgColor</td><td><input class="input is-small" type="color" v-model="bgColor" /></td><td></td></tr>
        <tr><td>imagesSize</td><td><input class="input is-small" v-model="imagesSize" /></td><td> Images are sized so that their smallest side becomes this value. They retain their original aspect ratio.</td></tr>
        <tr><td>spacing</td><td><input class="input is-small" v-model="spacing" /></td><td></td></tr>
        <tr><td>canvasWidth</td><td><input class="input is-small" v-model="canvasWidth" /></td><td></td></tr>
        <tr><td>canvasHeight</td><td><input class="input is-small" v-model="canvasHeight" /></td><td></td></tr>
        <tr><td>randomizeOrder</td><td><input type="checkbox" v-model="randomizeOrder" /></td><td></td></tr>
        <tr><td>randomizeAngle</td><td><input type="checkbox" v-model="randomizeAngle" /></td><td></td></tr>
        <tr><td>tryToWrapAround</td><td><input type="checkbox" v-model="tryToWrapAround" /></td><td> Create a background that can be repeated forever. For this to work, the canvas width/height should be equal, and a multiple of the spacing.</td></tr>
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
    const wantToAddUrls = ref(false)
    const inputUrl = ref('')
    const bgColor = ref('#000000')
    const spacing = ref(150)
    const canvasWidth = ref(1280)
    const canvasHeight = ref(720)
    const imagesSize = ref(50)
    const randomizeOrder = ref(true)
    const randomizeAngle = ref(true)
    const tryToWrapAround = ref(false)

    return {
      urls,
      wantToAddUrls,
      inputUrl,
      bgColor,
      spacing,
      canvasWidth,
      canvasHeight,
      imagesSize,
      randomizeOrder,
      randomizeAngle,
      tryToWrapAround,
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

      const imagesSize = parseInt(`${this.imagesSize}`, 10)

      const spacing = parseInt(`${this.spacing}`, 10)

      canvas.width = parseInt(`${this.canvasWidth}`, 10)
      canvas.height = parseInt(`${this.canvasHeight}`, 10)

      ctx.fillStyle = this.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const images = []
      for (let u of this.urls) {
        images.push(await anImg(u))
      }

      let idx = 0
      let rows = 0
      const posOffset = imagesSize
      let startY = this.tryToWrapAround ? 0 : -spacing
      let startX = this.tryToWrapAround ? 0 : -spacing
      for (let y = startY; y < canvas.height; y+=spacing) {
        const posY = y + posOffset
        const posXOffset = (rows % 2 === 0) ? (spacing / 2) : 0

        for (let x = startX; x < canvas.width; x+=spacing) {
          const posX = x + posXOffset + posOffset

          if (idx%this.urls.length === 0) {
            if (this.randomizeOrder) {
              shuffle(images)
            }
          }

          const image = images[idx%this.urls.length]
          const angleInRadians = this.randomizeAngle ? deg2rad(Math.random() * 360) : 0

          const poses = [[posX, posY]]
          if (this.tryToWrapAround) {
            poses.push(...[
              [posX + canvas.width, posY],
              [posX - canvas.width, posY],
              [posX, posY + canvas.height],
              [posX, posY - canvas.height],
              [posX + canvas.width, posY + canvas.height],
              [posX - canvas.width, posY - canvas.height],
              [posX + canvas.width, posY - canvas.height],
              [posX - canvas.width, posY + canvas.height],
            ])
          }

          let imageWidth
          let imageHeight
          if (image.width < image.height) {
            imageWidth = imagesSize
            imageHeight = (imagesSize * image.height / image.width)
          } else {
            imageHeight = imagesSize
            imageWidth = (imagesSize * image.width / image.height)
          }
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
      // document.body.style.backgroundRepeat = 'repeat'
      // document.body.style.height = `${canvas.height * 10}px`
    },
  },
})
</script>

