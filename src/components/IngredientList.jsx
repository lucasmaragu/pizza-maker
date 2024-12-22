import Ingredient from './Ingredient'

export default function IngredientList({ ingredients }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {ingredients.map((ingredient) => (
        <div key={ingredient.id}>
          <Ingredient id={ingredient.id} name={ingredient.name} image={ingredient.image} price={ingredient.price}/>
        </div>
      ))}
    </div>
  )
}

