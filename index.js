import readline from "readline";
import { fetchMenu } from "./modules/api.js";
import { addToCart, cart, checkout, history } from "./modules/cart.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = (question) => new Promise((resolve) => rl.question(question, resolve));

async function mainMenu() {
  console.log("\n=== RM. PAYAKUMBUAH ===");
  console.log("1. Pilih Menu");
  console.log("2. Lihat Keranjang & Checkout");
  console.log("3. History Pembelian");
  console.log("4. Keluar");

  const choice = await input("Pilih opsi (1-4): ");

  switch (choice) {
  case "1":
    await showMenu(); 
    break;
  case "2":
    showCart(); 
    break;
  case "3":
    showHistory(); 
    break;
  case "4":
    console.log("Terima kasih sudah memesan!");
    rl.close();
    return;
  default:
    console.log("Pilihan tidak valid.");
  }
  mainMenu();
}

async function showMenu() {
  try {
    const menus = await fetchMenu();
    console.log("\n--- DAFTAR MENU ---");
    menus.forEach((m, i) => {
      const kategori = m.jenis ? `[${m.jenis}]` : "[Paket]";
      console.log(`${i + 1}. ${kategori} ${m.nama} - Rp${m.harga}`);
    }); 
        
    const indexInput = await input("Pilih nomor menu (0 untuk kembali): ");
    const selectedIdx = parseInt(indexInput) - 1; 

    if (selectedIdx >= 0 && selectedIdx < menus.length) {
      const item = menus[selectedIdx]; 
      let detailPilihan = "";

      // cek jika item memiliki properti pilihan (pilihan, tambahan, pilihan ayam, dll)
      const keysPilihan = Object.keys(item).filter(key => 
        key.includes("pilihan") || key.includes("tambahan")
      );

      if (keysPilihan.length > 0) {
        console.log(`\nAnda memilih ${item.nama}. Silahkan pilih lauk:`); 
                
        // kategori pilihan
        for (const key of keysPilihan) {
          console.log(`\n--- ${key.toUpperCase()} ---`);
          item[key].forEach((opt, i) => console.log(`${i + 1}. ${opt}`));
                    
          const optIdx = await input(`Pilih ${key}: `);
          const chosenOpt = item[key][parseInt(optIdx) - 1];
                    
          if (chosenOpt) {
            detailPilihan += (detailPilihan ? ", " : "") + chosenOpt;
          }
        }
      }   

      const finalItem = {
        ...item,
        nama: detailPilihan ? `${item.nama} (${detailPilihan})` : item.nama
      }; 

      addToCart(finalItem, (msg) => console.log(msg));
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err.message);
  }
}

function showCart() {
  if (cart.length === 0) {
    console.log("\nKeranjang kosong.");
    return;
  }
  console.log("\n--- KERANJANG ANDA ---");
  cart.forEach((item, i) => console.log(`${i + 1}. ${item.nama} - Rp${item.harga}`));
    
  input("\nCheckout sekarang? (y/n): ").then((ans) => {
    if (ans.toLowerCase() === "y") {
      const receipt = checkout();
      console.log(`\nBerhasil! Total Bayar: Rp${receipt.totalBayar.toLocaleString()}`);
    }
    mainMenu();
  }); 
}

function showHistory() {
  console.log("\n========================================");
  console.log("          RIWAYAT TRANSAKSI");
  console.log("========================================");

  if (history.length === 0) {
    console.log("Belum ada riwayat pembelian.");
    return;
  }

  history.forEach((invoice, index) => {
    console.log(`${index + 1}. Tanggal: ${invoice.tanggal}`);
    console.log("   Detail Pesanan:");
        
    invoice.items.forEach((item) => {
      console.log(`     - ${item.nama} (Rp${item.harga.toLocaleString()})`);
    });

    console.log("   ------------------------------------");
    console.log(`   TOTAL: Rp${invoice.totalBayar.toLocaleString()}`);
    console.log("========================================\n");
  });
}
// function showHistory() {
//     console.log("\n--- HISTORY PEMBELIAN ---")
//     if (history.length === 0) console.log("Belum ada transaksi.")
//     history.forEach((h, i) => {
//         console.log(`${i + 1}. [${h.date}] Total: Rp${h.total}`)
//     })
// }

mainMenu();


// const url = "https://raw.githubusercontent.com/mslthn/koda-b6-weekly1/refs/heads/main/data.json"
// export let dataMenu = []

// export async function loadMenu() {
//     const res = await fetch(url)
//     dataMenu = await res.json()
//     console.log(dataMenu)
// }

// fetch(url).then(obj => {
//     obj.text().then(data=>{
//         let parsedData = JSON.parse(data)
//         parsedData.forEach(data => {
//             console.log(`${nama} - Rp.${harga}`)
//         }) 
//         // const menu = dataMenu.map(({dataMenu}) => dataMenu)
        
//         // console.log(menu)
//         // const jumlahMenu = dataMenu.length
//         // for (const {nama, harga} of dataMenu){
//         //     console.log(`${nama} ==> Rp.${harga}`)
//         // }

//     })
// })

