export let cart = []
export let history = []

export const addToCart = (item, callback) => {
    cart.push(item)
    callback(`- ${item.nama} berhasil ditambahkan ke keranjang.`)
}

export const checkout = () => {
    if (cart.length === 0){
        return null
    }

    const total = cart.reduce((sum, item) => sum + item.harga, 0)
    
    const invoice = {
        tanggal: new Date().toLocaleString('id-ID'),
        items: [...cart],
        totalBayar : total
    }

    history.push(invoice)
    cart = []
    return invoice
};