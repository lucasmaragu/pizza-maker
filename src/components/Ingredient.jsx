import { useDrag } from 'react-dnd'

export default function Ingredient({ id, name, image, price }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`p-2 bg-yellow-50 rounded-lg shadow-md cursor-move transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 hover:scale-105'
      }`}
    >
      <img src={image} alt={name} className="w-16 h-16 mx-auto mb-2" />
      <p className="text-center text-sm font-semibold">{name}</p>
      <p className="text-center text-xs text-gray-600">${price.toFixed(2)}</p>
    </div>
  )
}

