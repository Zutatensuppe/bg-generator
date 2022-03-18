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
        <tr>
          <td>bgColor</td>
          <td><input class="input is-small" type="color" v-model="bgColor" /></td>
          <td></td>
        </tr>
        <tr>
          <td>bgAlpha</td>
          <td><input class="input is-small" type="number" min="0" max="100" v-model="bgAlpha" /></td>
          <td> Alpha of the background (0 = Transparent, 100 = Opaque)</td>
        </tr>
        <tr>
          <td>imagesSize</td>
          <td><input class="input is-small" type="number" v-model="imagesSize" /></td>
          <td> Images are sized so that their smallest side becomes this value. They retain their original aspect ratio.</td>
        </tr>
        <tr>
          <td>imagesAlpha</td>
          <td><input class="input is-small" type="number" min="0" max="100" v-model="imagesAlpha" /></td>
          <td> Alpha of the images on the background (0 = Transparent, 100 = Opaque)</td>
        </tr>
        <tr>
          <td>spacingHorizontal</td>
          <td><input class="input is-small" type="number" v-model="spacingHorizontal" /></td>
          <td></td>
        </tr>
        <tr>
          <td>spacingVertical</td>
          <td><input class="input is-small" type="number" v-model="spacingVertical" /></td>
          <td></td>
        </tr>
        <tr>
          <td>canvasWidth</td>
          <td><input class="input is-small" type="number" v-model="canvasWidth" /></td>
          <td></td>
        </tr>
        <tr>
          <td>canvasHeight</td>
          <td><input class="input is-small" type="number" v-model="canvasHeight" /></td>
          <td></td>
        </tr>
        <tr>
          <td>randomizeOrder</td>
          <td><input type="checkbox" v-model="randomizeOrder" /></td>
          <td></td>
        </tr>
        <tr>
          <td>randomizeAngle</td>
          <td><input type="checkbox" v-model="randomizeAngle" /></td>
          <td></td>
        </tr>
        <tr>
          <td>fixedAngles</td>
          <td><input class="input is-small" v-model="fixedAngles" /></td>
          <td>(Only has an effect if <code>randomizeAngle</code> is not checked.) Comma separated angles, for example <code>0, 45, -90, 90</code>. They will be rotated through.</td>
        </tr>
        <tr>
          <td>offsetHorizontal</td>
          <td><input class="input is-small" type="number" v-model="offsetHorizontal" /></td>
          <td></td>
        </tr>
        <tr>
          <td>offsetVertical</td>
          <td><input class="input is-small" type="number" v-model="offsetVertical" /></td>
          <td></td>
        </tr>
        <tr>
          <td>indentEverySecondRow</td>
          <td><input type="checkbox" v-model="indentEverySecondRow" /></td>
          <td> If checked, every second row will be indented by half the <code>spacingHorizontal</code></td>
        </tr>
        <tr>
          <td>tryToWrapAround</td>
          <td><input type="checkbox" v-model="tryToWrapAround" /></td>
          <td> Create a background that can be repeated forever. For this to work, the canvas width/height should be equal, and a multiple of the spacing.</td>
        </tr>
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

function angleDiff(a1: number, a2: number) {
  let dif = Math.abs(a1 - a2) % 360;
  if (dif > 180) {
      dif = 360 - dif;
  }
  return dif
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
    const spacingHorizontal = ref(150)
    const spacingVertical = ref(150)
    const canvasWidth = ref(1280)
    const canvasHeight = ref(720)
    const imagesSize = ref(50)
    const randomizeOrder = ref(true)
    const randomizeAngle = ref(true)
    const fixedAngles = ref("0")
    const tryToWrapAround = ref(false)
    const indentEverySecondRow = ref(true)
    const imagesAlpha = ref(100)
    const bgAlpha = ref(100)

    const offsetHorizontal = ref(0)
    const offsetVertical = ref(0)

    return {
      urls,
      wantToAddUrls,
      inputUrl,
      bgColor,
      bgAlpha,
      spacingHorizontal,
      spacingVertical,
      canvasWidth,
      canvasHeight,
      imagesSize,
      imagesAlpha,
      randomizeOrder,
      randomizeAngle,
      fixedAngles,
      indentEverySecondRow,
      tryToWrapAround,
      offsetHorizontal,
      offsetVertical,
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

      const fixedAnglesList = this.fixedAngles.split(',')
        .map(value => parseInt(value.trim(), 10))
        .filter(value => !isNaN(value))
      if (fixedAnglesList.length === 0) {
        fixedAnglesList.push(0)
      }

      const imagesSize = parseInt(`${this.imagesSize}`, 10)
      const bgAlpha = parseInt(`${this.bgAlpha}`, 10) / 100
      const imagesAlpha = parseInt(`${this.imagesAlpha}`, 10) / 100

      const spacingHorizontal = parseInt(`${this.spacingHorizontal}`, 10)
      const spacingVertical = parseInt(`${this.spacingVertical}`, 10)

      canvas.width = parseInt(`${this.canvasWidth}`, 10)
      canvas.height = parseInt(`${this.canvasHeight}`, 10)

      const offsetHorizontal = parseInt(`${this.offsetHorizontal}`, 10)
      const offsetVertical = parseInt(`${this.offsetVertical}`, 10)

      ctx.save();
      ctx.globalAlpha = bgAlpha;
      ctx.fillStyle = this.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore();

      const images = []
      for (let u of this.urls) {
        images.push(await anImg(u))
      }

      let angleInDeg = 0
      let fixedAngleIdx = 0
      let idx = 0
      let rows = 0
      let startY = this.tryToWrapAround ? 0 : -spacingVertical
      let startX = this.tryToWrapAround ? 0 : -spacingHorizontal
      for (let y = startY; y < canvas.height; y+=spacingVertical) {
        const posY = y + offsetVertical
        let posXOffset = 0
        if (this.indentEverySecondRow) {
          posXOffset = (rows % 2 === 0) ? (spacingHorizontal / 2) : 0
        }

        for (let x = startX; x < canvas.width; x+=spacingHorizontal) {
          const posX = x + posXOffset + offsetHorizontal

          if (idx%this.urls.length === 0) {
            if (this.randomizeOrder) {
              shuffle(images)
            }
          }

          const image = images[idx%this.urls.length]
          if (this.randomizeAngle) {
            let angle
            do {
              angle = Math.random() * 360
            } while (angleDiff(angle, angleInDeg) < 15)
            angleInDeg = angle
          } else {
            angleInDeg = fixedAnglesList[fixedAngleIdx]
          }
          fixedAngleIdx+=1
          if (fixedAngleIdx >= fixedAnglesList.length) {
            fixedAngleIdx = 0
          }
          const angleInRadians = deg2rad(angleInDeg)

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
            ctx.globalAlpha = imagesAlpha;
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

