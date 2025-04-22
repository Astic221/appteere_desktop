import React from 'react'

function ErrorComponent({ onPress }: { onPress: () => void }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <p className="text-2xl font-semibold">Erreur lors du chargement</p>

        <button
          type="button"
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onPress}
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export default ErrorComponent