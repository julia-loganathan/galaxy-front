import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h2>Cette page n'existe pas</h2> 
        <Link to={'/'} className="btn btn-secondary"> Retour à l'acceuil</Link>
    </div>
  )
}

export default NotFound