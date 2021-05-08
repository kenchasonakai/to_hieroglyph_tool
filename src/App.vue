<template>
<div id="app" class="container">
  <h1>ファラオ養成所</h1>
  <h2>アルファベットを入力してください</h2>
  <div class="copy-field">
    <p class="copy-text rounded" v-if="state.isVisibleCopyAnimation">
      クリップボードにコピーしました
    </p>
  </div>
  <input v-model="state.input" @keyup="toHieroglyph()"/>
  <div class="button-inline">
    <button @click="doReset" class="btn-reset">
      Reset
    </button>
    <button @click="doCopy()" class="btn-copy">
      Copy!
    </button>
  </div>
  <div class="hierohlyph-field">{{ state.output }}</div>
</div>
</template>

<script>
import { reactive } from 'vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
export default {
  setup(){
    const state = reactive({
      input: "koncha",
      output: "𓎡𓍯𓈖𓎡𓎛𓄿",
      isVisibleCopyAnimation: false,
    })
    const toHieroglyph = () =>{
      let hash = { A: ["1313F"], B: ["130C0"] , C: ["133A1"], D: ["130A7"], E: ["131CB"], F: ["13191"], G: ["133BC"], H: ["1339B"], I: ["131CB"], J: ["13193"], K: ["133A1"], L: ["130ED"], M: ["13153"], N: ["13216"], O: ["1336F"], P: ["133E4"], Q: ["133D8"], R: ["1308B"], S: ["132F4"], T: ["133CF"], U: ["13171"], V: ["13191"],W: ["13171"], X: ["133A1", "132F4"], Y: ["131CB"], Z: ["13283"] }
      const regex = new RegExp(/^[a-zA-Z]+$/);
      let strings = state.input.split("").map(string =>  regex.test(string) ? hash[string.toUpperCase()] : string)
      let hieroglyph = strings.map(s => parseInt(s, 16) ? String.fromCodePoint(parseInt(s, 16)) : s)
      state.output = hieroglyph.flat().join("")
    }
    const toVisibleCopyAnimation = () => {
      state.isVisibleCopyAnimation = true
    }
    const toUnvisibleCopyAnimation = () => {
      state.isVisibleCopyAnimation = false
    }
    const doCopy = () => {
      toClipboard(state.output)
      toVisibleCopyAnimation()
      window.setTimeout(() =>  toUnvisibleCopyAnimation() , 2*1000);
    }
    const doReset = () => {
      state.input = ""
      state.output = ""
    }
    return {toClipboard, state, toHieroglyph, toVisibleCopyAnimation, toUnvisibleCopyAnimation, doCopy, doReset}
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  width: 40%;
  margin: 0 auto 0 auto;
}
input{
  min-height: 1em;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  font-size: 70px;
  letter-spacing: 0.25em;
}
.button-inline{
  margin-top: 10px;
  text-decoration: none;
  font-size: 16px;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
.btn-reset{
  position: relative;
  display: inline-block;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #FFF;
  background: #fd9535;/*色*/
  border-radius: 4px;/*角の丸み*/
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.05);
  font-weight: bold;
  border: solid 2px #d27d00;/*線色*/
}
.btn-reset:active{
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
.btn-copy{
  position: relative;
  display: inline-block;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #FFF;
  background: #fd9535;/*色*/
  border-radius: 4px;/*角の丸み*/
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.05);
  font-weight: bold;
  border: solid 2px #d27d00;/*線色*/
}
.btn-copy:active{
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
h1{
  margin-top: 10px;
  text-align: center;
}
h2{
  margin-bottom: 50px;
  text-align: center;
}
.copy-text{
  text-align: center;
  height: 2em;
  padding-top: 0.25em;
  background-color: #99CC66;
}
.copy-field{
  min-height: 3em;

}
.hierohlyph-field{
  min-height: 5em;
  word-break: break-all;
  text-align: left;
  margin-top: 20px;
  font-size: 50px;
}
</style>
