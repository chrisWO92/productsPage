class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
       
    }

    // Se define el método resetForm para que el formulario se resetee cuando se agregue un producto al product-list.
    // Posteriormente se llama este método cuando se hace click en el submit que guarda los productos.
    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete'){
            // Si el elemento en el que se hace click es aquel con propiedad 'name' igual a 'delete', 
            // se borra la tarjeta en la que se encuentra contenido este elemento 'a', y se selecciona
            // mediante la sentencia parentElement.parentElement.parentElement.remove();
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully', 'info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        // Mostrando en DOM
        const container = document.querySelector('.container');
        const app = document.getElementById('App');

        // Se inserta el mensaje creado dentro del container, es devir el 'div', pero antes del div
        // con id=App
        container.insertBefore(div, app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}


// DOM Events Section

document.getElementById('product-form').addEventListener('submit', (e) => {

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    const ui = new UI();

    if (name === '' || price === '' || year === '') {
        return ui.showMessage('Complete Fields Please', 'danger');
    }

    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Product Added Successfully', 'success');
    e.preventDefault();

});

document.getElementById('product-list').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteProduct(e.target);
});


// Considerar que hay muchas formas de mejorar esta aplicación.
// Por ejemplo se podría usar la API de LocalStorage para almacenar los datos que se vayan
// agregando, o también podría hacerse la comunicación con un servidor mediante algún lenguaje
// de backend, como php, python, node.js, etc.