
<template>
    <div class="action" v-bind:class="{ show: filtrList.show }" @click="filtrList.show = false">
        <span>Задачи успешно изменены</span>
    </div>
    <div class="toDoForm">
        <h1>ToDo Form</h1>
        <form class="form">
            <span class="formSpan">Текст заметки:
                <input v-model="creatingToDoName" class="formText" placeholder="Введите текст" />
            </span>
            <span class="formSpan">Приоритет:
                <select class="formSelect" v-model="creatingToDoPriority">
                    <option value='true'>Важно</option>
                    <option value=''>Не Важно</option>
                </select>
            </span>
            <button class="formButton"
                @click.prevent="handleSendToDo(creatingToDoName, Boolean(creatingToDoPriority))">Создать</button>
        </form>
        <div class="toDoCard">
            <div class="radio">
                <span class="toDoSpan">Показать все</span>
                <input name="radioAction" type="radio" class="radioBox" value="all" v-model="filtrList.method"
                    @click="getFilterList(todoList, 'all')" />
                <span class="toDoSpan">Только важные</span>
                <input name="radioAction" type="radio" class="radioBox" value="priority" v-model="filtrList.method"
                    @click="getFilterList(todoList, 'priority')" />

            </div>


            <div class="toDos" v-for="todoItem, i in filtrList.sortList" :key="i">
                <div class="toDo" tabindex="1" data-tooltip="Дополнительная информация">
                    <input type="checkbox" class="toDoCheckbox" v-model="todoItem.status"
                        @click="console.log(todoItem.status)" />
                    <span class="toDoSpan" v-if="!todoItem.isEditing" v-bind:class="{ toDoSpanCompl: todoItem.status }">{{
                        todoItem.name }}</span>
                    <input class="toDoSpan formText" v-else type="text" v-model="todoItem.reName" />
                    <div v-if="!todoItem.isEditing" class="toDoButtons">
                        <button class="toDoButton" @click.prevent="handleEditToDo(todoItem)">Редактировать</button>
                        <button class="toDoButton" @click.prevent="handleDeleteToDo(todoItem)">Удалить</button>
                    </div>
                    <div v-else class="toDoButtons">
                        <button class="toDoButton" @click.prevent="handleSaveEdit(todoItem)">Сохранить</button>
                        <button class="toDoButton" @click.prevent="handleCancelEdit(todoItem)">Отменить</button>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const creatingToDoName = ref('');
const creatingToDoPriority = ref(true);

const handleDeleteToDo = (todoItem: ITodoItem) => {
    let toDoToDelete = todoList.value.indexOf(todoItem);
    if (toDoToDelete !== -1) {
        todoList.value.splice(toDoToDelete, 1)
    }
    getFilterList(todoList.value, filtrList.value.method)
    showMessage()
}
const handleEditToDo = (todoItem: ITodoItem) => {
    let toDoToEdit = todoList.value.indexOf(todoItem);
    todoList.value[toDoToEdit].isEditing = true;
    getFilterList(todoList.value, filtrList.value.method)
}
const handleCancelEdit = (todoItem: ITodoItem) => {
    let toDoToCancelEdit = todoList.value.indexOf(todoItem);
    todoList.value[toDoToCancelEdit].isEditing = false;
    todoList.value[toDoToCancelEdit].reName = '';
    getFilterList(todoList.value, filtrList.value.method)
}
const handleSaveEdit = (todoItem: ITodoItem) => {
    let toDoToSaveEdit = todoList.value.indexOf(todoItem);
    if (todoList.value[toDoToSaveEdit].reName.trim() != '') {
        todoList.value[toDoToSaveEdit].name = todoList.value[toDoToSaveEdit].reName;
        getFilterList(todoList.value, filtrList.value.method)
    }
    todoList.value[toDoToSaveEdit].isEditing = false;
    showMessage()
}
const getFilterList = (todoList: ITodoItem[], method: string) => {
    if (method == "priority") {
        filtrList.value.sortList = todoList.filter((e) => (e.priority))
    } else {
        filtrList.value.sortList = todoList
    }
}
const showMessage = () => {
    filtrList.value.show = true
    setTimeout(() => { filtrList.value.show = false }, 5000)
}

