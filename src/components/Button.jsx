const Button = ({type, title, onClick}) => {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
