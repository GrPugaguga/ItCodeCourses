<script setup lang="ts">
import VButton from '../elements/VButton.vue'
import { h, ref, render } from 'vue';

interface IVButton {
  body: string,
  typeOfBtn: 'action' | 'number' | 'equals'
}
interface ICalc {
  result: any,
  isActiv: boolean
}



const dataCalc = ref<ICalc>({
  result: '',
  isActiv: false
})
const VButtons = ref<IVButton[]>([]);
const actions = ['(', ')', '<=', 'AC', '*', '/', '+', '-'];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const changeResult = (element: string) => {
  dataCalc.value.result = dataCalc.value.result.toString()
  /*Добавить кейс () */
  switch (element) {
    case 'AC':
      dataCalc.value.result = ''
      break;
    case '=':
      dataCalc.value.result = eval(dataCalc.value.result)
      break;
    case '0':
      if (dataCalc.value.result.length > 0) {
        dataCalc.value.result += element
      }
      break;
    case '(':
      dataCalc.value.result += element
      break;
    case '<=':
      dataCalc.value.result = dataCalc.value.result.slice(0, -1)

      break
    default:
      if (!actions.includes(dataCalc.value.result.slice(-1)) || !actions.includes(element)) {
        dataCalc.value.result += element
      } else {
        dataCalc.value.result = dataCalc.value.result.slice(0, -1)
        dataCalc.value.result += element
      }


  }

}


for (let e of actions) {
  VButtons.value.push({
    body: e,
    typeOfBtn: 'action'
  })
}
for (let i of numbers) {
  VButtons.value.push({
    body: `${i}`,
    typeOfBtn: 'number'
  })
}
VButtons.value.push({
  body: '.',
  typeOfBtn: 'number'
})
VButtons.value.push({
  body: '=',
  typeOfBtn: 'equals'
})
//Тут часть связаная с драгндропом


const items = ref([
  {
    id: 0,
    title: 'Поле Ввода',
    list: 0,
  },
  {
    id: 1,
    title: 'Кнопки',
    list: 0,
  }
])
const lists = ref([
  {
    listId: 0,
    elements: [{
      id: 0,
      title: 'Поле Ввода',
      list: 0,
    },
    {
      id: 1,
      title: 'Кнопки',
      list: 0,
    }]
  },
  {
    listId: 1,
    elements: []
  },
])
const startDrag = (event: DragEvent, item: any) => {
  console.log(event.dataTransfer)
  if (event.dataTransfer) { //ts ругался(
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemId', item.id.toString())
  }
}

const onDrop = (event: DragEvent, list: any) => {
  const itemId = event.dataTransfer?.getData('itemId');

  const item = items.value.find((item: any) => item.id == itemId)
  if (item && !lists.value[list].elements.includes(item) && item.list == 0) {
    item.list = list;
    lists.value[list].elements.push(item)
    console.log(lists.value[Math.abs(list - 1)].elements)
    lists.value[Math.abs(list - 1)].elements.splice(0, 1)


  }
}
const returnToConstruct = (list: any, item: any) => {
  if (item && !lists.value[list].elements.includes(item) && item.list == 1) {
    item.list = list
    switch (item.title) {
      case 'Поле Ввода':
        lists.value[list].elements.unshift(item);
        break;
      case 'Кнопки':
        lists.value[list].elements.push(item);
        break;
    }
    let toDelete = lists.value[Math.abs(list - 1)].elements.indexOf(item)
    lists.value[Math.abs(list - 1)].elements.splice(toDelete, 1)
  }
}


</script>
<template>
  <div class="body">
    <div class="calc_container" v-for="list in lists" @drop="onDrop($event, list.listId)" @dragenter.prevent
      @dragover.prevent>
      <div v-for="element in list.elements">
        <input v-model="dataCalc.result" @dblclick="returnToConstruct(0, element)" @keydown="(e) => {
          e.key == 'Enter' ? changeResult('=') : ''
        }" placeholder="Калькулятор" type="text" @dragstart="startDrag($event, element)" draggable="true"
          v-if="element.title == 'Поле Ввода'" />
        <div class="buttons_container" @dragstart="startDrag($event, element)" draggable="true"
          v-if="element.title == 'Кнопки'" @dblclick="returnToConstruct(0, element)">
          <VButton v-for="vButton, index in   VButtons  " :body="vButton.body" :typeOfBtn="vButton.typeOfBtn" :key="index"
            :style="{ 'grid-area': 'b' + index }" @click="changeResult(vButton.body)" />
        </div>
      </div>

    </div>
  </div>
</template>

<style  lang="scss" scoped>
.body {
  display: flex;
  flex-direction: row;

}

.calc_container {
  margin-top: 100px;
  margin-left: 100px;
  display: grid;
  grid-template-columns: auto;
  gap: 30px;
  padding: 30px;
  border-radius: 7px;
  border: solid 0.3px rgb(224, 222, 222);
  width: 500px;
  align-items: center;
  justify-content: center;
  background-color: #d8d7e41a;
  box-sizing: border-box;

  .buttons_container {
    display: grid;
    grid-template-areas:
      "b0 b1 b2 b3"
      "b8 b9 b10 b7"
      "b11 b12 b13 b4"
      "b14 b15 b16 b5"
      "b17 b18 b19 b6";
    width: 400px;
    background-color: rgb(248, 243, 243);
    border-radius: 7px;
    padding: 30px;
    box-shadow: 2px 1px 1px 1px rgb(224, 222, 222);
    gap: 7px;
  }

  input {
    width: 400px;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 7px;
    box-shadow: 2px 1px 1px 1px rgb(224, 222, 222);

    border: none;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
  }
}
</style>