interface ITodoItem {
    status: boolean,
    name: string,
    reName: string,
    isEditing: boolean,
    priority: boolean,
}
interface IToDoFilterItem {
    method: string,
    show: boolean,
    sortList: ITodoItem[]
}

const handleSendToDo = (creatingToDoN: string, creatingToDoPr: boolean) => {
    if (creatingToDoN) {
        todoList.value.push({
            status: false,
            name: creatingToDoN,
            reName: creatingToDoN,
            isEditing: false,
            priority: creatingToDoPr
        })

        getFilterList(todoList.value, filtrList.value.method)
        showMessage()
    }

}



const todoList = ref<ITodoItem[]>(
    [
    ])

const filtrList = ref<IToDoFilterItem>(
    {
        method: "all",
        show: false,
        sortList: []
    }
)

</script>


<style lang="scss" scoped>
body {
    font-size: 24px;
    line-height: 24px;
    font-weight: 500;

    h1 {
        font-size: 48px;
        line-height: 36px;
    }

    .toDoForm {
        display: grid;
        grid-template-columns: 1fr;
        margin: 15vh auto;
        gap: 20px;
        width: 500px;
        background-color: rgb(248, 243, 243);
        border-radius: 7px;
        padding: 50px;
        box-shadow: 2px 1px 1px 1px rgb(224, 222, 222);
    }

    .form {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 12px;
    }

    .formSpan {
        align-items: end;
        border-radius: 12px;
        font-weight: 400;
        display: grid;
        white-space: nowrap;
        grid-template-columns: 200px 1fr;
        font-weight: 400;
        font-size: 24px;
    }

    .toDoCheckbox {
        width: 20px;
        height: 20px;
        border-radius: 7px;
        align-self: center;
    }

    .radioBox {
        cursor: pointer;
        transform: scale(1.5);
        margin-left: -50px;
    }

    .formText,
    .formSelect {
        font-weight: 500;
        font-size: 16px;
        padding: 7px 14px;
        border-radius: 7px;
        border: solid 3px #8B54FF;
        color: #696969;
        outline: none;
    }



    .formText:focus {
        border: solid 3px #7653c0;
    }

    .formSelect {
        cursor: pointer;
        appearance: none;
    }

    .formButton {
        margin-top: 20px;
    }

    .toDoCard {
        display: flex;
        flex-direction: column;

        .radio {
            display: grid;
            grid-template-columns: auto 20px auto 20px;
            justify-items: start;
            margin-left: 12px;

            span {
                font-size: 22px;
            }
        }
    }

    .toDos {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;

    }

    .toDoSpan {
        white-space: nowrap;
        font-size: 22px;
        width: 150px;
    }

    .toDoSpanCompl {
        text-decoration: line-through;
    }

    button {
        cursor: pointer;
        font-weight: 500;
        font-size: 16px;
        line-height: 18px;
        padding: 7px 14px;
        border-radius: 7px;
        background: #8B54FF;
        color: white;
        border: none;
        transition: all 0.5s;
    }

    button:hover {
        background: #7653c0;
    }

    .toDo {
        display: grid;
        grid-template-columns: [start] auto 1fr auto auto [end];
        gap: 10px;
        align-items: baseline;
        justify-content: center;

        .formText {
            font-size: 18px;
        }
    }

    .toDoButtons {
        display: flex;
        flex-direction: row;
        gap: 10px
    }

    hr {
        size: 1px;
        width: 90%;
        color: #8a54ff65;
        grid-column: start/end;
    }

    .action {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 150px;
        height: 40px;
        padding: 7px 14px;
        background-color: #7553c034;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        opacity: 0;
        transition: all 1s;


        span {
            align-self: center;
            margin: auto;
            font-size: 18px;
            color: #7653c0;
        }
    }

    .show {
        opacity: 1;
    }
}
</style>
