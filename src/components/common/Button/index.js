function Button ({children, ...propType}) {
    return (
        <button {...propType}>{children}</button>
    )
}

export default Button