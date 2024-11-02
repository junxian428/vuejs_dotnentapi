<template>
    <div>
      <h1>Pizza List</h1>
      <ul>
        <li v-for="pizza in pizzas" :key="pizza.id">
          {{ pizza.name }}
          <button @click="editPizza(pizza.id)">Edit</button>
          <button @click="deletePizza(pizza.id)">Delete</button>
        </li>
      </ul>
  
      <h2>Add/Edit Pizza</h2>
      <input v-model="pizzaForm.name" placeholder="Pizza Name" />
      <button @click="submitPizza">{{ editing ? 'Update' : 'Add' }} Pizza</button>
    </div>
  </template>
  
  <script>
  import { PizzaService } from '../services/pizzaService';
  
  export default {
    data() {
      return {
        pizzas: [],
        pizzaForm: { name: '' },
        editing: false,
        editingId: null,
      };
    },
    methods: {
      async fetchPizzas() {
        const response = await PizzaService.getAll();
        this.pizzas = response.data;
      },
      async submitPizza() {
        if (this.editing) {
          await PizzaService.update(this.editingId, this.pizzaForm);
        } else {
          await PizzaService.create(this.pizzaForm);
        }
        this.pizzaForm.name = '';
        this.editing = false;
        this.editingId = null;
        this.fetchPizzas();
      },
      async deletePizza(id) {
        await PizzaService.delete(id);
        this.fetchPizzas();
      },
      async editPizza(id) {
        const response = await PizzaService.get(id);
        this.pizzaForm = response.data;
        this.editing = true;
        this.editingId = id;
      },
    },
    mounted() {
      this.fetchPizzas();
    },
  };
  </script>
  