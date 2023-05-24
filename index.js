import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, onSnapshot, query, where, getDocs, orderBy, limit, deleteDoc, updateDoc } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBEpDFiQW8I-ok56X9DoYjVRLC86RLHjzk",
    authDomain: "crud-firebase-b7825.firebaseapp.com",
    projectId: "crud-firebase-b7825",
    storageBucket: "crud-firebase-b7825.appspot.com",
    messagingSenderId: "985795819766",
    appId: "1:985795819766:web:b76b1936d099ff793694d7"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore();

const cardapio = doc(firestore, 'cardapio/17-04-2023');


function addNovaColecao() {
    const docData = {
        descricao: 'Sopa',
        preco: 10,
        vegano: false,
    };
    setDoc(cardapio, docData, { merge: true })

        .then(() => {
            console.log('Valor foi adicionado na database.');
        })
        .catch((error) => {
            console.log('Ocorreu um erro: ${error}');
        });
}


const orderCollection = collection(firestore, 'pedidos');

async function addNovoDocumento() {
    const newDoc = await addDoc(orderCollection, {
        cliente: 'Lucas',
        bebida: 'Cafe',
        precoTotal: (100 + Math.floor(Math.random() * 400)) / 100,
    })
    console.log(`Documento criado em ${newDoc.path}`);

}

async function readUnicoDocumento() {
    const mySnapshot = await getDoc(especialDoDia);
    if (mySnapshot.exists()) {
        const docData = mySnapshot.data();
        console.log(`O dado é: ${JSON.stringify(docData)}`);
    }
}

async function readVariosDocumentos() {
    const pedidosClientesQuery = query(
        collection(firestore, 'pedidos'),
        where('bebida', '==', 'Cafe'),
        orderBy('precoTotal'),
        limit(10)
    );

    onSnapshot(pedidosClientesQuery, (querySnapshot) => {
        console.log(JSON.stringify(querySnapshot.docs.map((e) => e.data())))
    })
}


async function deletePedidos() {
    const pedidosClientesQuery = query(
        collection(firestore, 'pedidos'),
        where('bebida', '==', 'Cerveja'),
        limit(10)
    );

    const querySnapshot = await getDocs(pedidosClientesQuery);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref)
            .then(() => {
                console.log('Pedido excluído com sucesso.');
            })
            .catch((error) => {
                console.log('Ocorreu um erro ao excluir o pedido:', error);
            });
    });
}

async function updatePedidos() {
    const pedidosClientesQuery = query(
        collection(firestore, 'pedidos'),
        where('bebida', '==', 'Cafe'),
        limit(10)
    );

    const querySnapshot = await getDocs(pedidosClientesQuery);
    querySnapshot.forEach((doc) => {
        const updatedData = {
            bebida: 'Chá',
            precoTotal: 8.5,
        };

        updateDoc(doc.ref, updatedData)
            .then(() => {
                console.log('Pedido atualizado com sucesso.');
            })
            .catch((error) => {
                console.log('Ocorreu um erro ao atualizar o pedido:', error);
            });
    });
}

console.log('Hello firebase.');
  // addNovaColecao();
  // addNovoDocumento();
  // readUnicoDocumento();
  // readVariosDocumentos();
  // deletePedidos();
  // updatePedidos();




