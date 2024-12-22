import { useDrop } from 'react-dnd'
import { motion } from 'framer-motion'

export default function PizzaBase({ selectedIngredients, removeIngredient, addIngredient, updateIngredientPosition, ingredients }) {
  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset()
      const pizzaBase = document.getElementById('pizza-base')
      const pizzaRect = pizzaBase.getBoundingClientRect()
      const left = ((offset.x - pizzaRect.left) / pizzaRect.width) * 100
      const top = ((offset.y - pizzaRect.top) / pizzaRect.height) * 100

      addIngredient(item.id, left, top)

      return { name: 'PizzaBase' }
    },
  }))

  return (
    <div
      id="pizza-base"
      ref={drop}
      className="relative w-full aspect-square max-w-xl mx-auto"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="49" fill="#FFA500" />
        <circle cx="50" cy="50" r="45" fill="#FFDB58" />
      </svg>
      {selectedIngredients.map((ingredient) => {
        const ingredientData = ingredients.find(i => i.id === ingredient.type)
        return (
          <motion.img
            key={ingredient.id}
            src={ingredientData.image}
            alt={ingredientData.name}
            className="absolute w-8 h-8 cursor-move"
            style={{
              left: `${ingredient.left}%`,
              top: `${ingredient.top}%`,
              transform: 'translate(-50%, -50%)',
            }}
            drag
            dragConstraints={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            onDragEnd={(_, info) => {
              const pizzaBase = document.getElementById('pizza-base')
              const pizzaRect = pizzaBase.getBoundingClientRect()
              const left = ((info.point.x - pizzaRect.left) / pizzaRect.width) * 100
              const top = ((info.point.y - pizzaRect.top) / pizzaRect.height) * 100
              updateIngredientPosition(ingredient.id, left, top)
            }}
            whileHover={{ scale: 1.1 }}
            onDoubleClick={() => removeIngredient(ingredient.id)}
          />
        )
      })}
    </div>
  )
}

