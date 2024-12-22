export default function PizzaSummary({ selectedIngredients, totalPrice, comment }) {
    const ingredientCounts = selectedIngredients.reduce((acc, ing) => {
      acc[ing.name] = (acc[ing.name] || 0) + 1
      return acc
    }, {})
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-red-700 border-b pb-2">Resumen de tu Pizza</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm font-semibold">
          <span>Base de pizza</span>
          <span>$10.00</span>
        </div>
        {Object.entries(ingredientCounts).map(([name, count]) => (
          <div key={name} className="flex justify-between text-sm">
            <span>{name} x{count}</span>
            <span>${(selectedIngredients.find(ing => ing.name === name).price * count).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-2 mb-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <p className="text-sm italic text-gray-600 bg-yellow-50 p-2 rounded">{comment}</p>
    </div>
    )
  }
  
  