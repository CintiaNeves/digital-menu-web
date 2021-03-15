import React, { useState } from 'react'

export default function Products() {
    const [products, setProducts] = useState([
        {
            ammount: 1,
            product: {
                productId: 1,
                image: 'aaa',  
                price: 10, 
                description: 'X salada', 
                ingredients: 'cebola e pão' 
            },
        },
        {
            ammount: 1,
            product: {
                productId: 2,
                image: 'aaa',  
                price: 10, 
                description: 'X salada', 
                ingredients: 'cebola e pão' 
            }
        },
        {
            ammount: 1,
            product: {
            productId: 3,
            image: 'aaa',  
            price: 1010, 
            description: 'X salada', 
            ingredients: 'cebola e pão' 
        }
    }])
    const [total, setTotal] = useState(0)
    const [chart, setChart] = useState([])
    const [showNav, setShowNav] = useState(false)

    const changeItemAmount = (event, item) => {
        const index = products.indexOf(item)
        products.splice(index, 1)
        item.ammount = Number(event.target.value)
        products.splice(index, 0, item)
        setProducts([...products])
    }

    const addToChart = (item) => {
        setTotal(total + item.ammount * item.product.price)
        const copy = Object.assign({}, item)
        setChart([...chart, copy])
        console.log({chart})
        // send to backend
    }

    const removeFromChart = (item) => {
        setTotal(total - (item.ammount * item.product.price))
        chart.splice(chart.indexOf(item), 1)
        setChart([...chart])
    }

    return (
        <div>
            {showNav && (
                <div id="myNav" className="overlay">
                    <p>Valor total do pedido: {currencyFormater.format(total)}</p>
                    {chart && chart.map((item, index) => (
                        <div key={index} className="card-food-info">
                            <button onClick={() => removeFromChart(item)}>Remover</button>
                            <h3>{item.ammount} - {item.product.description}</h3>
                            <h1>Total {currencyFormater.format(item.ammount * item.product.price)}</h1>
                            <img src={item.image} alt="imagem do produto" />
                        </div>
                    ))}
                    <button onClick={() => setShowNav(!showNav)}>Voltar</button>
                    <button className="send-order">Enviar Pedido</button>
                </div>
            )}
            {products.map(item => (
                <div key={item.product.productId} className="card-food-info">
                    <h1>{item.product.description}</h1>
                    <p>{item.product.ingredients}</p>
                    <input type="number" defaultValue="1" min="1" onChange={e => changeItemAmount(e, item)} />
                    <button onClick={() => addToChart(item)}>
                        Adicionar {currencyFormater.format(item.ammount * item.product.price)}
                    </button>
                    <img src={item.product.image} alt="imagem do produto" />
                </div>
            ))}
            <p>Valor do pedido: {currencyFormater.format(total)}</p>
            <button onClick={() => setShowNav(!showNav)}>Ver pedido</button>
        </div>
      )
}

const format = {
    style: 'currency', 
    currency: 'BRL',
    currencySign: 'accounting' 
}
const currencyFormater = new Intl.NumberFormat('pt-BR', format)