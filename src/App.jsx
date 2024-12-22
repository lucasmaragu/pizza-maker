'use client'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState } from 'react'
import PizzaBase from './components/PizzaBase'
import IngredientList from './components/IngredientList'
import PizzaSummary from './components/PizzaSummary'

const ingredients = [
  { id: 'jalapeno', name: 'Jalapeño', price: 1.5, image: '/public/jalapeño.png' },
  { id: 'sausage', name: 'Salchichas', price: 2, image: '/public/sausage.webp' },
  { id: 'mushrooms', name: 'Champiñones', price: 1.8, image: '/public/mushroom.webp' },
  { id: 'pineapple', name: 'Piña', price: 1.7, image: '/public/pineapple.webp' },
  { id: 'olives', name: 'Aceitunas', price: 1.6, image: '/public/olive.webp' },
  { id: 'onions', name: 'Cebollas', price: 1.4, image: '/public/onion.webp' },
]

export default function PizzaConfigurator() {
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const addIngredient = (id, left, top) => {
    const newIngredient = {
      id: `${id}-${Date.now()}`,
      type: id,
      left,
      top,
    }

    setSelectedIngredients((prevIngredients) => [...prevIngredients, newIngredient])
  }

  const removeIngredient = (id) => {
    setSelectedIngredients((prevIngredients) => 
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    )
  }

  const updateIngredientPosition = (id, left, top) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, left, top } : ingredient
      )
    )
  }

  const totalPrice = selectedIngredients.reduce((total, ing) => {
    const ingredient = ingredients.find((i) => i.id === ing.type)
    return total + (ingredient?.price || 0)
  }, 10) // Precio base de la pizza: 10

  const getPizzaComment = () => {
    const types = selectedIngredients.map((ing) => ing.type)
    if (types.length === 0) return 'Base de pizza solitaria. ¡Agrégale algo!'
    if (types.length === 1 && types[0] === 'cheese') return 'Clásica Margarita. ¡Simple y deliciosa!'
    if (types.includes('pineapple') && types.includes('pepperoni')) return 'Pizza Experimental. ¡Dulce y salado!'
    if (!types.includes('cheese') && !types.includes('pepperoni')) return 'Pizza Veggie. ¡Saludable elección!'
    return '¡Tu pizza personalizada se ve deliciosa!'
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Crea tu Pizza Perfecta</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <PizzaBase
              selectedIngredients={selectedIngredients}
              removeIngredient={removeIngredient}
              addIngredient={addIngredient}
              updateIngredientPosition={updateIngredientPosition}
              ingredients={ingredients}
            />
          </div>
          <div className="w-full md:w-1/2">
            <IngredientList ingredients={ingredients} />
            <PizzaSummary
              selectedIngredients={selectedIngredients.map((ing) => ({
                ...ingredients.find((i) => i.id === ing.type),
                id: ing.id,
              }))}
              totalPrice={totalPrice}
              comment={getPizzaComment()}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

