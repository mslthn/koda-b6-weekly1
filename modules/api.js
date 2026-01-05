export const fetchMenu = async () => {
    const url = "https://raw.githubusercontent.com/mslthn/koda-b6-weekly1/refs/heads/main/data/data.json"
    try {
        const rawData = await fetch(url)
        const data = await rawData.json()
        
        let flatMenu = []
        
        data.forEach(item => {
            if (item.Paket) {
                // +array paket makanan
                flatMenu.push(...item.Paket)
            } else {
                // item biasa
                flatMenu.push(item)
            }
        })

        return flatMenu
    } catch (error) {
        throw new Error("Gagal memproses data menu: " + error.message)
    }
}

// import fs from 'fs/promises'
// const rawData = await fs.readFile('./data/data.json', 'utf-8')
// const data = JSON.parse(rawData)
// async function getData() {
    //   const url = "https://raw.githubusercontent.com/mslthn/koda-b6-weekly1/refs/heads/main/data.json";
    //   try {
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       throw new Error(`Response status: ${response.status}`);
    //     }
    
    //     const result = await response.json();
    //     console.log(result);
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // }